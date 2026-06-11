"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useMicrophone } from "@/hooks/useMicrophone";
import TextToSpeech from "@/components/TextToSpeech";

const XRScene = dynamic(() => import("./XRScene"), { ssr: false, loading: () => <div className="text-white absolute inset-0 flex items-center justify-center">Loading 3D World...</div> });

export default function WebXRMission() {
  const router = useRouter();
  const { isRecording, toggleRecording } = useMicrophone();

  return (
    <div className="w-full h-screen bg-gray-900 relative">
      
      
      <div className="absolute top-8 left-8 z-10">
        <button onClick={() => router.back()} className="text-white bg-black/50 px-4 py-2 rounded-full backdrop-blur font-bold hover:bg-black/70 transition">
          &larr; Exit VR
        </button>
      </div>
      
      <div className="absolute bottom-10 left-0 w-full flex flex-col items-center z-10 pointer-events-none">
        <div className="bg-black/50 backdrop-blur text-white px-6 py-3 rounded-2xl flex items-center gap-3 mb-4 border border-white/10 pointer-events-auto">
          <TextToSpeech text="I'd like to order a burger." className="bg-transparent hover:bg-white/20 text-white" />
          <span className="text-lg font-medium">"I'd like to order a burger."</span>
        </div>
        <button 
          onClick={toggleRecording}
          className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all border-4 pointer-events-auto ${
            isRecording 
              ? "bg-red-500 border-red-300 shadow-[0_0_30px_rgba(239,68,68,0.8)] animate-pulse" 
              : "bg-pink-600 border-pink-400 hover:bg-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.5)]"
          }`}
        >
          🎤
        </button>
      </div>

      <XRScene />
    </div>
  );
}
