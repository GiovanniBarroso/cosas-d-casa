import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "Cosas D Casa",
    template: "%s | Cosas D Casa",
  },
  description: "Catálogo local de productos únicos para tu hogar",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName: "Cosas D Casa",
    title: "Cosas D Casa",
    description: "Catálogo local de productos únicos para tu hogar",
    images: [
      {
        url: "/og-image.jpg", // 📌 prepara esta imagen en /public
        width: 1200,
        height: 630,
        alt: "Cosas D Casa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cosas D Casa",
    description: "Catálogo local de productos únicos para tu hogar",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-gray-50 text-gray-800`}
      >
        <header>
          <Navbar />
        </header>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
