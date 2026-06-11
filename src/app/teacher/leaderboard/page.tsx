"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Leaderboard() {
  const router = useRouter();
  const { data: session } = useSession();

  const students = [
    { id: 1, name: "Alice Smith", xp: 1240, level: 3, streak: 5 },
    { id: 2, name: "Bob Jones", xp: 1100, level: 3, streak: 2 },
    { id: 3, name: "Charlie Brown", xp: 850, level: 2, streak: 0 },
    { id: 4, name: "Diana Prince", xp: 720, level: 2, streak: 1 },
  ];

  return (
    <div className="min-h-screen bg-indigo-50 p-8">
      <header className="mb-8 flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-indigo-100">
        <div>
          <h1 className="text-3xl font-extrabold text-indigo-900">Class Leaderboard</h1>
          <p className="text-indigo-600 font-medium">Basic English 101 Rankings</p>
        </div>
        <button onClick={() => router.back()} className="text-indigo-600 hover:underline font-bold">
          &larr; Back
        </button>
      </header>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white text-center">
          <h2 className="text-4xl">🏆</h2>
          <h3 className="text-2xl font-bold mt-2">Top Performers</h3>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {students.map((student, index) => (
              <div 
                key={student.id} 
                className={`flex items-center p-4 rounded-2xl transition-transform hover:scale-[1.01] ${
                  index === 0 ? 'bg-yellow-50 border-2 border-yellow-200' :
                  index === 1 ? 'bg-gray-50 border-2 border-gray-200' :
                  index === 2 ? 'bg-orange-50 border-2 border-orange-200' :
                  'bg-white border border-gray-100'
                }`}
              >
                <div className="w-12 text-center font-bold text-2xl text-gray-400">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                </div>
                
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 ml-4 border-2 border-white shadow-sm">
                  {student.name[0]}
                </div>
                
                <div className="ml-4 flex-1">
                  <h4 className="font-bold text-lg text-gray-900">{student.name}</h4>
                  <p className="text-sm text-gray-500">Level {student.level} Speaker</p>
                </div>
                
                <div className="text-right flex items-center gap-6">
                  <div>
                    <div className="text-xs font-bold text-orange-500 uppercase">Streak</div>
                    <div className="font-bold text-gray-700">🔥 {student.streak}</div>
                  </div>
                  <div className="bg-indigo-50 px-4 py-2 rounded-xl">
                    <div className="text-xs font-bold text-indigo-500 uppercase">Total XP</div>
                    <div className="font-bold text-indigo-900 text-xl">{student.xp}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
