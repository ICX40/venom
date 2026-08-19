'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={cn(
      "fixed inset-0 z-100 bg-black/80 backdrop-blur-md flex items-center justify-center px-6 transition-all duration-500",
      isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
    )}>
      <div className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 p-8 md:p-12">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-black uppercase tracking-[0.2em] text-white mb-2 text-center">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h2>
        <p className="text-gray-500 text-xs tracking-widest text-center uppercase mb-8">
          {isLogin ? 'Enter your details to access your account' : 'Join the dark aesthetic cult'}
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {!isLogin && (
            <input 
              type="text" 
              placeholder="FULL NAME" 
              className="w-full bg-black border border-white/10 p-4 text-xs tracking-widest text-white placeholder:text-gray-600 outline-none focus:border-white uppercase"
            />
          )}
          <input 
            type="email" 
            placeholder="EMAIL ADDRESS" 
            className="w-full bg-black border border-white/10 p-4 text-xs tracking-widest text-white placeholder:text-gray-600 outline-none focus:border-white uppercase"
          />
          <input 
            type="password" 
            placeholder="PASSWORD" 
            className="w-full bg-black border border-white/10 p-4 text-xs tracking-widest text-white placeholder:text-gray-600 outline-none focus:border-white uppercase"
          />
          <button className="w-full py-4 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors">
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-gray-400 hover:text-white text-[10px] tracking-widest uppercase transition-colors"
          >
            {isLogin ? "Don't have an account? Create one" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}