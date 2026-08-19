'use client';
import React, { useState, use } from 'react';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import Image from 'next/image';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = PRODUCTS.find((p) => p.id === resolvedParams.id);

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold uppercase tracking-widest mb-4">Product Not Found</h1>
        <Link href="/" className="px-6 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedSize}`,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      size: selectedSize,
    });
  };

  return (
    <main className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
      <Loader onComplete={() => setIsLoaded(true)} />
      <Header isLoaded={isLoaded} />

      <div className="pt-36 pb-24 max-w-7xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors mb-12">
          <ArrowLeft size={16} /> Back to Store
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Product Image */}
          <div className="w-full aspect-3/4 bg-white relative rounded-sm overflow-hidden">
            <Image src={product.image} alt={product.name} fill className="object-contain p-8" priority />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-[0.3em] mb-4">{product.category}</span>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-[0.15em] mb-4 text-white">{product.name}</h1>
            <p className="text-2xl font-light tracking-widest text-gray-300 mb-8">${product.price.toFixed(2)}</p>

            <p className="text-gray-400 text-sm tracking-wider leading-relaxed mb-8 uppercase">{product.description}</p>

            {/* Sizes Selection */}
            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Select Size</h3>
              <div className="flex gap-4">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center text-xs font-bold uppercase tracking-widest border transition-all ${
                      selectedSize === size
                        ? 'bg-white text-black border-white'
                        : 'bg-transparent text-white border-white/20 hover:border-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4 mb-12">
              <div className="flex items-center border border-white/20 rounded-sm">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-4 text-gray-400 hover:text-white">-</button>
                <span className="w-10 text-center text-xs font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-4 text-gray-400 hover:text-white">+</button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-3 py-4 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors"
              >
                <ShoppingBag size={18} /> Add to Cart
              </button>
            </div>

            {/* Features List */}
            <div className="border-t border-white/10 pt-8">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Product Details</h3>
              <ul className="space-y-2 text-xs tracking-widest text-gray-300 uppercase">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span> {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}