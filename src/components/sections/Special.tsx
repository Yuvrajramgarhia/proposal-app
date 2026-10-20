"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Smile, Heart, Sparkles, Sun, Star, Flame } from "lucide-react";
import React, { useRef } from "react";

const specialTraits = [
  { title: "Your Smile", icon: Smile, description: "It lights up my darkest days and makes everything feel right." },
  { title: "Your Heart", icon: Heart, description: "The purest and most beautiful heart I have ever known." },
  { title: "Your Kindness", icon: Sun, description: "The way you care for others is truly inspiring and magical." },
  { title: "Your Simplicity", icon: Sparkles, description: "You don't need much to be happy, and that is your superpower." },
  { title: "Your Laugh", icon: Flame, description: "My favorite melody that I could listen to for the rest of my life." },
  { title: "Your Presence", icon: Star, description: "Just being around you brings a sense of peace to my soul." },
];

const TiltCard = ({ trait, index }: { trait: typeof specialTraits[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full h-full perspective-1000 group cursor-pointer"
    >
      <div 
        className="bg-white/50 backdrop-blur-md p-8 rounded-[2rem] h-full border border-brand-rose/20 hover:border-brand-rose/50 transition-colors duration-500 flex flex-col items-center text-center shadow-lg hover:shadow-brand-rose/20 relative overflow-hidden"
        style={{ transform: "translateZ(50px)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-rose/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <div className="w-20 h-20 rounded-full bg-brand-rose/10 flex items-center justify-center mb-6 text-brand-rose group-hover:scale-110 group-hover:bg-brand-rose group-hover:text-white transition-all duration-500 shadow-inner">
          <trait.icon className="w-10 h-10" />
        </div>
        <h3 className="text-3xl font-handwriting text-brand-dark mb-4 group-hover:text-brand-rose transition-colors">{trait.title}</h3>
        <p className="text-brand-dark/70 font-light text-sm leading-relaxed">{trait.description}</p>
      </div>
    </motion.div>
  );
};

export default function Special() {
  return (
    <section id="special" className="relative w-full py-24 bg-brand-light overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/20 rounded-full blur-[80px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-lavender/30 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-sans font-light mb-4 text-brand-dark">
            What Makes You <span className="font-handwriting text-5xl md:text-7xl text-brand-rose">Special</span>
          </h2>
          <div className="w-24 h-px bg-brand-rose/50 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 perspective-1000">
          {specialTraits.map((trait, index) => (
            <TiltCard key={index} trait={trait} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
