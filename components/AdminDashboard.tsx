'use client';
import React, { useState, useEffect } from 'react';
import { X, Star, Users, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

interface FeedbackItem {
  id: string;
  name: string;
  feedback: string;
  rating: number;
  date: string;
  timestamp: number;
}

export default function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, 'feedbacks'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedFeedbacks: FeedbackItem[] = [];
      
      querySnapshot.forEach((doc) => {
        fetchedFeedbacks.push({ id: doc.id, ...doc.data() } as FeedbackItem);
      });
      
      setFeedbacks(fetchedFeedbacks);
    } catch (error) {
      console.error("Error fetching feedbacks: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let expectedIndex = 0;
    const secretSequence = ['E', 'Y', 'A', 'D'];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        return;
      }

      if (!e.shiftKey) {
        expectedIndex = 0;
        return;
      }

      if (e.key.toUpperCase() === secretSequence[expectedIndex]) {
        expectedIndex++;
        if (expectedIndex === secretSequence.length) {
          loadData();
          setIsOpen(true);
          expectedIndex = 0;
        }
      } else if (e.key !== 'Shift') {
        expectedIndex = 0; 
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this feedback?")) {
      try {
        await deleteDoc(doc(db, 'feedbacks', id));
        setFeedbacks(prev => prev.filter(fb => fb.id !== id));
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    }
  };

  return (
    <div className={cn(
      "fixed inset-0 z-300 bg-black/95 backdrop-blur-xl flex flex-col p-8 transition-all duration-700 overflow-y-auto",
      isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
    )}>
      <div className="max-w-7xl w-full mx-auto">
        
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-10">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-[0.3em] text-white">Venom Overseer</h1>
            <p className="text-gray-500 text-xs tracking-widest mt-2 uppercase">Secret Admin Dashboard</p>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-gray-400 hover:text-white transition-all transform hover:scale-110 p-4 border border-white/10"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-[#0a0a0a] border border-white/5 p-8 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Total Feedbacks</p>
              <h3 className="text-4xl font-black text-white">{feedbacks.length}</h3>
            </div>
            <Users size={32} className="text-white/20" />
          </div>
          
          <div className="bg-[#0a0a0a] border border-white/5 p-8 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Average Rating</p>
              <h3 className="text-4xl font-black text-white">
                {feedbacks.length > 0 
                  ? (feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / feedbacks.length).toFixed(1) 
                  : "0.0"}
              </h3>
            </div>
            <Star size={32} className="text-white/20" />
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white mb-6 border-l-2 border-white pl-4 flex items-center gap-4">
            Recent Submissions
            {isLoading && <span className="text-[10px] text-gray-500 animate-pulse">Syncing Database...</span>}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!isLoading && feedbacks.length === 0 ? (
              <p className="text-gray-600 text-xs tracking-widest uppercase col-span-full">No incoming signals.</p>
            ) : (
              feedbacks.map((fb) => (
                <div key={fb.id} className="group bg-[#0a0a0a] border border-white/10 p-6 flex flex-col justify-between relative hover:border-white/30 transition-colors">
                  
                  <button 
                    onClick={() => handleDelete(fb.id)}
                    className="absolute top-4 right-4 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    aria-label="Delete Feedback"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div>
                    <div className="flex justify-between items-start mb-4 pr-6">
                      <h4 className="text-white text-sm font-bold uppercase tracking-widest">{fb.name}</h4>
                      <span className="text-gray-600 text-[10px] tracking-widest">{fb.date}</span>
                    </div>
                    <p className="text-gray-400 text-xs tracking-wider leading-relaxed uppercase mb-6">
                      &quot;{fb.feedback}&quot;
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < fb.rating ? "fill-white text-white" : "text-gray-800"} 
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}