import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Central contact/social links for consistent reuse
export const siteLinks = {
  phone: "+380000000000",
  whatsapp: "380000000000",
  email: "hello@oleksandrp.me",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  calendly: "https://calendly.com/your-handle/30min",
}
