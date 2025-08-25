import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import { DM_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/i18n/language-context"
import "./globals.css"
import Link from "next/link"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "Oleksandr P. - Full-Stack Developer",
  description:
    "Personal website of Oleksandr P. - Full-stack developer specializing in React, Next.js, TypeScript, and modern web technologies. Available for freelance projects and collaborations.",
  generator: "Next.js",
  keywords: [
    "developer",
    "full-stack",
    "react",
    "next.js",
    "typescript",
    "web development",
    "frontend",
    "backend",
    "ukraine",
    "freelance",
  ],
  authors: [{ name: "Oleksandr P.", url: "https://oleksandrp.me" }],
  creator: "Oleksandr P.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://oleksandrp.me",
    title: "Oleksandr P. - Full-Stack Developer",
    description:
      "Full-stack developer specializing in React, Next.js, TypeScript, and modern web technologies. Available for freelance projects.",
    siteName: "Oleksandr P. Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oleksandr P. - Full-Stack Developer",
    description: "Full-stack developer specializing in React, Next.js, TypeScript, and modern web technologies.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${dmSans.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <LanguageProvider defaultLanguage="en">{children}</LanguageProvider>
        </ThemeProvider>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </body>
    </html>
  )
}
