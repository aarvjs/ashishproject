import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sabkasathi.com"),
  title: "Best Software Development Company in Gujarat, Maharashtra & Bihar | Sabka Saathi",
  description:
    "Looking for top software development company in Gujarat, Maharashtra or Bihar? We provide custom web, app & SaaS development services at affordable price.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  openGraph: {
    title: "Best Software Development Company in Gujarat, Maharashtra & Bihar | Sabka Saathi",
    description: "Looking for top software development company in Gujarat, Maharashtra or Bihar? Custom web, app & SaaS solutions.",
    url: "https://sabkasathi.com",
    siteName: "Sabka Saathi",
    images: [{ url: "/logo.png", width: 800, height: 600 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Software Development Company in Gujarat, Maharashtra & Bihar",
    description: "Custom software solutions and CRM automation in Gujarat, Maharashtra & Bihar.",
    images: ["/logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@id": "https://sabkasathi.com/#organization",
  "@type": "Organization",
  "name": "Sabka Saathi",
  "url": "https://sabkasathi.com",
  "logo": "https://sabkasathi.com/logo.png",
  "description": "High-performance software development company in Gujarat, Maharashtra and Bihar.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9431673018",
    "contactType": "customer service"
  }
};

import { FloatingContact } from "@/components/FloatingContact";
import { Preloader } from "@/components/Preloader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (sessionStorage.getItem('hasPreloaded')) {
                  document.documentElement.classList.add('preloaded-hide');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Preloader />
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <FloatingContact />
        <Script
          id="service-worker-registration"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
