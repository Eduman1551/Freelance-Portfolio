// app/layout.tsx
// Root layout — fonts, metadata, providers (Lenis, custom cursor).

import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Kin — Web developer for small businesses",
  description: siteConfig.metaDescription,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Kin — Web developer for small businesses",
    description: siteConfig.metaDescription,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kin — Web developer for small businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kin — Web developer for small businesses",
    description: siteConfig.metaDescription,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LenisProvider>
          {/* Custom cursor — hidden on touch devices via CSS */}
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
