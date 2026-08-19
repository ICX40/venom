'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, User, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import SearchModal from './SearchModal';
import AuthModal from './AuthModal';

export default function Header() {
  const [showLogo, setShowLogo] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  
  const { toggleCart, cartItems } = useCart();
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 2.5) {
        setShowLogo(true);
      } else {
        setShowLogo(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-transparent transition-all duration-500 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between relative pointer-events-auto">
          
          <nav className="hidden md:flex flex-1 gap-10 items-center justify-start">
            <Link href="#tshirts" className="text-[10px] md:text-xs font-bold text-gray-300 hover:text-white transition-colors uppercase tracking-[0.2em]">
              T-Shirts
            </Link>
            <Link href="#hoodies" className="text-[10px] md:text-xs font-bold text-gray-300 hover:text-white transition-colors uppercase tracking-[0.2em]">
              Hoodies
            </Link>
          </nav>

          <Link 
            href="/" 
            className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-[1.5s] ease-out",
              showLogo ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
            )}
          >
            <div className="relative w-32 h-12 md:w-40 md:h-16">
              <Image src="/logo/1.png" alt="VENOM Logo" fill className="object-contain" priority />
            </div>
          </Link>

          <div className="hidden md:flex flex-1 gap-10 items-center justify-end">
            <Link href="#collections" className="text-[10px] md:text-xs font-bold text-gray-300 hover:text-white transition-colors uppercase tracking-[0.2em] mr-4">
              Collections
            </Link>
            
            <div className="flex items-center gap-6 text-white border-l border-white/20 pl-8">
              <button onClick={() => setIsSearchOpen(true)} className="hover:text-gray-400 transition-all transform hover:scale-110" aria-label="Search">
                <Search size={18} strokeWidth={2.5} />
              </button>
              <button onClick={() => setIsAuthOpen(true)} className="hover:text-gray-400 transition-all transform hover:scale-110" aria-label="Account Login">
                <User size={18} strokeWidth={2.5} />
              </button>
              <button onClick={toggleCart} className="relative hover:text-gray-400 transition-all transform hover:scale-110" aria-label="Cart">
                <ShoppingBag size={18} strokeWidth={2.5} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="flex md:hidden flex-1 justify-end text-white gap-6">
            <button onClick={() => setIsSearchOpen(true)} aria-label="Search">
              <Search size={20} />
            </button>
            <button onClick={() => setIsAuthOpen(true)} aria-label="Account">
              <User size={20} />
            </button>
            <button onClick={toggleCart} className="relative" aria-label="Cart">
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}