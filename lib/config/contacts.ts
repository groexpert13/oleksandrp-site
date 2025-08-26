export const contacts = {
  name: "Oleksandr P.",
  title: "AI & Automation Engineer",
  email: "oleksandr@example.com", // Replace with actual email
  phone: "+380 XX XXX XXXX", // Replace with actual phone
  website: "https://oleksandrp.dev", // Replace with actual website
  telegram: "@oleksandrp", // Replace with actual Telegram
  linkedin: "linkedin.com/in/oleksandrp", // Replace with actual LinkedIn
  location: "Ukraine"
} as const

export type ContactInfo = typeof contacts
