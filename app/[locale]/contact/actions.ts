"use server";

import { Resend } from "resend";
import { z } from "zod";
import { getTranslations } from "next-intl/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  subject: z.string().trim(),
  message: z.string().trim().min(1),
});

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function sendContactMessage(
  locale: string,
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const t = await getTranslations({ locale, namespace: "contact" });

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { status: "error", message: t("errors.validation") };
  }

  const contactEmail = process.env.CONTACT_EMAIL;
  if (!contactEmail) {
    console.error("CONTACT_EMAIL is not set in .env.local");
    return { status: "error", message: t("errors.generic") };
  }

  const { name, email, subject, message } = parsed.data;

  try {
    const { error } = await resend.emails.send({
      from: "Damascene Dream Website <onboarding@resend.dev>",
      to: contactEmail,
      replyTo: email,
      subject: subject
        ? `[حلم دمشقي] ${subject}`
        : `[حلم دمشقي] رسالة جديدة من ${name}`,
      text: `الاسم / Name: ${name}\nالبريد / Email: ${email}\nالموضوع / Subject: ${subject || "—"}\n\n${message}`,
    });

    if (error) {
      console.error("Resend API error:", error);
      return { status: "error", message: t("errors.generic") };
    }

    return { status: "success", message: t("success") };
  } catch (err) {
    console.error("Contact form send failed:", err);
    return { status: "error", message: t("errors.generic") };
  }
}
