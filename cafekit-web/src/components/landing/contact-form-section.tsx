"use client";

import { useState } from "react";
import { useLocale } from "@/hooks/use-locale";
import { getLandingTranslations } from "@/lib/landing-translations";
import { RequiredAsterisk } from "@/components/ui/required-asterisk";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormData {
  fullname: string;
  email: string;
  phone: string;
  jobtitle: string;
  company: string;
  message: string;
}

interface FormErrors {
  fullname?: string;
  email?: string;
  phone?: string;
  jobtitle?: string;
  company?: string;
  message?: string;
}

export function ContactFormSection() {
  const locale = useLocale();
  const t = getLandingTranslations(locale).contactForm;

  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    email: "",
    phone: "",
    jobtitle: "",
    company: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error on change
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = t.validation.fullnameRequired;
    }
    if (!formData.email.trim()) {
      newErrors.email = t.validation.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.validation.emailInvalid;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t.validation.phoneRequired;
    }
    if (!formData.company.trim()) {
      newErrors.company = t.validation.companyRequired;
    }
    if (formData.message.trim().length > 10000) {
      newErrors.message = t.validation.messageTooLong;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (status === "submitting" || status === "success") return;

    setServerError(null);

    if (!validate()) return;

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...formData, language: locale }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setServerError(data.message || t.errorMessage);
      }
    } catch {
      setStatus("error");
      setServerError(t.errorMessage);
    }
  };

  const resetForm = () => {
    setFormData({
      fullname: "",
      email: "",
      phone: "",
      jobtitle: "",
      company: "",
      message: "",
    });
    setErrors({});
    setServerError(null);
    setStatus("idle");
  };

  // Success state — replaces the form
  if (status === "success") {
    return (
      <section className="relative py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-semibold tracking-tight text-[#101820] dark:text-[#F6FAF7]">
              {t.heading}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-lg text-[#101820]/70 dark:text-[#F6FAF7]/70">
              {t.subheading}
            </p>
          </div>

          <div className="rounded-4xl border border-[#101820]/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(167,197,238,0.08))] px-10 py-16 text-center shadow-[0_26px_80px_-36px_rgba(16,24,32,0.35)] dark:border-[#A7C5EE]/10 dark:bg-[linear-gradient(180deg,rgba(19,38,42,0.98),rgba(17,71,52,0.52))] dark:shadow-[0_26px_80px_-36px_rgba(0,0,0,0.6)]">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#006242]/10">
              <svg
                className="h-8 w-8 text-[#006242]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-[#101820] dark:text-[#F6FAF7]">
              {t.successTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-base text-[#3A5249] dark:text-[#CFE1D9]">
              {t.successMessage}
            </p>
            <button
              onClick={resetForm}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#006242] px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-[#006242]/18 transition-all hover:bg-[#114734] active:scale-[0.985] cursor-pointer"
            >
              {t.reset}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-[#101820] dark:text-[#F6FAF7]">
            {t.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-[#101820]/70 dark:text-[#F6FAF7]/70">
            {t.subheading}
          </p>
        </div>

        <div className="rounded-4xl border border-[#101820]/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(167,197,238,0.08))] p-10 shadow-[0_26px_80px_-36px_rgba(16,24,32,0.35)] dark:border-[#A7C5EE]/10 dark:bg-[linear-gradient(180deg,rgba(19,38,42,0.98),rgba(17,71,52,0.52))] dark:shadow-[0_26px_80px_-36px_rgba(0,0,0,0.6)]">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Server error banner */}
            {serverError && status === "error" && (
              <div
                role="alert"
                className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
              >
                <div className="font-medium">{t.errorTitle}</div>
                <div className="mt-0.5">{serverError}</div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Full name */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="fullname"
                  className="mb-1.5 block text-sm font-medium text-[#101820] dark:text-[#F6FAF7]"
                >
                  {t.fullnameLabel}
                  <RequiredAsterisk />
                </label>
                <input
                  id="fullname"
                  type="text"
                  value={formData.fullname}
                  onChange={(e) => updateField("fullname", e.target.value)}
                  placeholder={t.fullnamePlaceholder}
                  disabled={status === "submitting"}
                  aria-describedby={errors.fullname ? "error-fullname" : undefined}
                  className="w-full rounded-2xl border border-[#101820]/12 bg-white px-4 py-3 text-sm text-[#101820] placeholder:text-[#101820]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006242]/60 disabled:opacity-60 dark:border-[#A7C5EE]/10 dark:bg-[#101820] dark:text-[#F6FAF7] dark:placeholder:text-white/40 dark:focus-visible:ring-[#A7C5EE]/60"
                />
                {errors.fullname && (
                  <p id="error-fullname" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                    {errors.fullname}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-[#101820] dark:text-[#F6FAF7]"
                >
                  {t.emailLabel}
                  <RequiredAsterisk />
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder={t.emailPlaceholder}
                  disabled={status === "submitting"}
                  aria-describedby={errors.email ? "error-email" : undefined}
                  className="w-full rounded-2xl border border-[#101820]/12 bg-white px-4 py-3 text-sm text-[#101820] placeholder:text-[#101820]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006242]/60 disabled:opacity-60 dark:border-[#A7C5EE]/10 dark:bg-[#101820] dark:text-[#F6FAF7] dark:placeholder:text-white/40 dark:focus-visible:ring-[#A7C5EE]/60"
                />
                {errors.email && (
                  <p id="error-email" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-sm font-medium text-[#101820] dark:text-[#F6FAF7]"
                >
                  {t.phoneLabel}
                  <RequiredAsterisk />
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder={t.phonePlaceholder}
                  disabled={status === "submitting"}
                  aria-describedby={errors.phone ? "error-phone" : undefined}
                  className="w-full rounded-2xl border border-[#101820]/12 bg-white px-4 py-3 text-sm text-[#101820] placeholder:text-[#101820]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006242]/60 disabled:opacity-60 dark:border-[#A7C5EE]/10 dark:bg-[#101820] dark:text-[#F6FAF7] dark:placeholder:text-white/40 dark:focus-visible:ring-[#A7C5EE]/60"
                />
                {errors.phone && (
                  <p id="error-phone" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Company */}
              <div>
                <label
                  htmlFor="company"
                  className="mb-1.5 block text-sm font-medium text-[#101820] dark:text-[#F6FAF7]"
                >
                  {t.companyLabel}
                  <RequiredAsterisk />
                </label>
                <input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  placeholder={t.companyPlaceholder}
                  disabled={status === "submitting"}
                  aria-describedby={errors.company ? "error-company" : undefined}
                  className="w-full rounded-2xl border border-[#101820]/12 bg-white px-4 py-3 text-sm text-[#101820] placeholder:text-[#101820]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006242]/60 disabled:opacity-60 dark:border-[#A7C5EE]/10 dark:bg-[#101820] dark:text-[#F6FAF7] dark:placeholder:text-white/40 dark:focus-visible:ring-[#A7C5EE]/60"
                />
                {errors.company && (
                  <p id="error-company" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                    {errors.company}
                  </p>
                )}
              </div>

              {/* Job title */}
              <div>
                <label
                  htmlFor="jobtitle"
                  className="mb-1.5 block text-sm font-medium text-[#101820] dark:text-[#F6FAF7]"
                >
                  {t.jobtitleLabel}
                </label>
                <input
                  id="jobtitle"
                  type="text"
                  value={formData.jobtitle}
                  onChange={(e) => updateField("jobtitle", e.target.value)}
                  placeholder={t.jobtitlePlaceholder}
                  disabled={status === "submitting"}
                  aria-describedby={errors.jobtitle ? "error-jobtitle" : undefined}
                  className="w-full rounded-2xl border border-[#101820]/12 bg-white px-4 py-3 text-sm text-[#101820] placeholder:text-[#101820]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006242]/60 disabled:opacity-60 dark:border-[#A7C5EE]/10 dark:bg-[#101820] dark:text-[#F6FAF7] dark:placeholder:text-white/40 dark:focus-visible:ring-[#A7C5EE]/60"
                />
                {errors.jobtitle && (
                  <p id="error-jobtitle" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                    {errors.jobtitle}
                  </p>
                )}
              </div>

              {/* Message - full width */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-[#101820] dark:text-[#F6FAF7]"
                >
                  {t.messageLabel}
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder={t.messagePlaceholder}
                  disabled={status === "submitting"}
                  rows={5}
                  maxLength={10000}
                  aria-describedby={errors.message ? "error-message" : undefined}
                  className="w-full resize-y rounded-2xl border border-[#101820]/12 bg-white px-4 py-3 text-sm text-[#101820] placeholder:text-[#101820]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#006242]/60 disabled:opacity-60 dark:border-[#A7C5EE]/10 dark:bg-[#101820] dark:text-[#F6FAF7] dark:placeholder:text-white/40 dark:focus-visible:ring-[#A7C5EE]/60"
                />
                <div
                  className={cn(
                    "mt-1.5 text-right text-xs",
                    formData.message.length >= 10000
                      ? "text-red-500 dark:text-red-400"
                      : "text-[#101820]/50 dark:text-[#F6FAF7]/50"
                  )}
                >
                  {formData.message.length}/10000
                </div>
                {errors.message && (
                  <p id="error-message" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#006242] px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-[#006242]/18 transition-all hover:bg-[#114734] active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto cursor-pointer"
              >
                {status === "submitting" ? t.submitting : t.submit}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
