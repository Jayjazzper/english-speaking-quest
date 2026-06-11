"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMicrophone } from "@/hooks/useMicrophone";
import TextToSpeech from "@/components/TextToSpeech";

export default function StoryModeMission() {
  const router = useRouter();
  const [panelIndex, setPanelIndex] = useState(0);

  const { isRecording, toggleRecording } = useMicrophone(() => {
    console.log("Audio recorded and processed.");
  });

  // Comic panels for the story
  const panels = [
    {
      id: 1,
      imageEmoji: "🌳🦊",
      bgColor: "bg-green-100 border-green-400",
      text: "Once upon a time, there was a little fox.",
    },
    {
      id: 2,
      imageEmoji: "🍎😋",
      bgColor: "bg-red-100 border-red-400",
      text: "He found a big, red apple on the ground.",
    },
    {
      id: 3,
      imageEmoji: "🐻👋",
      bgColor: "bg-orange-100 border-orange-400",
      text: "He shared it with his friend, the bear.",
    }
  ];

  const handleNext = () => {
    if (panelIndex < panels.length - 1) {
      setPanelIndex(panelIndex + 1);
    } else {
      // Finish Story
      alert("🎉 YAY! You finished the story! +50 Stars!");
      router.push("/student");
    }
  };

  const currentPanel = panels[panelIndex];

  return (
    <div className="min-h-screen bg-sky-100 flex flex-col p-4 md:p-8 relative">
      
      
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => router.back()} className="text-sky-500 font-extrabold bg-white px-4 py-2 rounded-full border-4 border-sky-200 shadow-sm hover:scale-105 transition-transform">
            &larr; Back
          </button>
          <div className="bg-yellow-300 text-yellow-900 px-4 py-2 rounded-full font-black border-4 border-yellow-400 shadow-sm">
            Story Mode 📖
          </div>
        </div>

        {/* Comic Panel Viewer */}
        <div className={`w-full aspect-[4/3] rounded-[3rem] border-8 shadow-xl flex flex-col items-center justify-center p-8 transition-colors duration-500 relative overflow-hidden ${currentPanel.bgColor}`}>
          <div className="absolute top-4 right-6 font-black text-black/20 text-2xl">
            {panelIndex + 1} / {panels.length}
          </div>
          
          <div className="text-9xl mb-8 animate-bounce" style={{ animationDuration: '2s' }}>
            {currentPanel.imageEmoji}
          </div>
          
          <div className="bg-white p-6 rounded-3xl border-4 border-black/10 shadow-md text-center max-w-md relative">
             {isRecording && (
                <div className="absolute -top-4 -right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-md">
                   🎙️ Recording
                </div>
             )}
            <div className="w-full text-center mb-6 bg-white/80 p-4 rounded-2xl border border-sky-100 inline-block shadow-sm">
              <div className="flex items-center justify-center gap-3">
                <TextToSpeech text={panels[panelIndex].text} />
                <p className="text-xl md:text-2xl font-bold text-gray-800 tracking-wide leading-relaxed">
                  {panels[panelIndex].text}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between bg-white p-6 rounded-[2rem] border-4 border-sky-200 shadow-[0_8px_0_#BAE6FD] gap-6">
          <div className="flex-1 text-center sm:text-left">
            <p className="font-extrabold text-sky-600 text-lg mb-1">Your Turn to Read!</p>
            <p className="text-sm font-bold text-gray-500">Tap the mic to start reading, tap again to stop.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleRecording}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl border-4 transition-all ${
                isRecording 
                  ? 'bg-red-500 border-red-600 shadow-[0_0_20px_rgba(239,68,68,0.5)] scale-95 animate-pulse' 
                  : 'bg-rose-400 border-rose-500 shadow-[0_6px_0_#E11D48] hover:bg-rose-300 hover:-translate-y-1'
              }`}
            >
              🎤
            </button>
            
            <button 
              onClick={handleNext}
              className="bg-green-400 text-white font-black px-8 py-5 rounded-3xl border-4 border-green-500 shadow-[0_6px_0_#22C55E] hover:bg-green-300 hover:-translate-y-1 active:translate-y-2 active:shadow-none transition-all text-xl"
            >
              {panelIndex < panels.length - 1 ? 'Next 👉' : 'Finish! 🌟'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
