"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const reasons = [
  "You make ordinary moments unforgettable.",
  "You make my mind feel peaceful.",
  "You make me smile without even trying.",
  "You became my home without me realizing it.",
  "Your kindness makes the world a better place.",
  "I can be completely myself when I'm with you."
];

export default function Reasons() {
  return (
    <section id="reasons" className="relative w-full py-32 bg-brand-light text-brand-dark overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-rose/10 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-sans font-light mb-4">
            Reasons I Fell For <span className="font-handwriting text-5xl md:text-7xl text-brand-rose">You</span>
          </h2>
          <div className="w-24 h-px bg-brand-rose/50 mx-auto" />
        </motion.div>

        <div className="space-y-8 md:space-y-12">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
              className={`w-full flex ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <div className="bg-white/60 backdrop-blur-lg p-8 md:p-10 rounded-[2rem] max-w-2xl w-full border border-brand-rose/20 shadow-lg relative group hover:-translate-y-2 hover:shadow-brand-rose/20 transition-all duration-500">
                <Quote className="absolute top-6 left-6 w-8 h-8 text-brand-rose/20 rotate-180 group-hover:text-brand-rose/40 transition-colors" />
                <p className="font-handwriting text-3xl md:text-4xl text-center px-8 text-brand-dark/80 group-hover:text-brand-dark transition-colors leading-relaxed">
                  {reason}
                </p>
                <Quote className="absolute bottom-6 right-6 w-8 h-8 text-brand-rose/20 group-hover:text-brand-rose/40 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
