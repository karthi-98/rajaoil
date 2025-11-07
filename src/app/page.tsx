import HeroSlider from "@/components/home/HeroSlider";
import ProductGrid from "@/components/product/ProductGrid";
import { ProductService } from "@/services/product.service";

export default async function Home() {
  // Fetch products from Firebase
  const products = await ProductService.getAllProducts();

  return (
    <div className="font-sans bg-white">
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductGrid products={products} title="Our Products" />
      </section>

      {/* Add more sections here */}
    </div>
  );
}
