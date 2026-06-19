"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n/LanguageProvider";
import { Mail, Phone, Building2 } from "lucide-react";
import { toast } from "sonner";
import { contactFormSchema, type ContactFormInput } from "@/lib/utils/validators";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";

export function ContactSection() {
  const t = useTranslations("contact");
  const [form, setForm] = useState<ContactFormInput>({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormInput, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const result = contactFormSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormInput, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof ContactFormInput;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsSubmitting(false);
    toast.success("Message sent. Our team will respond shortly.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  }

  return (
    <section className="px-4 py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <h2 className="font-display text-h2 font-bold text-navy-deep dark:text-ivory">{t("title")}</h2>
          <div className="mt-8 space-y-4">
            <GlassCard className="flex items-center gap-4 p-5">
              <Mail className="h-5 w-5 text-gold-dark" />
              <div>
                <p className="text-caption uppercase text-navy-soft/60 dark:text-ivory/50">{t("emailSupport")}</p>
                <p className="font-semibold text-navy-deep dark:text-ivory">support@edpcourier.com</p>
              </div>
            </GlassCard>
            <GlassCard className="flex items-center gap-4 p-5">
              <Phone className="h-5 w-5 text-gold-dark" />
              <div>
                <p className="text-caption uppercase text-navy-soft/60 dark:text-ivory/50">{t("phoneSupport")}</p>
                <p className="font-semibold text-navy-deep dark:text-ivory">+1 800 555 0199</p>
              </div>
            </GlassCard>
            <GlassCard className="flex items-center gap-4 p-5">
              <Building2 className="h-5 w-5 text-gold-dark" />
              <div>
                <p className="text-caption uppercase text-navy-soft/60 dark:text-ivory/50">{t("globalHq")}</p>
                <p className="font-semibold text-navy-deep dark:text-ivory">One Harbor Plaza, Singapore</p>
              </div>
            </GlassCard>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="glass-card space-y-4 p-7"
        >
          <Input placeholder={t("name")} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} error={errors.name} />
          <Input placeholder={t("email")} type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} error={errors.email} />
          <Input placeholder={t("phone")} value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} error={errors.phone} />
          <Input placeholder={t("subject")} value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} error={errors.subject} />
          <textarea
            placeholder={t("message")}
            rows={4}
            value={form.message}
            onChange={(event) => setForm({ ...form, message: event.target.value })}
            className="input-field resize-none"
          />
          {errors.message ? <p className="text-body-sm text-status-red">{errors.message}</p> : null}
          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            {t("submit")}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
