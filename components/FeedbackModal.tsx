'use client';
import React, { useState, useEffect } from 'react';
import { X, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FeedbackModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  useEffect(() => {
    const hasSubmitted = localStorage.getItem('venom_feedback_submitted');
    
    if (!hasSubmitted) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || rating === 0) return;

    const newFeedback = {
      id: Date.now().toString(),
      name,
      feedback,
      rating,
      date: new Date().toLocaleDateString()
    };

    const existingFeedbacks = JSON.parse(localStorage.getItem('venom_feedbacks') || '[]');
    localStorage.setItem('venom_feedbacks', JSON.stringify([...existingFeedbacks, newFeedback]));
    localStorage.setItem('venom_feedback_submitted', 'true');
    
    setIsOpen(false);
  };

  return (
    <div className={cn(
      "fixed inset-0 z-150 bg-black/80 backdrop-blur-md flex items-center justify-center px-6 transition-all duration-700",
      isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
    )}>
      <div className="relative w-full max-w-lg bg-[#050505] border border-white/10 p-8 md:p-12 shadow-2xl">
        <button 
          onClick={() => setIsOpen(false)} 
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl md:text-2xl font-black uppercase tracking-[0.2em] text-white mb-2 text-center">
          Rate Your Experience
        </h2>
        <p className="text-gray-500 text-xs tracking-widest text-center uppercase mb-8">
          Embrace the dark and leave your thoughts
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            required
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="YOUR NAME" 
            className="w-full bg-[#0a0a0a] border border-white/10 p-4 text-xs tracking-widest text-white placeholder:text-gray-600 outline-none focus:border-white transition-colors uppercase"
          />
          
          <textarea 
            required
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="HOW WAS THE DESIGN?" 
            rows={3}
            className="w-full bg-[#0a0a0a] border border-white/10 p-4 text-xs tracking-widest text-white placeholder:text-gray-600 outline-none focus:border-white transition-colors uppercase resize-none"
          />

          <div className="flex flex-col items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Rating</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform transform hover:scale-110"
                >
                  <Star 
                    size={28} 
                    className={cn(
                      "transition-colors duration-300",
                      (hoveredRating || rating) >= star ? "fill-white text-white" : "text-gray-600"
                    )} 
                  />
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            disabled={!name.trim() || rating === 0}
            className="w-full py-4 mt-4 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}