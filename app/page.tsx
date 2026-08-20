'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import SequenceHero from '@/components/SequenceHero';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import { CoverflowCarousel } from '@/components/CoverflowCarousel';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import FeedbackModal from '@/components/FeedbackModal';
import AdminDashboard from '@/components/AdminDashboard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';

const carouselSlides = [
  { src: "/brand/1.png", alt: "Venom Tribal Tee", title: "Core Collection" },
  { src: "/brand/2.png", alt: "Oblivion Long Sleeve", title: "Signature Fits" },
  { src: "/brand/1.png", alt: "Void Hoodie", title: "Heavyweight Series" },
  { src: "/brand/2.png", alt: "Dark Aesthetic", title: "Exclusive Drops" }
];

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { addToCart } = useCart();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Visitor Tracking Logic
    const trackVisitor = async () => {
      const hasVisited = localStorage.getItem('venom_has_visited');
      if (!hasVisited) {
        localStorage.setItem('venom_has_visited', 'true');
        const statRef = doc(db, 'statistics', 'visitors');
        try {
          const docSnap = await getDoc(statRef);
          if (docSnap.exists()) {
            await updateDoc(statRef, { count: increment(1) });
          } else {
            await setDoc(statRef, { count: 1 });
          }
        } catch (error) {
          console.error("Error tracking visitor: ", error);
        }
      }
    };
    trackVisitor();

    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.fade-up').forEach((el) => {
        gsap.fromTo(el, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.2, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%', 
            }
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('.stagger-group').forEach((group) => {
        const items = group.querySelectorAll('.stagger-item');
        gsap.fromTo(items, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            stagger: 0.2, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 85%',
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const tshirts = PRODUCTS.filter(p => p.category === 'T-Shirts');
  const hoodies = PRODUCTS.filter(p => p.category === 'Hoodies');

  return (
    <main className="bg-black min-h-screen text-white selection:bg-white selection:text-black overflow-x-hidden relative">
      
      <Loader onComplete={() => setIsLoaded(true)} />

      <Header isLoaded={isLoaded} />
      
      <SequenceHero />

      <div className="relative z-20 bg-black">
        
        {/* T-Shirts Section */}
        <section id="tshirts" className="w-full py-32 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="fade-up flex flex-col md:flex-row items-end justify-between mb-20 gap-6">
              <div>
                <h2 className="text-sm text-gray-500 font-bold uppercase tracking-[0.3em] mb-4">
                  Season 01
                </h2>
                <h3 className="text-4xl md:text-5xl font-black uppercase tracking-[0.15em] text-white">
                  Latest Arrivals
                </h3>
              </div>
              <button className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors duration-500">
                View All Collection
                <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform duration-500" />
              </button>
            </div>
            
            <div className="stagger-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {tshirts.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} className="stagger-item group cursor-pointer block">
                  <div className="w-full aspect-3/4 bg-white overflow-hidden relative mb-6 rounded-sm">
                    <div className="absolute inset-0 transition-transform duration-[1.5s] ease-out group-hover:scale-105">
                      <Image src={product.image} alt={product.name} fill className="object-contain p-6" />
                    </div>
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                  <div className="flex justify-between items-start">
                    <h4 className="text-base font-bold uppercase tracking-[0.15em] text-white/90 group-hover:text-white transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-gray-400 tracking-widest text-sm font-light">${product.price.toFixed(2)}</p>
                  </div>
                  <p className="text-gray-600 text-xs tracking-wider mt-2 uppercase">{product.features[0]}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Hoodies Section */}
        <section id="hoodies" className="w-full py-32 bg-[#030303] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="fade-up flex flex-col md:flex-row items-end justify-between mb-20 gap-6">
              <div>
                <h2 className="text-sm text-gray-500 font-bold uppercase tracking-[0.3em] mb-4">
                  Outerwear
                </h2>
                <h3 className="text-4xl md:text-5xl font-black uppercase tracking-[0.15em] text-white">
                  Hoodies & Knitwear
                </h3>
              </div>
            </div>
            
            <div className="stagger-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {hoodies.map((product) => (
                <Link key={product.id} href={`/product/${product.id}`} className="stagger-item group cursor-pointer block">
                  <div className="w-full aspect-3/4 bg-[#0a0a0a] overflow-hidden relative mb-6 rounded-sm">
                    <div className="absolute inset-0 transition-transform duration-[1.5s] ease-out group-hover:scale-105">
                      <Image src={product.image} alt={product.name} fill className="object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                  <div className="flex justify-between items-start">
                    <h4 className="text-base font-bold uppercase tracking-[0.15em] text-white/90 group-hover:text-white transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-gray-400 tracking-widest text-sm font-light">${product.price.toFixed(2)}</p>
                  </div>
                  <p className="text-gray-600 text-xs tracking-wider mt-2 uppercase">{product.features[0]}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Collections Carousel Section */}
        <section id="collections" className="w-full py-32 bg-[#050505] border-t border-white/5 overflow-hidden">
          <div className="fade-up max-w-7xl mx-auto px-6 mb-16 text-center">
            <h2 className="text-sm text-gray-500 font-bold uppercase tracking-[0.3em] mb-4">
              Curated For You
            </h2>
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-[0.15em] text-white">
              Explore Collections
            </h3>
          </div>
          
          <div className="fade-up">
            <CoverflowCarousel 
              slides={carouselSlides}
              showNavigation={true}
              showPagination={true}
              showCaption={true}
              cardClassName="bg-white p-4"
            />
          </div>
        </section>

        <Footer /> 
      </div>

      {/* Secret Admin & Feedback Features */}
      <FeedbackModal />
      <AdminDashboard />
    </main>
  );
}