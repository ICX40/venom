'use client';
import React, { useState } from 'react';
import { X, Search as SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');

  return (
    <div className={cn(
      "fixed inset-0 z-100 bg-black/80 backdrop-blur-md flex flex-col items-center justify-start pt-32 px-6 transition-all duration-500",
      isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
    )}>
      <button onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-white transition-colors">
        <X size={28} />
      </button>

      <div className="w-full max-w-2xl">
        <div className="flex items-center border-b border-white/20 pb-4 focus-within:border-white transition-colors">
          <SearchIcon size={24} className="text-gray-400 mr-4" />
          <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="SEARCH COLLECTIONS, T-SHIRTS, HOODIES..." 
            className="w-full bg-transparent text-xl md:text-2xl text-white placeholder:text-gray-600 tracking-widest outline-none uppercase"
            autoFocus
          />
        </div>
        <p className="text-gray-500 text-xs tracking-widest mt-6 uppercase">
          {query ? `Searching for "${query}"...` : 'Type to start searching'}
        </p>
      </div>
    </div>
  );
}