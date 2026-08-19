'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SequenceHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Total number of frames from your extracted zip (235 files)
    const frameCount = 235; 
    
    const currentFrame = (index: number) => 
      `/sequence/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

    const images: HTMLImageElement[] = [];
    const imageSeq = { frame: 0 };
    let lastValidImage: HTMLImageElement | null = null;

    // Preload images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    const render = () => {
      if (images.length === 0) return;
      
      const rawFrame = imageSeq.frame || 0;
      const frameIndex = Math.max(0, Math.min(frameCount - 1, Math.round(rawFrame)));
      const img = images[frameIndex];
      
      if (img && img.complete && img.naturalHeight !== 0) {
        lastValidImage = img;
      }

      if (lastValidImage) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(lastValidImage, 0, 0, canvas.width, canvas.height);
      }
    };

    images[0].onload = () => {
      lastValidImage = images[0];
      render();
    };

    // The animation tracks the 300vh invisible container.
    // We removed pinning entirely to make the scroll-over transition flawless.
    const animation = gsap.to(imageSeq, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom', 
        scrub: 0.5,
        onUpdate: render,
      },
    });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(); 
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => {
      window.removeEventListener('resize', handleResize);
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* 
        This is the fixed background video. 
        It stays completely still at the back (z-0) while the rest of the site scrolls OVER it. 
      */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 bg-black overflow-hidden pointer-events-none">
        <canvas 
          ref={canvasRef} 
          className="absolute top-0 left-0 w-full h-full object-cover opacity-80" 
        />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <h1 className="text-white/90 text-7xl md:text-[9rem] font-black uppercase tracking-[0.25em] text-center mix-blend-difference drop-shadow-2xl">
            VENOM
          </h1>
          <p className="text-white/50 mt-8 tracking-[0.5em] uppercase text-[10px] font-medium">
            Embrace The Dark
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-48 md:h-72 bg-linear-to-t from-black via-black/80 to-transparent z-20" />
      </div>

      {/* 
        This invisible element creates the actual 300vh scrollable space.
        When the user scrolls past this, the next section glides up naturally.
      */}
      <div ref={containerRef} className="relative w-full h-[300vh] z-10 pointer-events-none" />
    </>
  );
}