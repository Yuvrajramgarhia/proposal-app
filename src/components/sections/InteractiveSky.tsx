"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star as StarIcon } from "lucide-react";

const loveNotes = [
  "I still remember our first conversation.",
  "You looked absolutely beautiful that day.",
  "You inspire me to be a better person.",
  "I admire your beautiful smile.",
  "Every moment with you is a treasure.",
  "You are my favorite thought.",
  "I love the way your eyes sparkle when you laugh."
];

export default function InteractiveSky() {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number; note: string }[]>([]);
  const [activeNote, setActiveNote] = useState<string | null>(null);

  useEffect(() => {
    // Generate clickable stars with hidden notes
    const generatedStars = loveNotes.map((note, i) => ({
      id: i,
      x: 10 + Math.random() * 80, // 10% to 90% width
      y: 10 + Math.random() * 80, // 10% to 90% height
      size: Math.random() * 4 + 4,
      delay: Math.random() * 2,
      note
    }));
    
    // Add some dummy stars for decoration
    const decorativeStars = Array.from({ length: 40 }).map((_, i) => ({
      id: i + 100,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
      note: ""
    }));

    setTimeout(() => {
      setStars([...generatedStars, ...decorativeStars]);
    }, 0);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-[#050510] text-brand-light overflow-hidden flex flex-col items-center justify-center py-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#050510] to-[#050510] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="absolute top-20 z-10 text-center px-4"
      >
        <h2 className="text-3xl md:text-5xl font-sans font-light mb-4">
          A Sky Full of <span className="font-handwriting text-5xl md:text-6xl text-brand-rose">Thoughts</span>
        </h2>
        <p className="text-brand-light/50 font-light tracking-wide text-sm md:text-base">Click the brightest stars to reveal my hidden notes.</p>
      </motion.div>

      {/* Sky Background with Stars */}
      <div className="absolute inset-0 z-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className={`absolute rounded-full cursor-pointer transition-all duration-300 ${star.note ? 'bg-brand-rose shadow-[0_0_10px_#E6B7A9] hover:scale-150 z-10' : 'bg-white/60 pointer-events-none'}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: star.note ? [0.6, 1, 0.6] : [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: star.note ? 2 : (star as any).duration || 3,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            onClick={() => star.note && setActiveNote(star.note)}
          >
            {star.note && (
              <div className="absolute inset-0 animate-ping rounded-full bg-brand-rose opacity-20"></div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Note Modal */}
      <AnimatePresence>
        {activeNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
            onClick={() => setActiveNote(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-dark p-8 md:p-12 rounded-[2rem] max-w-xl w-full text-center relative border border-brand-rose/30 shadow-[0_0_30px_rgba(230,183,169,0.15)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-6 right-6 text-brand-light/50 hover:text-brand-light transition-colors"
                onClick={() => setActiveNote(null)}
              >
                <X className="w-6 h-6" />
              </button>
              
              <StarIcon className="w-12 h-12 text-brand-rose mx-auto mb-6 opacity-80" />
              <p className="font-handwriting text-3xl md:text-5xl text-brand-light leading-relaxed">
                &quot;{activeNote}&quot;
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
