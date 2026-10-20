"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const letterLines = [
  "From the moment you walked into my life, everything changed.",
  "You brought a light that I didn't know I was missing.",
  "Your smile became my favorite sight,",
  "and your voice, my favorite sound.",
  "Every day with you feels like a beautiful dream,",
  "and I never want to wake up.",
  "You are not just my love, you are my peace,",
  "my safe place, and my greatest adventure."
];

export default function Letter() {
  return (
    <section id="letter" className="relative w-full min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden bg-brand-light">
      {/* Animating Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-pink/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-lavender/40 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4"
      />

      <div className="relative z-10 max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="bg-white/70 backdrop-blur-xl p-8 md:p-16 rounded-[2rem] shadow-xl border border-brand-rose/20 relative"
        >
          <Quote className="absolute top-8 left-8 w-12 h-12 text-brand-rose/20 rotate-180" />
          <Quote className="absolute bottom-8 right-8 w-12 h-12 text-brand-rose/20" />
          
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-sans font-light text-brand-dark mb-4"
            >
              Dear <span className="font-handwriting text-5xl md:text-7xl text-brand-rose ml-2">Muskan,</span>
            </motion.h2>
            <div className="w-24 h-px bg-brand-rose/50 mx-auto" />
          </div>

          <div className="space-y-6 md:space-y-8 text-center px-4 md:px-12">
            {letterLines.map((line, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="font-handwriting text-3xl md:text-5xl text-brand-dark/80 leading-relaxed"
              >
                {line}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: letterLines.length * 0.15 + 0.5 }}
            className="mt-16 text-center"
          >
            <p className="text-sm uppercase tracking-widest text-brand-dark/40 mb-2">Forever Yours</p>
            <div className="w-12 h-1 bg-brand-rose/30 mx-auto rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
