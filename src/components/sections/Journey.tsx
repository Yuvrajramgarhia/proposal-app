"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const journeyEvents = [
  {
    date: "A Beautiful Beginning",
    title: "First Conversation",
    description: "The day two strangers started talking and a beautiful story began.",
  },
  {
    date: "A Magical Moment",
    title: "First Smile",
    description: "When your smile became the reason for mine.",
  },
  {
    date: "The Realization",
    title: "The Day Everything Changed",
    description: "When I realized you were exactly what I had been waiting for all my life.",
  },
  {
    date: "Forever & Always",
    title: "Today",
    description: "Loving you more than yesterday, but not as much as tomorrow.",
  }
];

export default function Journey() {
  return (
    <section id="journey" className="relative w-full py-24 bg-brand-dark text-brand-light overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-rose/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-brand-pink/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-sans font-light mb-4">Our <span className="font-handwriting text-5xl md:text-7xl text-brand-rose">Journey</span></h2>
          <div className="w-24 h-px bg-brand-rose/50 mx-auto" />
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-brand-rose/30" />

          <div className="space-y-16">
            {journeyEvents.map((event, index) => (
              <div key={index} className="relative flex flex-col md:flex-row items-center justify-between w-full">
                
                {/* Center Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute left-[16px] md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-rose z-10 shadow-[0_0_15px_#E6B7A9]"
                >
                  <motion.div 
                    animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 bg-brand-rose rounded-full"
                  />
                </motion.div>

                {/* Left Side */}
                <div className={`w-full md:w-[45%] pl-12 md:pl-0 flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                  {index % 2 === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                      className="w-full"
                    >
                      <JourneyCard event={event} align="right" />
                    </motion.div>
                  ) : (
                    <div className="hidden md:block w-full"></div> // Empty space for alternating layout on desktop
                  )}
                </div>

                {/* Right Side */}
                <div className={`w-full md:w-[45%] pl-12 md:pl-0 flex ${index % 2 !== 0 ? 'md:justify-start' : 'md:justify-end'} ${index % 2 === 0 ? 'hidden md:flex' : ''} mt-8 md:mt-0`}>
                  {index % 2 !== 0 ? (
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                      className="w-full"
                    >
                      <JourneyCard event={event} align="left" />
                    </motion.div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function JourneyCard({ event, align }: { event: { date: string; title: string; description: string }, align: 'left' | 'right' }) {
  return (
    <div className={`glass-dark p-6 md:p-8 rounded-3xl border border-brand-rose/20 hover:border-brand-rose/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(230,183,169,0.1)] group relative overflow-hidden text-left md:text-${align === 'right' ? 'right' : 'left'}`}>
      <div className={`absolute top-0 ${align === 'right' ? 'left-0' : 'right-0'} p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500`}>
        <Heart className="w-32 h-32 text-brand-rose" />
      </div>
      <p className="text-brand-rose/80 text-xs md:text-sm tracking-widest uppercase mb-3 font-medium">{event.date}</p>
      <h3 className="text-3xl md:text-4xl font-handwriting text-brand-light mb-4">{event.title}</h3>
      <p className="text-brand-light/70 leading-relaxed font-light text-sm md:text-base">{event.description}</p>
    </div>
  );
}
