"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function QuestMap() {
  const { data: session } = useSession();
  const router = useRouter();

  // Mock path nodes
  const nodes = [
    { id: 1, title: "Greetings", type: "basic", status: "completed", top: "10%", left: "50%" },
    { id: 2, title: "Ordering Food", type: "roleplay", status: "unlocked", top: "30%", left: "30%" },
    { id: 3, title: "My Family", type: "picture", status: "locked", top: "50%", left: "60%" },
    { id: 4, title: "Daily Routine", type: "basic", status: "locked", top: "70%", left: "40%" },
    { id: 5, title: "Boss Battle: Presentation", type: "boss", status: "locked", top: "90%", left: "50%" },
  ];

  return (
    <div className="min-h-screen bg-sky-100 p-4 md:p-8 relative overflow-hidden">
      <header className="mb-8 flex justify-between items-center relative z-10 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-sky-800">Quest Map: The Language Islands</h1>
          <p className="text-sky-600 font-medium">Follow the path to master English!</p>
        </div>
        <button onClick={() => router.push('/student')} className="text-sky-600 font-bold hover:underline">
          &larr; Back to Dashboard
        </button>
      </header>

      <div className="relative w-full max-w-4xl mx-auto h-[800px] bg-emerald-50 rounded-3xl border-4 border-emerald-200 shadow-inner overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-10 left-10 text-6xl opacity-50">🌴</div>
        <div className="absolute top-40 right-20 text-6xl opacity-50">⛰️</div>
        <div className="absolute bottom-20 left-20 text-6xl opacity-50">🌊</div>

        {/* Path lines SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          <path 
            d="M 50% 10% C 30% 20%, 30% 30%, 30% 30% C 30% 40%, 60% 40%, 60% 50% C 60% 60%, 40% 60%, 40% 70% C 40% 80%, 50% 80%, 50% 90%" 
            fill="transparent" 
            stroke="#93c5fd" 
            strokeWidth="8" 
            strokeDasharray="10 10" 
            className="animate-pulse"
          />
        </svg>

        {/* Nodes */}
        {nodes.map((node) => (
          <div 
            key={node.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center transition-transform hover:scale-110 z-10 ${
              node.status === 'locked' ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
            }`}
            style={{ top: node.top, left: node.left }}
            onClick={() => {
              if (node.status !== 'locked') {
                router.push(`/student/mission/${node.id}`);
              }
            }}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg border-4 ${
              node.status === 'completed' ? 'bg-green-400 border-green-200 text-white' :
              node.status === 'unlocked' ? 'bg-yellow-400 border-yellow-200 text-white animate-bounce' :
              'bg-gray-300 border-gray-200 text-gray-500'
            }`}>
              {node.type === 'boss' ? '🏰' : node.type === 'roleplay' ? '🎭' : node.type === 'picture' ? '🖼️' : '⭐'}
            </div>
            <div className={`mt-2 px-3 py-1 rounded-full text-xs font-bold shadow-sm whitespace-nowrap ${
              node.status === 'completed' ? 'bg-green-100 text-green-800' :
              node.status === 'unlocked' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-500'
            }`}>
              {node.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
