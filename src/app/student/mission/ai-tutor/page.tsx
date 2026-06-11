"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AITutorMission() {
  const router = useRouter();
  const [isCalling, setIsCalling] = useState(false);
  const [chatLog, setChatLog] = useState([
    { speaker: "ai", text: "Hello! I'm your AI English Tutor. Are you ready to practice ordering at a restaurant?" }
  ]);

  const handleToggleCall = () => {
    if (isCalling) {
      setIsCalling(false);
    } else {
      setIsCalling(true);
      setTimeout(() => {
        setChatLog(prev => [...prev, { speaker: "ai", text: "Welcome to StarBites! What would you like to order today?" }]);
      }, 1500);
    }
  };

  const handleSimulateStudentSpeak = () => {
    setChatLog(prev => [...prev, { speaker: "student", text: "I would like a cappuccino, please." }]);
    setTimeout(() => {
      setChatLog(prev => [...prev, { speaker: "ai", text: "A cappuccino, great choice. Would you like that hot or iced?" }]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center">
      <div className="w-full max-w-3xl flex justify-between items-center mb-8 pt-4">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-white font-bold">&larr; Quit Mission</button>
        <span className="bg-pink-900/50 text-pink-300 px-3 py-1 rounded-full text-sm font-mono border border-pink-800">
          AI Live Tutor
        </span>
      </div>

      <div className="w-full max-w-3xl flex-1 flex flex-col relative">
        {/* Avatar Visualization */}
        <div className="h-64 flex flex-col items-center justify-center relative">
          <div className={`w-40 h-40 rounded-full flex items-center justify-center text-7xl z-10 transition-all duration-500 ${isCalling ? 'bg-pink-500 shadow-[0_0_50px_rgba(236,72,153,0.6)]' : 'bg-gray-700'}`}>
            🤖
          </div>
          {/* Audio waves visualizer (simulated) */}
          {isCalling && (
            <div className="absolute inset-0 flex items-center justify-center gap-2 z-0 opacity-50">
              <div className="w-2 h-32 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-48 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-2 h-24 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-40 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <div className="w-2 h-20 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            </div>
          )}
        </div>

        {/* Live Transcription Log */}
        <div className="flex-1 bg-gray-800/80 rounded-3xl p-6 border border-gray-700 overflow-y-auto mb-8 space-y-4">
          {chatLog.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.speaker === 'ai' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                msg.speaker === 'ai' ? 'bg-pink-900/50 text-pink-100 rounded-tl-none border border-pink-800' : 'bg-blue-600 text-white rounded-tr-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isCalling && chatLog.length % 2 === 0 && (
             <div className="text-gray-500 text-sm italic text-right">Listening...</div>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-6 pb-8">
          <button 
            onClick={handleToggleCall}
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all ${
              isCalling ? 'bg-red-500 hover:bg-red-400' : 'bg-green-500 hover:bg-green-400'
            }`}
          >
            {isCalling ? '📞 End' : '📞 Call'}
          </button>
          
          {isCalling && (
             <button 
               onClick={handleSimulateStudentSpeak}
               className="px-6 py-4 bg-gray-800 border border-gray-700 text-gray-300 rounded-2xl hover:bg-gray-700 text-sm font-bold"
             >
               (Simulate Speak)
             </button>
          )}
        </div>
      </div>
    </div>
  );
}
