import type { Metadata } from "next";
import { Inter, Bebas_Neue, Montserrat } from "next/font/google";
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

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});


export const metadata: Metadata = {
  title: {
    default: "Sreerajaganapathy Oil Mill - Premium Quality Cooking Oils",
    template: "%s | Sreerajaganapathy Oil Mill",
  },
  description: "Premium quality cooking oils including coconut oil, groundnut oil, and gingelly oil. Traditional methods, pure and natural. Trusted by families for generations.",
  keywords: ["cooking oil", "coconut oil", "groundnut oil", "gingelly oil", "sesame oil", "premium oil", "natural oil"],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/icon.png',
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
        className={`${inter.className} ${bebasNeue.variable} ${montserrat.variable} antialiased`}
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
