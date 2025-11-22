import { Metadata } from "next";
import OurServices from "@/components/home/OurServices";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Explore our range of services including local market trading, bulk supply, export services, and private labelling & OEM solutions for premium cooking oils.",
  keywords: ["oil services", "bulk supply", "export services", "private labelling", "OEM", "cooking oil wholesale"],
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <OurServices />
    </main>
  );
}
