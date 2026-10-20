"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  return (
    <span className="inline-block">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            delay: delay + index * 0.05,
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

const Petal = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor">
    <path d="M50 100 C 20 80 0 50 20 20 C 50 0 80 20 100 50 C 80 80 50 100 50 100 Z" />
  </svg>
);

export default function Hero() {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);
  const [petals, setPetals] = useState<{ id: number; x: number; delay: number; duration: number; scale: number }[]>([]);
  
  useEffect(() => {
    setTimeout(() => {
      setStars(
        Array.from({ length: 50 }).map((_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          duration: Math.random() * 3 + 2,
        }))
      );

      setPetals(
        Array.from({ length: 15 }).map((_, i) => ({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 5,
          duration: Math.random() * 5 + 10,
          scale: Math.random() * 0.5 + 0.5,
          xOff: Math.random() * 20 - 10,
        }))
      );
    }, 0);
  }, []);

  return (
    <section id="hero" className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-brand-dark">
      {/* Animated Stars */}
      <div className="absolute inset-0 z-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating Rose Petals */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute top-[-10%] text-brand-rose/40"
            style={{ left: `${petal.x}%`, width: 30 * petal.scale, height: 30 * petal.scale }}
            animate={{
              y: ["0vh", "110vh"],
              x: ["0vw", `${petal.xOff}vw`],
              rotate: [0, 360],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Petal />
          </motion.div>
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-rose/10 via-brand-dark/80 to-brand-dark pointer-events-none"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 glass p-8 md:p-16 rounded-3xl max-w-4xl w-[90%] text-center shadow-2xl backdrop-blur-md border border-brand-rose/20"
      >
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-sans font-light leading-relaxed mb-10 text-brand-light">
          <TypewriterText text="Every love story is beautiful..." delay={0.5} />
          <br className="hidden md:block" />
          <span className="block mt-4 md:mt-6">
            <TypewriterText text="But mine became special when I met you." delay={2.5} />
          </span>
        </h1>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 5.5, duration: 1 }}
        >
          <p className="font-handwriting text-6xl md:text-8xl text-brand-rose mb-12 text-glow drop-shadow-lg">
            For Muskan ❤️
          </p>

          <a
            href="#letter"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-brand-rose/10 border border-brand-rose/50 text-brand-rose hover:bg-brand-rose hover:text-white transition-all duration-500 hover:shadow-[0_0_20px_rgba(230,183,169,0.6)] group"
          >
            <span className="tracking-[0.2em] uppercase text-sm font-medium mr-3">Begin Our Story</span>
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ↓
            </motion.span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
