import type { Metadata } from "next";
import { Archivo, Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
  preload: true,
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
  preload: false,
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Chandy's Global Exports — Guitar Parts, Hardwood & Plywood from Kodagu",
  description:
    "Manufacturer and exporter of guitar parts, hardwood furniture, plywood and veneers from Kodagu, Karnataka, India. Proprietor: Sisson Chandy. Shipping specifications worldwide.",
  keywords: [
    "guitar parts export India",
    "hardwood furniture exporter Kodagu",
    "plywood veneer Karnataka",
    "fretboard blanks export",
    "guitar neck blank India",
    "ISPM-15 wood export",
    "Chandy Global Exports",
  ],
  openGraph: {
    title: "Chandy's Global Exports",
    description:
      "Guitar parts, hardwood furniture and plywood — manufactured in Kodagu, Karnataka, shipped to specification worldwide.",
    type: "website",
    locale: "en_IN",
    siteName: "Chandy's Global Exports",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chandy's Global Exports",
    description:
      "Guitar parts, hardwood furniture and plywood from Kodagu, Karnataka.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${newsreader.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
