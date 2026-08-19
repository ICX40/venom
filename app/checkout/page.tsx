'use client';
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isPlaced, setIsPlaced] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlaced(true);
    clearCart();
  };

  if (isPlaced) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <CheckCircle size={64} className="text-green-500 mb-6" />
        <h1 className="text-4xl font-black uppercase tracking-[0.2em] mb-4">Order Confirmed</h1>
        <p className="text-gray-400 tracking-widest max-w-md mb-10">
          Your dummy order has been placed successfully. Thank you for embracing the dark.
        </p>
        <Link href="/" className="px-10 py-4 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors mb-12 block">
          &larr; Back to Shop
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-[0.15em] mb-16">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Form Column */}
          <div className="lg:col-span-7">
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-12">
              
              {/* Shipping Details */}
              <section>
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 border-b border-white/10 pb-4 mb-6">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input required type="text" placeholder="FIRST NAME" className="w-full bg-[#0a0a0a] border border-white/10 p-4 text-sm tracking-widest text-white placeholder:text-gray-600 outline-none focus:border-white transition-colors uppercase" />
                  <input required type="text" placeholder="LAST NAME" className="w-full bg-[#0a0a0a] border border-white/10 p-4 text-sm tracking-widest text-white placeholder:text-gray-600 outline-none focus:border-white transition-colors uppercase" />
                  <input required type="email" placeholder="EMAIL ADDRESS" className="w-full md:col-span-2 bg-[#0a0a0a] border border-white/10 p-4 text-sm tracking-widest text-white placeholder:text-gray-600 outline-none focus:border-white transition-colors uppercase" />
                  <input required type="text" placeholder="FULL ADDRESS" className="w-full md:col-span-2 bg-[#0a0a0a] border border-white/10 p-4 text-sm tracking-widest text-white placeholder:text-gray-600 outline-none focus:border-white transition-colors uppercase" />
                  <input required type="text" placeholder="CITY" className="w-full bg-[#0a0a0a] border border-white/10 p-4 text-sm tracking-widest text-white placeholder:text-gray-600 outline-none focus:border-white transition-colors uppercase" />
                  <input required type="text" placeholder="POSTAL CODE" className="w-full bg-[#0a0a0a] border border-white/10 p-4 text-sm tracking-widest text-white placeholder:text-gray-600 outline-none focus:border-white transition-colors uppercase" />
                </div>
              </section>

              {/* Payment Method */}
              <section>
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 border-b border-white/10 pb-4 mb-6">Payment Method</h2>
                <div className="flex flex-col gap-4">
                  <label className="flex items-center gap-4 bg-[#0a0a0a] border border-white/10 p-6 cursor-pointer hover:border-white/30 transition-colors">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="cod" 
                      checked={paymentMethod === 'cod'} 
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-white w-4 h-4"
                    />
                    <span className="text-sm font-bold uppercase tracking-widest">Cash on Delivery</span>
                  </label>
                  <label className="flex items-center gap-4 bg-[#0a0a0a] border border-white/10 p-6 cursor-pointer hover:border-white/30 transition-colors">
                    <input 
                      type="radio" 
                      name="payment" 
                      value="online" 
                      checked={paymentMethod === 'online'} 
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-white w-4 h-4"
                    />
                    <span className="text-sm font-bold uppercase tracking-widest">Online Payment (Dummy)</span>
                  </label>
                </div>
              </section>

            </form>
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5">
            <div className="bg-[#0a0a0a] border border-white/5 p-8 sticky top-32">
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 border-b border-white/10 pb-4 mb-6">Order Summary</h2>
              
              <div className="flex flex-col gap-6 mb-8 max-h-[40vh] overflow-y-auto">
                {cartItems.length === 0 ? (
                  <p className="text-xs text-gray-500 tracking-widest uppercase">Your cart is empty.</p>
                ) : (
                  cartItems.map(item => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="w-16 h-20 relative bg-white shrink-0 rounded-sm">
                        <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold uppercase tracking-widest">{item.name}</h4>
                        <p className="text-gray-500 text-xs tracking-widest mt-1">QTY: {item.quantity}</p>
                      </div>
                      <span className="text-sm tracking-widest">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-white/10 pt-6 space-y-4 mb-8">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-sm font-black uppercase tracking-widest text-white pt-4 border-t border-white/10">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button 
                type="submit" 
                form="checkout-form"
                disabled={cartItems.length === 0}
                className="w-full py-5 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Place Order
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}