"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const images = [
  { src: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1000", alt: "Romantic moment", aspect: "aspect-[4/3] md:col-span-2 md:row-span-2" },
  { src: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&q=80&w=800", alt: "Beautiful flowers", aspect: "aspect-[3/4]" },
  { src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&q=80&w=800", alt: "Sunset together", aspect: "aspect-[3/4] md:row-span-2" },
  { src: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=800", alt: "Holding hands", aspect: "aspect-square" },
  { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=1000", alt: "Date night", aspect: "aspect-[16/9] md:col-span-2" },
  { src: "https://images.unsplash.com/photo-1494774116620-15ada72364c1?auto=format&fit=crop&q=80&w=800", alt: "Love", aspect: "aspect-square" },
];

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section id="gallery" className="relative w-full py-24 bg-brand-dark text-brand-light">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-sans font-light mb-4">
            Our Beautiful <span className="font-handwriting text-5xl md:text-7xl text-brand-rose">Memories</span>
          </h2>
          <div className="w-24 h-px bg-brand-rose/50 mx-auto" />
        </motion.div>

        {/* Masonry-like CSS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-4 md:gap-6">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-3xl overflow-hidden cursor-pointer group ${img.aspect} h-full w-full`}
              onClick={() => setSelectedImg(img.src)}
            >
              <div className="absolute inset-0 bg-brand-rose/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay" />
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <ZoomIn className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedImg(null)}
          >
            <button
              className="absolute top-6 right-6 md:top-12 md:right-12 text-white/50 hover:text-white transition-colors"
              onClick={() => setSelectedImg(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl max-h-full w-full aspect-auto rounded-xl overflow-hidden shadow-[0_0_50px_rgba(230,183,169,0.2)]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImg}
                alt="Enlarged memory"
                className="w-full h-full object-contain max-h-[85vh]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
