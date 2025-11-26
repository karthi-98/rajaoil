import type { Metadata } from "next";
import { Inter, Merriweather, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/layout/Footer";
import { CartProvider } from "@/contexts/CartContext";
import CartSidebar from "@/components/cart/CartSidebar";
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL('https://sreeraajaganapathyoilmill.com'),
  title: {
    default: "SreeRaajaGanapathy Oil Mill - Premium Quality Cooking Oils",
    template: "%s | SreeRaajaGanapathy Oil Mill",
  },
  description: "Premium quality cooking oils including coconut oil, groundnut oil, and gingelly oil. Traditional cold-pressed methods, 100% pure and natural. Trusted by families for generations. Order online with free delivery.",
  keywords: ["cooking oil", "coconut oil", "groundnut oil", "gingelly oil", "sesame oil", "premium oil", "natural oil", "cold-pressed oil", "buy cooking oil online", "traditional oil mill"],
  authors: [{ name: "SreeRaajaGanapathy Oil Mill" }],
  creator: "SreeRaajaGanapathy Oil Mill",
  publisher: "SreeRaajaGanapathy Oil Mill",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://sreeraajaganapathyoilmill.com',
    siteName: 'SreeRaajaGanapathy Oil Mill',
    title: 'SreeRaajaGanapathy Oil Mill - Premium Quality Cooking Oils',
    description: 'Buy premium quality cooking oils online. Traditional cold-pressed coconut oil, groundnut oil, and sesame oil. 100% pure and natural. Free delivery.',
    images: [
      {
        url: '/images/logo_new.png',
        width: 1200,
        height: 630,
        alt: 'SreeRaajaGanapathy Oil Mill Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SreeRaajaGanapathy Oil Mill - Premium Quality Cooking Oils',
    description: 'Buy premium quality cooking oils online. Traditional methods, 100% pure and natural.',
    images: ['/images/logo_new.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://sreeraajaganapathyoilmill.com',
  },
  verification: {
    google: 'your-google-verification-code', // Add your actual verification code from Google Search Console
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${merriweather.variable} ${montserrat.variable} antialiased`}
      >
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartSidebar />
          <Toaster position="top-right" richColors />
        </CartProvider>
      </body>
    </html>
  );
}
