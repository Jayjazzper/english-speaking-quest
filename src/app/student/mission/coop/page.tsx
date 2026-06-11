"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMicrophone } from "@/hooks/useMicrophone";
import VoiceSelector from "@/components/VoiceSelector";
import TextToSpeech from "@/components/TextToSpeech";

export default function CoopMission() {
  const router = useRouter();
  const { isRecording, toggleRecording } = useMicrophone();
  const [partner, setPartner] = useState<string | null>(null);
  const [status, setStatus] = useState("waiting"); // waiting, connected, speaking

  const findMatch = () => {
    setStatus("searching");
    setTimeout(() => {
      setPartner("David M.");
      setStatus("connected");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 relative">
      <VoiceSelector />
      
      <header className="flex justify-between items-center mb-8">
        <button onClick={() => router.back()} className="text-blue-400 hover:text-blue-300 font-bold">
          &larr; Leave Lobby
        </button>
        <span className="bg-blue-900/50 text-blue-300 px-4 py-2 rounded-full text-sm font-bold border border-blue-800 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          Live Co-op Room
        </span>
      </header>

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2">Mission: Job Interview</h1>
        <p className="text-gray-400 mb-12">Pair up and take turns asking and answering interview questions.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12">
          {/* Player 1 (You) */}
          <div className="bg-gray-800 rounded-3xl p-8 border-2 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)] flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center text-5xl mb-4 shadow-inner">
              🧑‍🎓
            </div>
            <h2 className="text-xl font-bold">You (Interviewer)</h2>
            <div className="mt-4 flex gap-2 items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-gray-400 text-sm">Mic Active</span>
            </div>
          </div>

          {/* Player 2 (Partner) */}
          <div className="bg-gray-800 rounded-3xl p-8 border-2 border-gray-700 flex flex-col items-center relative overflow-hidden">
            {status === "waiting" || status === "searching" ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800/90 z-10">
                <button 
                  onClick={findMatch}
                  disabled={status === "searching"}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full transition-all disabled:opacity-50"
                >
                  {status === "searching" ? "Searching for partner..." : "Find Partner"}
                </button>
              </div>
            ) : null}

            <div className="w-32 h-32 rounded-full bg-indigo-600 flex items-center justify-center text-5xl mb-4 shadow-inner">
              👨‍💻
            </div>
            <h2 className="text-xl font-bold">{partner || "Partner (Applicant)"}</h2>
            <div className="mt-4 flex gap-2 items-center">
              <span className={`w-3 h-3 rounded-full ${status === 'connected' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
              <span className="text-gray-400 text-sm">{status === 'connected' ? 'Connected' : 'Waiting...'}</span>
            </div>
          </div>
        </div>

        {status === "connected" && (
          <div className="w-full bg-gray-800 p-6 rounded-2xl border border-gray-700 text-center animate-fade-in-up">
            <h3 className="text-lg font-bold text-blue-400 mb-4">It's your turn to speak!</h3>
            <div className="flex justify-center items-center gap-3 mb-6">
              <TextToSpeech text="Tell me about your previous work experience." />
              <p className="text-xl">"Tell me about your previous work experience."</p>
            </div>
            <button 
              onClick={toggleRecording}
              className={`font-bold py-4 px-12 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 ${
                isRecording 
                  ? "bg-red-500 hover:bg-red-400 text-white shadow-red-500/50 animate-pulse" 
                  : "bg-green-500 hover:bg-green-400 text-white shadow-green-500/20"
              }`}
            >
              🎤 {isRecording ? "Recording... (Tap to send)" : "Tap to Speak"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
