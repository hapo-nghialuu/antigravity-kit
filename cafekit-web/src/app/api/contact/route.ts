import { z } from "zod";

const contactFormSchema = z.object({
  fullname: z.string().trim().min(1, "Full name is required").max(255),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(1, "Phone number is required").max(50),
  company: z.string().trim().min(1, "Company is required").max(255),
  jobtitle: z.string().trim().max(255).optional(),
  message: z.string().trim().max(10000).optional(),
  language: z.enum(["en", "ja", "vi"]).optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

const SOURCE_TYPE = "HOMEPAGE" as const;
const SUBSOURCE_TYPE = "CAFEKIT" as const;

function normalizePhone(value: string): string {
  const trimmed = value.trim();
  if (trimmed === "") return "";
  const hasLeadingPlus = trimmed.startsWith("+");
  const digitsOnly = trimmed.replace(/[^0-9]/g, "");
  return hasLeadingPlus ? `+${digitsOnly}` : digitsOnly;
}

function trimOptional(value?: string): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function getOriginFromHeaders(request: Request): string {
  const origin = request.headers.get("origin");
  if (origin) return origin;
  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).origin;
    } catch {
      // ignore
    }
  }
  return "https://cafekit.haposoft.com";
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, message: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const parseResult = contactFormSchema.safeParse(body);

  if (!parseResult.success) {
    const firstError = parseResult.error.issues[0]?.message ?? "Validation failed";
    return Response.json(
      { success: false, message: firstError },
      { status: 400 }
    );
  }

  const data = parseResult.data;
  const lang = data.language ?? "en";

  const targetEndpoint = process.env.CONTACT_API_ENDPOINT;

  if (!targetEndpoint) {
    return Response.json(
      { success: false, message: "Server configuration error" },
      { status: 500 }
    );
  }

  // Build payload exactly as expected by the SOURCE (hapo-homepage-spa /homepage/contacts)
  const sourcePayload = {
    source_type: SOURCE_TYPE,
    subsource_type: SUBSOURCE_TYPE,
    full_name: data.fullname.trim(),
    company_name: data.company.trim(),
    email: data.email.trim(),
    phone_number: normalizePhone(data.phone),
    language: lang,
    ...(trimOptional(data.jobtitle) && { position: data.jobtitle!.trim() }),
    ...(trimOptional(data.message) && { message: data.message!.trim() }),
  };

  const origin = getOriginFromHeaders(request);

  try {
    const upstreamResponse = await fetch(targetEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Language": lang,
        "Content-Type": "application/json",
        Origin: origin,
      },
      body: JSON.stringify(sourcePayload),
      cache: "no-store",
    });

    const responseBody = (await upstreamResponse.json().catch(() => null)) as {
      message?: string;
    } | null;

    if (upstreamResponse.ok) {
      return Response.json({ success: true }, { status: 200 });
    }

    const status = upstreamResponse.status >= 500 ? 502 : 400;
    return Response.json(
      {
        success: false,
        message:
          responseBody?.message ||
          "We could not submit your message right now. Please try again later.",
      },
      { status }
    );
  } catch {
    return Response.json(
      {
        success: false,
        message: "We could not submit your message right now. Please try again later.",
      },
      { status: 502 }
    );
  }
}
