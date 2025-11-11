import HeroSlider from "@/components/home/HeroSlider";
import ProductGrid from "@/components/product/ProductGrid";
import Testimonials from "@/components/home/Testimonials";
import ProductShowcase from "@/components/home/ProductShowcase";
import { ProductService } from "@/services/product.service";
import Link from "next/link";

export default async function Home() {
  // Fetch products from Firebase
  const products = await ProductService.getAllProducts();

  return (
    <div className="font-sans bg-white">
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-4 mt-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
          <p className="text-sm md:text-base text-gray-600 mb-3">Discover our most popular premium quality oils</p>
        </div>
        <div className="mt-2">
          <ProductGrid products={products.slice(0, 4)} compact />
        </div>
        <div className="text-center mt-8 mb-8">

        <Link
            href="/products"
            className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-2 text-sm rounded-lg transition-colors"
            >
            View All Products
          </Link>
            </div>
      </section>
      {/* Product Showcase Section */}
      <ProductShowcase />

      {/* Customer Testimonials Section */}
      <Testimonials />
    </div>
  );
}
