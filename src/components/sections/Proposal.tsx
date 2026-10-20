"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function Proposal() {
  const [answer, setAnswer] = useState<"yes" | "time" | null>(null);
  const [particles, setParticles] = useState<{ x: number, y: number, duration: number, delay: number }[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 40 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 3
      }))
    );
  }, []);

  const handleYes = () => {
    setAnswer("yes");
    
    // Fireworks effect
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  const handleTime = () => {
    setAnswer("time");
  };

  return (
    <section id="proposal" className="relative w-full min-h-screen bg-[#020205] text-white flex flex-col items-center justify-center overflow-hidden py-32">
      {/* Dynamic Background Glow */}
      <motion.div
        animate={{
          scale: answer === "yes" ? [1, 2, 1.5] : [1, 1.2, 1],
          opacity: answer === "yes" ? [0.5, 0.8, 0.5] : [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${answer === 'yes' ? 'from-brand-rose/40 via-brand-pink/10' : 'from-brand-rose/10 via-[#020205]'} to-[#020205] blur-[80px] pointer-events-none`}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-brand-rose"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              rotate: [0, 180]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl px-6 w-full">
        <AnimatePresence mode="wait">
          {!answer ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={{ duration: 1.5 }}
              className="space-y-16"
            >
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
                className="font-handwriting text-5xl md:text-7xl text-brand-rose drop-shadow-[0_0_15px_rgba(230,183,169,0.5)]"
              >
                Muskan...
              </motion.h2>
              
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 1.5 }}
                className="text-3xl md:text-5xl font-sans font-light tracking-wide text-brand-light/90"
              >
                Will you make me the happiest person?
              </motion.h3>
              
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 3, type: "spring", bounce: 0.3 }}
                className="text-6xl md:text-8xl lg:text-9xl font-sans font-extralight tracking-tight text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] mt-12"
              >
                Will you be mine?
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 5.5 }}
                className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mt-24"
              >
                <button
                  onClick={handleYes}
                  className="px-12 py-5 rounded-full bg-gradient-to-r from-brand-rose to-brand-pink text-brand-dark text-xl font-bold tracking-widest uppercase hover:scale-110 hover:shadow-[0_0_40px_rgba(230,183,169,0.8)] transition-all duration-300 w-full md:w-auto border border-white/40"
                >
                  YES ❤️
                </button>
                <button
                  onClick={handleTime}
                  className="px-10 py-5 rounded-full bg-white/5 backdrop-blur-md text-white/70 hover:text-white text-lg font-light tracking-wider hover:bg-white/10 transition-all duration-300 w-full md:w-auto border border-white/10"
                >
                  I Need More Time 😊
                </button>
              </motion.div>
            </motion.div>
          ) : answer === "yes" ? (
            <motion.div
              key="yes"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
              className="space-y-12"
            >
              <h2 className="font-handwriting text-6xl md:text-8xl text-brand-rose drop-shadow-[0_0_40px_rgba(230,183,169,1)]">
                You just made my world brighter.
              </h2>
              <p className="text-2xl md:text-3xl font-light text-brand-light/90">
                I promise to cherish you, forever and always.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="time"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
              className="space-y-10"
            >
              <h2 className="font-handwriting text-5xl md:text-7xl text-brand-light">
                I&apos;ll always respect your answer.
              </h2>
              <p className="text-3xl md:text-4xl font-light text-brand-rose drop-shadow-[0_0_20px_rgba(230,183,169,0.5)]">
                Take all the time you need.
              </p>
              <div className="w-24 h-px bg-white/20 mx-auto mt-12" />
              <p className="text-xl text-white/50 font-light mt-8">
                I&apos;m not going anywhere.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="absolute bottom-8 w-full text-center opacity-30 hover:opacity-100 transition-opacity duration-500">
        <p className="text-sm font-light tracking-widest text-brand-light uppercase">
          Made with ❤️ only for Muskan.
        </p>
      </div>
    </section>
  );
}
