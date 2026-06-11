"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function StoryModeMission() {
  const router = useRouter();
  const [panelIndex, setPanelIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

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
      const audio = new Audio("https://cdn.freesound.org/previews/320/320655_527080-lq.mp3"); // Confetti sound placeholder
      audio.play().catch(()=>console.log("Audio play blocked by browser"));
      alert("🎉 YAY! You finished the story! +50 Stars!");
      router.push("/student");
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        // Pretend to process audio
        console.log("Audio recorded and processed.");
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Please allow microphone access to practice reading.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Stop all audio tracks to turn off the mic light
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const currentPanel = panels[panelIndex];

  return (
    <div className="min-h-screen bg-sky-50 p-4 flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-2xl">
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
            <p className="text-2xl font-black text-gray-800 leading-tight">
              "{currentPanel.text}"
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between bg-white p-6 rounded-[2rem] border-4 border-sky-200 shadow-[0_8px_0_#BAE6FD] gap-6">
          <div className="flex-1 text-center sm:text-left">
            <p className="font-extrabold text-sky-600 text-lg mb-1">Your Turn to Read!</p>
            <p className="text-sm font-bold text-gray-500">Hold the mic and read the text aloud.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
              onTouchStart={startRecording}
              onTouchEnd={stopRecording}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl border-4 transition-all ${
                isRecording 
                  ? 'bg-red-500 border-red-600 shadow-[0_0_20px_rgba(239,68,68,0.5)] scale-95' 
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
