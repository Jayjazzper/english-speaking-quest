"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMicrophone } from "@/hooks/useMicrophone";
import TextToSpeech from "@/components/TextToSpeech";

export default function PictureSpeakingMission() {
  const router = useRouter();
  const { isRecording, toggleRecording } = useMicrophone();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 font-sans relative">
      
      
      <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-2rem)] bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-gray-700">
        <div className="flex justify-between items-center p-8 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-purple-400">Mission: Picture Speaking</h1>
          <span className="bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full text-sm font-mono border border-purple-800">
            CEFR B1
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <div className="space-y-6">
            <div className="bg-gray-700/50 rounded-2xl p-6 text-lg text-gray-200 leading-relaxed">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TextToSpeech text="Describe this picture. What are the people doing? Use at least 3 sentences." />
                Describe this picture.
              </h2>
              What are the people doing? What is the weather like? Tap the mic to start, tap again to stop.
            </div>
            
            <div className="flex flex-col items-center justify-center space-y-6 bg-gray-900/50 p-8 rounded-2xl border border-gray-700">
              <button 
                onClick={toggleRecording}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-xl border-4 ${
                  isRecording 
                    ? "bg-red-500 animate-pulse border-red-300" 
                    : "bg-purple-600 hover:bg-purple-500 hover:scale-105 border-purple-400"
                }`}
              >
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  {isRecording ? (
                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 0v10h10V5H5z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  )}
                </svg>
              </button>
              <div className={`text-sm font-mono ${isRecording ? 'text-red-400 font-bold' : 'text-gray-400'}`}>
                {isRecording ? "Recording... (Tap to stop)" : "Ready to record (Tap to start)"}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            {/* Placeholder for an image */}
            <div className="w-full aspect-video bg-gray-700 rounded-2xl border-4 border-gray-600 flex flex-col items-center justify-center relative overflow-hidden shadow-xl">
              <span className="text-6xl mb-4">🏞️</span>
              <span className="text-gray-400 font-medium">Family picnic in the park</span>
              
              {/* Decorative sun */}
              <div className="absolute top-4 right-4 text-4xl">☀️</div>
              {/* Decorative tree */}
              <div className="absolute bottom-0 left-8 text-6xl">🌳</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
