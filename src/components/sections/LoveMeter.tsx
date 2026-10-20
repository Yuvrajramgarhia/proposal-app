"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Heart } from "lucide-react";

export default function LoveMeter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState<number | string>(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = 100;
      const duration = 2000; // 2 seconds
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          setCount("∞");
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <section className="relative w-full py-40 bg-brand-dark text-brand-light flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-rose/20 via-brand-dark to-brand-dark opacity-80" />
      
      <div ref={ref} className="max-w-4xl mx-auto px-6 relative z-10 text-center w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-sans font-light mb-8">
            My feelings for you
          </h2>
          <div className="flex items-center justify-center gap-4 text-7xl md:text-9xl font-bold font-sans text-brand-rose drop-shadow-[0_0_25px_rgba(230,183,169,0.5)]">
            <span>{count === "∞" ? "∞" : `${count}%`}</span>
          </div>
        </motion.div>

        <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden relative mb-12 backdrop-blur-sm border border-white/5">
          <motion.div
            initial={{ width: "0%" }}
            animate={isInView ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-pink via-brand-rose to-red-400 rounded-full shadow-[0_0_15px_#E6B7A9]"
          >
            <div className="absolute top-0 right-0 w-10 h-full bg-white/50 blur-[2px]" />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="font-handwriting text-4xl md:text-6xl text-brand-light/90"
        >
          ...cannot be measured.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, delay: 2.5, type: "spring" }}
          className="mt-16 flex justify-center"
        >
          <Heart className="w-20 h-20 text-brand-rose fill-brand-rose animate-[pulse_2s_ease-in-out_infinite] drop-shadow-[0_0_20px_rgba(230,183,169,0.6)]" />
        </motion.div>
      </div>
    </section>
  );
}
