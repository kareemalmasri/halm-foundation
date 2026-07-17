"use client";

import { useActionState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { sendContactMessage, type ContactFormState } from "@/app/[locale]/contact/actions";

const initialState: ContactFormState = { status: "idle", message: "" };

const inputClasses =
  "rounded-md border border-ink/20 bg-white px-3 py-2 text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none";

export default function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const action = sendContactMessage.bind(null, locale);
  const [state, formAction, pending] = useActionState(action, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-5 rounded-lg bg-ivory p-6 text-ink sm:p-8"
    >
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink/80">
          {t("fields.name")}
        </span>
        <input type="text" name="name" required className={inputClasses} />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink/80">
          {t("fields.email")}
        </span>
        <input type="email" name="email" required className={inputClasses} />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink/80">
          {t("fields.subject")}
        </span>
        <input type="text" name="subject" className={inputClasses} />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-ink/80">
          {t("fields.message")}
        </span>
        <textarea
          name="message"
          required
          rows={6}
          className={inputClasses}
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-gold px-6 py-3 font-semibold text-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? t("submitting") : t("submit")}
      </button>

      {state.status !== "idle" && (
        <p
          role="status"
          className={
            state.status === "success"
              ? "text-sm font-medium text-emerald-700"
              : "text-sm font-medium text-red-700"
          }
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
