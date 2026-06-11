"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMicrophone } from "@/hooks/useMicrophone";

export default function MissionRoom({ params }: { params: { id: string } }) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const router = useRouter();

  const { isRecording, toggleRecording } = useMicrophone((blob) => {
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      setTimer(0);
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // startRecording and stopRecording removed as they are handled by useMicrophone

  const handleSubmit = () => {
    // In MVP, we just pretend to submit
    alert("Mission Submitted! +30 XP");
    router.push("/student");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-700">
        <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
          <h1 className="text-2xl font-bold text-blue-400">Mission: Ordering Food</h1>
          <span className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-sm font-mono border border-blue-800">
            CEFR A2
          </span>
        </div>

        <div className="bg-gray-700/50 rounded-2xl p-6 mb-8 text-lg text-gray-200 leading-relaxed text-center">
          "Imagine you are at a restaurant. Look at the menu and record yourself ordering a main course and a drink. Speak clearly!"
        </div>

        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Recording UI */}
          <div className="relative">
            <button
              onClick={toggleRecording}
              className={`w-32 h-32 rounded-full flex items-center justify-center transition-all shadow-xl ${
                isRecording 
                  ? "bg-red-500 animate-pulse border-4 border-red-300" 
                  : "bg-blue-600 hover:bg-blue-500 hover:scale-105 border-4 border-blue-400"
              }`}
            >
              <svg className={`w-12 h-12 ${isRecording ? "text-white" : "text-white"}`} fill="currentColor" viewBox="0 0 20 20">
                {isRecording ? (
                  <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 0v10h10V5H5z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                )}
              </svg>
            </button>
            {isRecording && (
              <div className="absolute -top-4 -right-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                REC
              </div>
            )}
          </div>

          <div className="text-3xl font-mono text-gray-300">
            {Math.floor(timer / 60).toString().padStart(2, '0')}:{(timer % 60).toString().padStart(2, '0')}
          </div>

          {/* Audio Playback & Submission */}
          {audioUrl && !isRecording && (
            <div className="w-full max-w-md bg-gray-700 p-6 rounded-2xl flex flex-col items-center space-y-6 animate-fade-in-up">
              <audio src={audioUrl} controls className="w-full" />
              <div className="flex gap-4 w-full">
                <button 
                  onClick={() => setAudioUrl(null)} 
                  className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-xl font-bold transition"
                >
                  Retake
                </button>
                <button 
                  onClick={handleSubmit}
                  className="flex-1 bg-green-500 hover:bg-green-400 text-white py-3 rounded-xl font-bold shadow-lg shadow-green-500/30 transition"
                >
                  Submit Mission
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
