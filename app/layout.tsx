import type { Metadata, Viewport } from "next";
import { Inter_Tight, Instrument_Serif } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { site } from "@/lib/content";

const sans = Inter_Tight({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  authors: [{ name: site.name }],
  ...(site.url ? { metadataBase: new URL(site.url), alternates: { canonical: "/" } } : {}),
  openGraph: {
    type: "website",
    title: site.ogTitle,
    description: site.ogDescription,
    ...(site.url ? { url: site.url, images: [`${site.url}${site.photo}`] } : {}),
  },
  twitter: { card: "summary" },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eceef2" },
    { media: "(prefers-color-scheme: dark)", color: "#07080b" },
  ],
};

// Structured data: helps search engines understand who this page is about
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ogbanje Abraham",
  jobTitle: "Software Engineer",
  address: { "@type": "PostalAddress", addressCountry: "NG" },
  alumniOf: "Joseph Sarwuan Tarka University, Makurdi",
  sameAs: ["https://github.com/abrahamogbanje", "https://www.linkedin.com/in/abraham-ogbanje-522744351"],
};

// Applies a saved light/dark choice before the first paint, so there's no flash
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <noscript>
          <style>{`.preloader{display:none!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
