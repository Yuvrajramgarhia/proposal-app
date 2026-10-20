"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // A placeholder royalty-free romantic track.
    audioRef.current = new Audio("https://cdn.pixabay.com/download/audio/2022/05/16/audio_f5bd730f55.mp3?filename=romantic-piano-111033.mp3");
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <motion.div 
        className="glass rounded-full flex items-center p-2"
        animate={{ width: isOpen ? "auto" : "48px" }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-8 h-8 flex items-center justify-center text-brand-rose hover:text-brand-pink transition-colors relative"
        >
          <Music className="w-5 h-5" />
          {isPlaying && (
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1 w-2 h-2 bg-brand-pink rounded-full"
            />
          )}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="flex items-center gap-2 overflow-hidden px-2 whitespace-nowrap"
            >
              <button
                onClick={togglePlay}
                className="p-2 rounded-full hover:bg-white/10 text-brand-light transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={toggleMute}
                className="p-2 rounded-full hover:bg-white/10 text-brand-light transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
