"use client";

import { useRouter } from "next/navigation";

export default function PictureSpeakingMission() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-700">
        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
          <h1 className="text-2xl font-bold text-purple-400">Mission: Picture Speaking</h1>
          <span className="bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full text-sm font-mono border border-purple-800">
            CEFR B1
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-700/50 rounded-2xl p-6 text-lg text-gray-200 leading-relaxed">
              "Look at the picture on the right. Describe what is happening. What are the people doing? What is the weather like? Speak for at least 30 seconds."
            </div>
            
            <div className="flex flex-col items-center justify-center space-y-6 bg-gray-900/50 p-8 rounded-2xl border border-gray-700">
              <button className="w-24 h-24 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center transition-all shadow-xl hover:scale-105 border-4 border-purple-400">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="text-sm font-mono text-gray-400">Ready to record</div>
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
