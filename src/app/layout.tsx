import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HistoryTracker } from "@/components/HistoryTracker";
import { SiteChrome } from "@/components/SiteChrome";
import { StorageHydrator } from "@/components/StorageHydrator";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Detonados, guias e mapas de Pokémon`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "detonado pokémon",
    "guia pokémon",
    "walkthrough pokémon",
    "mapas pokémon",
    "dicas pokémon",
    "pokemon firered detonado",
  ],
  authors: [{ name: SITE_NAME }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Detonados, guias e mapas de Pokémon`,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Detonados, guias e mapas de Pokémon`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SiteChrome
          header={<Header />}
          footer={<Footer />}
          tracker={<HistoryTracker />}
          storage={<StorageHydrator />}
        >
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
