import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TV Shows Explorer",
    template: "%s | TV Shows Explorer",
  },
  description:
    "Discover and explore TV shows including The Powerpuff Girls. Browse comprehensive show details, episode guides, cast information, ratings, and more. Your complete television series companion.",
  keywords: [
    "TV shows",
    "television",
    "episodes",
    "series",
    "The Powerpuff Girls",
    "Powerpuff Girls",
    "Cartoon Network",
    "streaming",
    "entertainment",
    "show guide",
    "episode guide",
    "TV series",
    "animated series",
  ],
  authors: [{ name: "TV Shows Explorer" }],
  creator: "TV Shows Explorer",
  publisher: "TV Shows Explorer",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "TV Shows Explorer - The Powerpuff Girls & More",
    description:
      "Discover and explore TV shows including The Powerpuff Girls. Browse episodes, cast information, ratings, and detailed show guides.",
    siteName: "TV Shows Explorer",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
