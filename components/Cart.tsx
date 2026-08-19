'use client';
import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Cart() {
  const { 
    isCartOpen, 
    toggleCart, 
    cartItems, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity, 
    cartTotal 
  } = useCart();

  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 bg-black/80 backdrop-blur-md z-90 transition-opacity duration-500",
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleCart}
      />

      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-112.5 bg-[#080808] border-l border-white/10 z-100 transform transition-transform duration-700 ease-out flex flex-col shadow-2xl",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="h-28 px-8 flex items-center justify-between border-b border-white/10">
          <div>
            <h2 className="text-lg font-black uppercase tracking-[0.25em] text-white">Your Cart</h2>
            <p className="text-gray-500 text-[10px] tracking-widest mt-1 uppercase">{cartItems.length} Items Selected</p>
          </div>
          <button onClick={toggleCart} className="text-gray-400 hover:text-white transition-colors p-2">
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
              <ShoppingBagIcon className="w-12 h-12 mb-4 text-gray-600" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] mb-2">Cart is empty</span>
              <p className="text-[10px] tracking-widest uppercase">Embrace the dark and add some pieces.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-5 bg-white/[0.02] p-5 rounded-sm border border-white/5 items-center">
                <div className="w-20 h-24 relative bg-white rounded-xs overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-600 hover:text-red-400 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                  {item.size && (
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Size: {item.size}</p>
                  )}
                  <p className="text-gray-400 text-xs tracking-widest font-light mb-3">${item.price.toFixed(2)}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-white/20 rounded-xs">
                      <button onClick={() => decreaseQuantity(item.id)} className="px-3 py-1 text-gray-400 hover:text-white transition-colors"><Minus size={10} /></button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)} className="px-3 py-1 text-gray-400 hover:text-white transition-colors"><Plus size={10} /></button>
                    </div>
                    <span className="text-xs font-bold tracking-widest text-white">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-8 border-t border-white/10 bg-[#050505]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Subtotal</span>
              <span className="text-xl font-bold tracking-widest text-white">${cartTotal.toFixed(2)}</span>
            </div>
            <Link 
              href="/checkout" 
              onClick={toggleCart} 
              className="group flex items-center justify-center gap-3 w-full py-5 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors"
            >
              Proceed to Checkout
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

function ShoppingBagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
  );
}