"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function StudentDashboardKids() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/student/dashboard')
      .then(res => res.json())
      .then(data => setDashboardData(data))
      .catch(err => console.error("Failed to fetch dashboard data:", err));
  }, []);

  if (status === "loading" || !dashboardData) return <div className="p-4 md:p-8 text-center text-2xl font-bold text-orange-500 animate-bounce">Loading Magic... ✨</div>;

  const user = dashboardData.user;
  const missions = dashboardData.missions;

  return (
    <div className="min-h-screen bg-[#FFFBEB] p-4 md:p-8 font-sans">
      {/* Playful Header */}
      <header className="mb-8 bg-white p-4 md:p-6 rounded-[2rem] shadow-[0_8px_0_#FDE68A] flex flex-col md:flex-row justify-between items-center border-4 border-yellow-300 gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-orange-400 text-white rounded-full flex items-center justify-center text-4xl shadow-[0_4px_0_#EA580C] border-4 border-white z-10 shrink-0">
            🐶
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-orange-600 tracking-tight leading-tight">
              Hi, {session?.user?.name || user?.name || 'Buddy'}!
            </h1>
            <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-bold inline-flex items-center mt-1">
              🌟 Level {user?.level || 1} Explorer
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto justify-around bg-yellow-50 p-3 rounded-2xl border-2 border-yellow-200">
          <div className="text-center">
            <p className="text-xs text-yellow-600 font-extrabold uppercase">Stars</p>
            <p className="text-2xl font-black text-yellow-500">{user?.xp?.toLocaleString() || 0} ⭐</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-orange-600 font-extrabold uppercase">Streak</p>
            <p className="text-2xl font-black text-orange-500">{user?.streak || 0} 🔥</p>
          </div>
        </div>
      </header>

      {/* Main Grid: Fully Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Missions Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-sky-600">Today's Adventures 🗺️</h2>
            <Link href="/student/map" className="text-sky-500 font-bold hover:text-sky-700 bg-sky-100 px-4 py-2 rounded-full border-2 border-sky-200 hidden sm:block">
              Open Map 🧭
            </Link>
          </div>
          
          {/* Mission Cards: Stack on mobile, grid on tablet/desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {missions.map((mission: any) => (
              <div 
                key={mission.id} 
                className={`p-5 rounded-[2rem] border-4 transition-transform ${mission.color} ${
                  mission.status === 'locked' ? 'opacity-80' : 'hover:-translate-y-2 hover:shadow-[0_8px_0_rgba(0,0,0,0.1)]'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="text-5xl">{mission.emoji}</div>
                  <div className="bg-white/80 px-3 py-1 rounded-full text-sm font-black shadow-sm">
                    {mission.xp} ⭐
                  </div>
                </div>
                
                <h3 className="font-extrabold text-xl mb-1">{mission.title}</h3>
                <p className="text-sm font-bold opacity-80 mb-4">{mission.type}</p>
                
                {mission.status === 'pending' && (
                  <Link href={`/student/mission/${mission.id}`} className="block w-full text-center bg-white text-current py-3 rounded-2xl font-black text-lg border-2 border-current shadow-sm hover:scale-105 transition-transform">
                    PLAY NOW! 🚀
                  </Link>
                )}
                {mission.status === 'completed' && (
                  <div className="w-full text-center bg-white/50 py-3 rounded-2xl font-black">
                    DONE! 🎉
                  </div>
                )}
                {mission.status === 'locked' && (
                  <div className="w-full text-center bg-white/50 py-3 rounded-2xl font-black">
                    LOCKED 🔒
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <Link href="/student/map" className="block w-full text-center text-sky-500 font-bold bg-sky-100 px-4 py-4 rounded-2xl border-2 border-sky-200 sm:hidden">
            Open Full Map 🧭
          </Link>
        </div>

        {/* Sidebar / Badges / Shop */}
        <div className="space-y-6">
          <div className="bg-purple-100 p-6 rounded-[2rem] border-4 border-purple-300 shadow-[0_8px_0_#D8B4FE]">
            <h2 className="text-2xl font-extrabold text-purple-700 mb-4 text-center">My Badges 🏅</h2>
            <div className="grid grid-cols-3 gap-3">
              <div className="aspect-square bg-white rounded-2xl flex flex-col items-center justify-center border-4 border-yellow-400 shadow-sm">
                <span className="text-3xl">🌟</span>
              </div>
              <div className="aspect-square bg-white rounded-2xl flex flex-col items-center justify-center border-4 border-orange-400 shadow-sm">
                <span className="text-3xl">🔥</span>
              </div>
              <div className="aspect-square bg-white/50 rounded-2xl flex items-center justify-center border-4 border-dashed border-purple-300">
                <span className="text-purple-300 text-2xl">🔒</span>
              </div>
            </div>
          </div>

          <div className="bg-pink-100 p-6 rounded-[2rem] border-4 border-pink-300 shadow-[0_8px_0_#F9A8D4] text-center">
             <div className="text-6xl mb-2 animate-bounce">🛍️</div>
             <h2 className="text-2xl font-extrabold text-pink-700 mb-2">Avatar Shop</h2>
             <p className="text-pink-600 font-bold mb-4">Spend your stars!</p>
             <Link href="/student/shop" className="inline-block w-full bg-pink-500 text-white font-black py-3 rounded-2xl border-4 border-pink-600 hover:bg-pink-400 shadow-[0_4px_0_#BE185D] active:translate-y-1 active:shadow-none transition-all">
               Visit Shop
             </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
