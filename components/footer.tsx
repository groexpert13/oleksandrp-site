"use client"
import { Github, Linkedin, Mail, Heart } from "lucide-react"
import { siteLinks } from "@/lib/utils"
import { useTranslation } from "@/lib/i18n/language-context"

export function Footer() {
  const { t } = useTranslation()

  const socialLinks = [
    {
      icon: Github,
      href: siteLinks.github,
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: siteLinks.linkedin,
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: `mailto:${siteLinks.email}`,
      label: "Email",
    },
  ]

  return (
    <footer className="glass border-t border-border/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and Copyright */}
          <div className="text-center md:text-left">
            <div className="font-heading font-bold text-xl text-foreground mb-2">oleksandrp.me</div>
            <p className="text-sm text-muted-foreground">© 2024 Oleksandr P. {t("footer.rights")}.</p>
          </div>

          {/* Built with love */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{t("footer.builtWith")}</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>Next.js & TypeScript</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-2 rounded-full hover:scale-110 transition-transform duration-200"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
