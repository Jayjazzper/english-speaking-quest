"use client";

import { useState } from "react";
import { useTTS } from "@/hooks/useTTS";

export default function TextToSpeech({ text, className = "" }: { text: string, className?: string }) {
  const { speak } = useTTS();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    speak(text);
    
    // Simple timeout to reset the animation, better than relying on the utterence end event 
    // which can be flaky on some browsers
    setTimeout(() => setIsPlaying(false), Math.max(text.length * 80, 1000));
  };

  return (
    <button
      onClick={handlePlay}
      className={`inline-flex items-center justify-center p-2 rounded-full transition-all active:scale-90 ${
        isPlaying ? "bg-blue-500 text-white shadow-lg animate-pulse" : "bg-blue-100 text-blue-500 hover:bg-blue-200"
      } ${className}`}
      title="Listen"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        {isPlaying ? (
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        ) : (
          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
        )}
      </svg>
    </button>
  );
}
