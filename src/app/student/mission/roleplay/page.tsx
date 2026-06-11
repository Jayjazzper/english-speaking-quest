"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMicrophone } from "@/hooks/useMicrophone";
import TextToSpeech from "@/components/TextToSpeech";

export default function RolePlayMission() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const { isRecording, toggleRecording } = useMicrophone(() => {
    setStep(2);
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 relative">
      
      
      <div className="w-full max-w-4xl bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-700">
        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
          <h1 className="text-2xl font-bold text-orange-400">Mission: Role Play - Airport</h1>
          <span className="bg-orange-900/50 text-orange-300 px-3 py-1 rounded-full text-sm font-mono border border-orange-800">
            CEFR B2
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Chat Interface */}
          <div className="bg-gray-700/30 rounded-2xl p-6 border border-gray-600 h-96 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-xl shadow-lg border-2 border-gray-500">👮</div>
                <div className="bg-gray-600 p-4 rounded-2xl rounded-tl-none shadow-lg border border-gray-500 relative max-w-[80%] text-sm">
                  <div className="absolute top-1 right-1">
                    <TextToSpeech text="Good morning. Can I see your passport and boarding pass, please?" />
                  </div>
                  <p className="mr-8 leading-relaxed font-medium">Good morning. Can I see your passport and boarding pass, please?</p>
                </div>
              </div>
              
              {step > 1 && (
                <div className="flex gap-4 flex-row-reverse">
                  <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-xl text-white font-bold shadow-lg border-2 border-orange-500">S</div>
                  <div className="bg-orange-600 p-4 rounded-2xl rounded-tr-none shadow-lg max-w-[80%] text-sm">
                    Yes, here they are.
                  </div>
                </div>
              )}

              {step > 1 && (
                <div className="flex gap-4 animate-fade-in-up">
                  <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-xl shadow-lg border-2 border-gray-500">👮</div>
                  <div className="bg-gray-600 p-4 rounded-2xl rounded-tl-none shadow-lg border border-gray-500 relative max-w-[80%] text-sm">
                    <div className="absolute top-1 right-1">
                      <TextToSpeech text="Thank you. Are you checking any bags today?" />
                    </div>
                    <p className="mr-8 leading-relaxed font-medium">Thank you. Are you checking any bags today?</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-600">
              <p className="text-sm text-gray-400 mb-2 font-medium">Your prompt:</p>
              <div className="bg-gray-900 p-3 rounded-xl border border-orange-900/50 text-orange-300 text-sm font-mono">
                {step === 1 ? "> Say yes, and offer the documents." : "> Say you have one suitcase to check."}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-8 bg-gray-900/50 p-8 rounded-2xl border border-gray-700">
             <div className="text-center">
                <p className="text-gray-400 mb-4 font-medium">Tap the mic to speak your response</p>
                <button 
                  onClick={toggleRecording}
                  className={`w-32 h-32 rounded-full flex items-center justify-center transition-all shadow-xl border-4 ${
                    isRecording
                      ? "bg-red-500 hover:bg-red-400 border-red-300 scale-95 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                      : "bg-orange-600 hover:bg-orange-500 border-orange-400 hover:scale-105 active:bg-red-500 active:border-red-400 active:scale-95"
                  }`}
                >
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    {isRecording ? (
                      <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 0v10h10V5H5z" clipRule="evenodd" />
                    ) : (
                      <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                    )}
                  </svg>
                </button>
             </div>
             
             {step > 1 && (
               <button onClick={() => alert('Mission Submitted!')} className="w-full bg-green-600 hover:bg-green-500 py-3 rounded-xl font-bold transition animate-fade-in-up">
                 Finish Roleplay
               </button>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
