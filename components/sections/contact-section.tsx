"use client"
import { useState } from "react"
import type React from "react"

import { Mail, MapPin, Phone, CheckCircle, AlertCircle } from "lucide-react"
import { useTranslation } from "@/lib/i18n/language-context"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ContactSection() {
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    service: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSubmitStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@oleksandrp.me",
      href: "mailto:hello@oleksandrp.me",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+380 XX XXX XXXX",
      href: "tel:+380xxxxxxxxx",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Ukraine",
      href: null,
    },
  ]

  return (
    <Section id="contact" background="muted">
      <SectionHeader title={t("contact.title")} subtitle={t("contact.subtitle")} />

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <GlassCard>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="service">{t("contact.service")}</Label>
              <Select
                value={formData.service}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, service: value }))}
                disabled={isSubmitting}
              >
                <SelectTrigger className="glass">
                  <SelectValue placeholder={t("contact.service")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strategy">{t("contact.serviceOptions.strategy")}</SelectItem>
                  <SelectItem value="chatbot">{t("contact.serviceOptions.chatbot")}</SelectItem>
                  <SelectItem value="automation">{t("contact.serviceOptions.automation")}</SelectItem>
                  <SelectItem value="data">{t("contact.serviceOptions.data")}</SelectItem>
                  <SelectItem value="integration">{t("contact.serviceOptions.integration")}</SelectItem>
                  <SelectItem value="other">{t("contact.serviceOptions.other")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">{t("contact.name")}</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="glass"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t("contact.email")}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="glass"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">{t("contact.message")}</Label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="glass resize-none"
                disabled={isSubmitting}
              />
            </div>

            {submitStatus === "success" && (
              <div className="flex items-center gap-2 text-green-600 text-sm">
                <CheckCircle className="h-4 w-4" />
                <span>{t("contact.success")}</span>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{t("contact.error")}</span>
              </div>
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  {t("contact.sending")}
                </>
              ) : (
                t("contact.send")
              )}
            </Button>
          </form>
        </GlassCard>

        {/* Contact Information */}
        <div className="space-y-6">
          {contactInfo.map((info, index) => (
            <GlassCard key={index} hover={!!info.href}>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <info.icon className="h-6 w-6 text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-muted-foreground">{info.label}</p>
                  {info.href ? (
                    <a href={info.href} className="text-foreground hover:text-accent transition-colors break-all">
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-foreground">{info.value}</p>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </Section>
  )
}
