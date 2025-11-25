import { Metadata } from "next";
import PrivateLabellingContent from "@/components/services/PrivateLabellingContent";

export const metadata: Metadata = {
  title: "Our Oil, Your Brand - Private Labelling & OEM Services",
  description: "Launch or expand your own brand with our private labelling and OEM solutions. 3 generations of oil expertise, traditional extraction with modern hygiene, and complete confidentiality for your brand.",
  keywords: ["private labelling", "OEM", "contract manufacturing", "cooking oil branding", "white label oils", "private label cooking oil", "custom oil packaging", "brand manufacturing"],
};

export default function PrivateLabellingPage() {
  return (
    <main className="min-h-screen bg-white">
      <PrivateLabellingContent />
    </main>
  );
}
