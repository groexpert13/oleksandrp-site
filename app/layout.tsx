import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import { DM_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import "./globals.css"

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
  title: "Oleksandr P. - AI & Automation Engineer",
  description:
    "AI & Automation Engineer specializing in Python, LLMs, RAG assistants, and modern cloud-native solutions. Helping businesses automate processes and deliver AI solutions.",
  generator: "Next.js",
  keywords: [
    "AI engineer",
    "automation",
    "python",
    "llm",
    "rag",
    "chatbots",
    "machine learning",
    "data pipelines",
    "mlops",
    "langchain",
    "fastapi",
    "nextjs",
    "typescript",
    "ukraine",
    "freelance",
  ],
  authors: [{ name: "Oleksandr P.", url: "https://oleksandrp.me" }],
  creator: "Oleksandr P.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://oleksandrp.me",
    title: "Oleksandr P. - AI & Automation Engineer",
    description:
      "AI & Automation Engineer specializing in Python, LLMs, RAG assistants, and automation solutions. Available for AI projects and consultations.",
    siteName: "Oleksandr P. Portfolio",
    images: [
      {
        url: "/oleksandrp_logo.webp",
        width: 1200,
        height: 630,
        alt: "Oleksandr P. - AI & Automation Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oleksandr P. - AI & Automation Engineer",
    description: "AI & Automation Engineer specializing in Python, LLMs, RAG assistants, and automation solutions.",
    images: ["/oleksandrp_logo.webp"],
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
  metadataBase: new URL("https://oleksandrp.me"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/oleksandrp_logo.webp" type="image/webp" />
        <link rel="apple-touch-icon" href="/oleksandrp_logo.webp" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className={`${spaceGrotesk.variable} ${dmSans.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <LanguageProvider defaultLanguage="en">
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
