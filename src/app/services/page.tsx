import { Metadata } from "next";
import OurServices from "@/components/home/OurServices";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Explore our comprehensive services: local market trading, bulk supply, export services, retail & online sales (Amazon, BigBasket), and private labelling & OEM solutions for premium cooking oils.",
  keywords: ["oil services", "bulk supply", "export services", "private labelling", "OEM", "cooking oil wholesale", "online oil sales", "Amazon", "BigBasket", "retail cooking oil"],
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <OurServices />
    </main>
  );
}
