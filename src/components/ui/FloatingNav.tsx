"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Heart, Navigation, Image as ImageIcon, Star, Sparkles } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Home", href: "#hero", icon: Home },
  { name: "Letter", href: "#letter", icon: Heart },
  { name: "Journey", href: "#journey", icon: Navigation },
  { name: "Gallery", href: "#gallery", icon: ImageIcon },
  { name: "Reasons", href: "#reasons", icon: Star },
  { name: "Proposal", href: "#proposal", icon: Sparkles },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - window.innerHeight / 2) {
          current = section;
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass rounded-full px-6 py-4 hidden md:block"
    >
      <ul className="flex items-center gap-8">
        {navItems.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center transition-colors duration-300 group",
                activeSection === item.href.substring(1)
                  ? "text-brand-pink"
                  : "text-brand-light/50 hover:text-brand-light"
              )}
            >
              <item.icon className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
              {activeSection === item.href.substring(1) && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-brand-pink"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
