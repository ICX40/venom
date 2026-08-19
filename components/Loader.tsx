'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Prevent scrolling while loader is active
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Re-enable scrolling when loader is done
          document.body.style.overflow = '';
          if (loaderRef.current) {
            loaderRef.current.style.display = 'none';
          }
          if (onComplete) {
            onComplete();
          }
        }
      });

      // 1. Text fades in, blurs out, and spreads its letters
      tl.fromTo(textRef.current, 
        { 
          opacity: 0, 
          letterSpacing: '0.1em', 
          filter: 'blur(12px)',
          scale: 0.9 
        },
        { 
          opacity: 1, 
          letterSpacing: '0.5em', 
          filter: 'blur(0px)', 
          scale: 1,
          duration: 2, 
          ease: 'power3.out' 
        }
      )
      // 2. Text gently fades out and scales up slightly
      .to(textRef.current, { 
        opacity: 0, 
        scale: 1.1, 
        duration: 0.6, 
        ease: 'power2.inOut' 
      }, "+=0.5")
      // 3. The entire black loader screen dissolves with a heavy blur effect
      .to(loaderRef.current, { 
        opacity: 0, 
        filter: 'blur(20px)',
        duration: 1.5, 
        ease: 'power2.inOut' 
      });
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div 
      ref={loaderRef} 
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
    >
      <h1 
        ref={textRef} 
        className="text-white text-4xl md:text-6xl font-black uppercase tracking-wide drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
      >
        VENOM
      </h1>
    </div>
  );
}