'use client';
import React, { useState, useEffect } from 'react';
import { X, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function FeedbackModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Open automatically after 10 seconds only for the very first time if not dismissed/submitted
    const hasSubmitted = localStorage.getItem('venom_feedback_submitted');
    const hasDismissed = localStorage.getItem('venom_feedback_dismissed');
    
    if (!hasSubmitted && !hasDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseModal = () => {
    setIsOpen(false);
    localStorage.setItem('venom_feedback_dismissed', 'true');
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || rating === 0 || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'feedbacks'), {
        name,
        feedback,
        rating,
        date: new Date().toLocaleDateString(),
        timestamp: Date.now()
      });

      localStorage.setItem('venom_feedback_submitted', 'true');
      setIsOpen(false);
    } catch (error) {
      console.error("Error saving feedback: ", error);
    } finally {
      setIsSubmitting(false);
      setName('');
      setFeedback('');
      setRating(0);
    }
  };

  return (
    <>
      {/* Permanent Fixed Floating Button at bottom-left corner */}
      <div 
        style={{ zIndex: 999998 }}
        className="fixed bottom-6 left-6 pointer-events-auto"
      >
        <button 
          onClick={handleOpenModal}
          className="group relative flex items-center gap-3 bg-black/80 backdrop-blur-md border border-white/30 px-5 py-3 rounded-full text-white hover:bg-white hover:text-black transition-all duration-500 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.5)] overflow-hidden cursor-pointer"
        >
          <div className="absolute top-0 -left-full w-1/2 h-full bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-12 transform group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          
          <Star size={16} className="text-white group-hover:text-black transition-colors fill-white group-hover:fill-black" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] pt-0.5">Rate Developer</span>
        </button>
      </div>

      {/* Full Feedback Modal */}
      <div 
        style={{ zIndex: 999999 }}
        className={cn(
          "fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center px-6 transition-all duration-700",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="relative w-full max-w-lg bg-[#050505] border border-white/10 p-8 md:p-12 shadow-2xl">
          <button 
            onClick={handleCloseModal} 
            className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors cursor-pointer"
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
                    className="transition-transform transform hover:scale-110 cursor-pointer"
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
              disabled={!name.trim() || rating === 0 || isSubmitting}
              className="w-full py-4 mt-4 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? 'Sending...' : 'Submit Feedback'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}