import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BRESTA TALKS - Your Breast Cancer Chat Bot",
  description:
    "BRESTA TALKS is your intelligent companion for breast cancer support, providing reliable information and emotional support in Arabic.",
  keywords: "breast cancer, support, chatbot, Arabic, medical information, BRESTA TALKS",
  authors: [{ name: "BRESTA TALKS Team" }],
  openGraph: {
    title: "BRESTA TALKS - Your Breast Cancer Chat Bot",
    description: "Your intelligent companion for breast cancer support",
    url: "https://brestatalks.com",
    siteName: "BRESTA TALKS",
    images: [
      {
        url: "/logo.png",
        width: 400,
        height: 400,
        alt: "BRESTA TALKS Logo",
      },
    ],
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BRESTA TALKS - Your Breast Cancer Chat Bot",
    description: "Your intelligent companion for breast cancer support",
    images: ["/logo.png"],
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
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
