'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react'
import Link from 'next/link'
import ProductImageSlider from '@/components/product/ProductImageSlider'
import { ProductService } from '@/services/product.service'
import { useCartContext } from '@/contexts/CartContext'
import type { Product, ProductType } from '@/lib/types'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCartContext()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedVariants, setSelectedVariants] = useState<ProductType[]>([])

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id) return

      setLoading(true)
      const fetchedProduct = await ProductService.getProductById(params.id as string)
      setProduct(fetchedProduct)
      setLoading(false)
    }

    fetchProduct()
  }, [params.id])

  const handleVariantToggle = (variant: ProductType) => {
    setSelectedVariants((prev) => {
      const exists = prev.find((v) => v.name === variant.name)
      if (exists) {
        return prev.filter((v) => v.name !== variant.name)
      } else {
        return [...prev, variant]
      }
    })
  }

  const isVariantSelected = (variant: ProductType) => {
    return selectedVariants.some((v) => v.name === variant.name)
  }

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(numPrice)
  }

  const getTotalPrice = () => {
    return selectedVariants.reduce((sum, variant) => sum + parseFloat(variant.price), 0)
  }

  const handleAddToCart = () => {
    if (!product || selectedVariants.length === 0) {
      alert('Please select at least one variant')
      return
    }

    // Add each selected variant as a separate cart item
    selectedVariants.forEach((variant) => {
      addItem(
        {
          id: `${product.id}-${variant.name}`,
          productId: product.id,
          brand: product.brand,
          name: variant.name,
          price: parseFloat(variant.price),
          image: variant.image || product.mainImage,
        },
        1
      )
    })

    // Clear selections after adding
    setSelectedVariants([])
    alert('Items added to cart!')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    )
  }

  // Get all variant images for slider
  const allImages = [
    product.mainImage,
    ...product.types.map((type) => type.image).filter(Boolean),
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Image Slider */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <ProductImageSlider images={allImages} productName={product.brand} />
          </div>

          {/* Right Side - Product Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            {/* Brand Name */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.brand}</h1>

            {/* Description if available */}
            {product.description && (
              <p className="text-gray-600 mb-6">{product.description}</p>
            )}

            {/* Variants Selection */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Select Packaging Type{selectedVariants.length > 0 && 's'}
              </h2>

              <div className="space-y-3">
                {product.types.map((variant, index) => {
                  const selected = isVariantSelected(variant)

                  return (
                    <button
                      key={index}
                      onClick={() => handleVariantToggle(variant)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        selected
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {variant.name}
                          </h3>
                          <p className="text-primary text-xl font-bold">
                            {formatPrice(variant.price)}
                          </p>
                        </div>

                        {/* Checkbox */}
                        <div
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                            selected
                              ? 'bg-primary border-primary'
                              : 'border-gray-300'
                          }`}
                        >
                          {selected && <Check className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Selected Summary */}
            {selectedVariants.length > 0 && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Selected Items ({selectedVariants.length})
                </h3>
                <ul className="space-y-1 mb-3">
                  {selectedVariants.map((variant, index) => (
                    <li key={index} className="text-sm text-gray-600 flex justify-between">
                      <span>{variant.name}</span>
                      <span className="font-medium">{formatPrice(variant.price)}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={selectedVariants.length === 0}
              className="w-full bg-primary text-white py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Add {selectedVariants.length > 0 && `${selectedVariants.length} Item${selectedVariants.length > 1 ? 's' : ''}`} to Cart
            </button>

            {/* Help Text */}
            <p className="text-sm text-gray-500 text-center mt-4">
              Select one or more packaging types to add to your cart
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
