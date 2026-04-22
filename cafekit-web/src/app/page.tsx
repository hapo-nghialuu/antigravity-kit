import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPreferredRequestLocale } from "@/lib/locale-utils";

export default async function Home() {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const locale = getPreferredRequestLocale(
    headerStore.get("cookie") ?? cookieStore.toString(),
    headerStore.get("accept-language"),
  );

  redirect(`/${locale}`);
}
