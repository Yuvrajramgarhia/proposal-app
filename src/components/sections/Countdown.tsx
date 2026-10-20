"use client";

import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
    // Placeholder start date (1 year ago from now)
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = now.getTime() - startDate.getTime();
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      
      setTime({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds }
  ];

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <section className="relative w-full py-32 bg-brand-light text-brand-dark overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-rose/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-pink/10 rounded-full blur-[100px]" />
      
      <div ref={ref} className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-sans font-light mb-4">
            Time Since <span className="font-handwriting text-5xl md:text-7xl text-brand-rose">Our Story Began</span>
          </h2>
          <div className="w-24 h-px bg-brand-rose/50 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: index * 0.15, type: "spring", bounce: 0.4 }}
              className="bg-white/50 backdrop-blur-md p-6 md:p-10 rounded-3xl border border-brand-rose/20 shadow-xl group hover:shadow-brand-rose/20 transition-all duration-300"
            >
              <div className="text-5xl md:text-7xl font-sans font-bold text-brand-dark mb-4 group-hover:text-brand-rose transition-colors">
                {String(unit.value).padStart(2, '0')}
              </div>
              <div className="text-sm md:text-base tracking-[0.2em] uppercase text-brand-dark/50 font-medium">
                {unit.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 text-lg md:text-xl font-light text-brand-dark/60 tracking-wide"
        >
          ...and counting every single beautiful second.
        </motion.p>
      </div>
    </section>
  );
}
