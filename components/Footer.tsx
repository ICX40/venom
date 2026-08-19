'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Footer() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Replaced 'any' with the proper strict type HTMLElement
      gsap.utils.toArray<HTMLElement>('.footer-stagger-group').forEach((group) => {
        const items = group.querySelectorAll('.footer-stagger-item');
        gsap.fromTo(items, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 90%',
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer className="w-full bg-black border-t border-white/5 pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 footer-stagger-group">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div className="footer-stagger-item">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-[0.2em] text-white mb-6">
              VENOM
            </h2>
            <p className="text-gray-400 text-sm tracking-widest max-w-sm leading-relaxed uppercase">
              Embrace the dark. Exclusive aesthetic clothing crafted for the bold.
            </p>
          </div>
          
          <div className="flex flex-col justify-center footer-stagger-item">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-6">
              Join The Cult (Newsletter)
            </h3>
            <div className="flex relative border-b border-white/20 pb-2 focus-within:border-white transition-colors">
              <input 
                type="email" 
                placeholder="ENTER YOUR EMAIL" 
                className="w-full bg-transparent text-white placeholder:text-gray-600 text-sm tracking-widest outline-none uppercase"
              />
              <button className="absolute right-0 text-gray-400 hover:text-white transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          <div className="flex flex-col gap-4 footer-stagger-item">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4">Shop</h4>
            <Link href="#tshirts" className="text-gray-500 hover:text-white text-xs tracking-widest uppercase transition-colors">T-Shirts</Link>
            <Link href="#hoodies" className="text-gray-500 hover:text-white text-xs tracking-widest uppercase transition-colors">Hoodies</Link>
            <Link href="#accessories" className="text-gray-500 hover:text-white text-xs tracking-widest uppercase transition-colors">Accessories</Link>
          </div>
          
          <div className="flex flex-col gap-4 footer-stagger-item">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4">Support</h4>
            <Link href="#" className="text-gray-500 hover:text-white text-xs tracking-widest uppercase transition-colors">FAQ</Link>
            <Link href="#" className="text-gray-500 hover:text-white text-xs tracking-widest uppercase transition-colors">Shipping & Returns</Link>
            <Link href="#" className="text-gray-500 hover:text-white text-xs tracking-widest uppercase transition-colors">Contact Us</Link>
          </div>

          <div className="flex flex-col gap-4 footer-stagger-item">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4">Legal</h4>
            <Link href="#" className="text-gray-500 hover:text-white text-xs tracking-widest uppercase transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-gray-500 hover:text-white text-xs tracking-widest uppercase transition-colors">Terms of Service</Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-6 footer-stagger-item">
          <p className="text-gray-600 text-xs tracking-widest uppercase">
            &copy; {new Date().getFullYear()} VENOM. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-gray-500">
            <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}