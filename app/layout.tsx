import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Face",
  description: "Bit by bit, my own stade du miroir.",
  openGraph: {
    title: "Face",
    description: "Bit by bit, my own stade du miroir.",
    url: "https://work.tom.so/face",
    siteName: "Face",
    locale: "en_NZ",
    type: "website",
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
  twitter: {
    title: "Face",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta property="og:image" content="/face/og.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="/face/og.png" />
        <meta
          name="description"
          content="Bit by bit, my own stade du miroir."
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/face/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/face/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/face/favicon-16x16.png"
        />
        <link rel="manifest" href="/face/site.webmanifest" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}