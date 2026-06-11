"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function StudentDashboardKids() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [screen, setScreen] = useState<'mode' | 'grade' | 'dashboard'>('mode');

  useEffect(() => {
    fetch('/api/student/dashboard')
      .then(res => res.json())
      .then(data => setDashboardData(data))
      .catch(err => console.error("Failed to fetch dashboard data:", err));
  }, []);

  if (status === "loading" || !dashboardData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="text-6xl floating-icon mascot-breathing mb-4">🎓</div>
        <div className="text-2xl font-bold text-white fun-title animate-pulse">กำลังโหลดการผจญภัย... ✨</div>
      </div>
    );
  }

  const user = dashboardData.user;
  const missions = dashboardData.missions;

  // Group missions by unit
  const missionsByUnit = missions.reduce((acc: any, mission: any) => {
    const unit = mission.unit || 'Miscellaneous';
    if (!acc[unit]) acc[unit] = [];
    acc[unit].push(mission);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 relative z-10">
      
      {/* 1. Mode Selection Screen */}
      {screen === 'mode' && (
        <div className="max-w-6xl mx-auto text-center fade-in-up">
          <div className="relative mb-12 z-20">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20 rounded-3xl blur-3xl z-10"></div>
            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/30 z-20 shadow-2xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 fun-title drop-shadow-lg leading-tight">เลือกโหมดการเรียน</h2>
              <div className="flex items-center justify-center space-x-3 mb-2">
                  <div className="sparkle" style={{ animationDelay: '0.5s' }}>✨</div>
                  <div className="sparkle" style={{ animationDelay: '1.5s' }}>⭐</div>
              </div>
              <p className="text-xl md:text-2xl text-white/90 font-medium tracking-wide">เริ่มต้นการผจญภัยภาษาอังกฤษของคุณ! 🚀</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="mode-card bg-white/90 backdrop-blur rounded-3xl p-8 md:p-12 shadow-2xl cursor-pointer border border-white/50 group" onClick={() => setScreen('grade')}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                  <div className="text-7xl md:text-9xl mb-6 floating-icon stagger-1 group-hover:scale-110 transition-transform duration-300">🎯</div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 fun-title text-gray-800">Solo Mode</h3>
                  <p className="text-lg md:text-xl font-medium mb-6 text-gray-600">เรียนคนเดียวกับ AI Teacher ที่ฉลาดและเข้าใจคุณ</p>
                  <div className="flex justify-center flex-wrap gap-2 md:gap-3 mb-6">
                      <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold shadow-lg">🤖 AI ฉลาด</span>
                      <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold shadow-lg">⚡ เรียนเร็ว</span>
                  </div>
                  <div className="text-blue-600 text-sm font-bold bg-blue-50 px-4 py-2 rounded-full inline-block border border-blue-100">
                      🌟 แนะนำสำหรับผู้เริ่มต้น
                  </div>
              </div>
            </div>
            
            <div className="mode-card bg-white/90 backdrop-blur rounded-3xl p-8 md:p-12 shadow-2xl cursor-pointer border border-white/50 group" onClick={() => setScreen('grade')}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                  <div className="text-7xl md:text-9xl mb-6 floating-icon stagger-2 group-hover:scale-110 transition-transform duration-300">👥</div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 fun-title text-gray-800">Pair Mode</h3>
                  <p className="text-lg md:text-xl font-medium mb-6 text-gray-600">เรียนคู่กับเพื่อนหรือครู สนุกและมีปฏิสัมพันธ์</p>
                  <div className="flex justify-center flex-wrap gap-2 md:gap-3 mb-6">
                      <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold shadow-lg">👫 เรียนคู่</span>
                      <span className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold shadow-lg">🎉 สนุกมาก</span>
                  </div>
                  <div className="text-purple-600 text-sm font-bold bg-purple-50 px-4 py-2 rounded-full inline-block border border-purple-100">
                      🎯 เหมาะสำหรับการเรียนกลุ่ม
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Grade Selection Screen */}
      {screen === 'grade' && (
        <div className="max-w-6xl mx-auto text-center fade-in-up">
          <button 
            onClick={() => setScreen('mode')}
            className="mb-6 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl backdrop-blur flex items-center space-x-2 transition-all mx-auto font-bold"
          >
            <span>←</span>
            <span>กลับไปเลือกโหมด</span>
          </button>
          
          <div className="relative mb-12 z-20">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl z-10"></div>
            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/30 z-20 shadow-2xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 fun-title drop-shadow-lg leading-tight">เลือกระดับชั้นเรียน</h2>
              <p className="text-xl md:text-2xl text-white/90 font-medium tracking-wide">เลือกระดับที่เหมาะกับความสามารถของคุณ! 📚</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="mode-card bg-white/90 backdrop-blur rounded-3xl p-8 shadow-2xl cursor-pointer border border-white/50 group" onClick={() => setScreen('dashboard')}>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-blue-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                  <div className="text-7xl md:text-9xl mb-6 floating-icon stagger-1 group-hover:scale-110 transition-transform duration-300">🌟</div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4 fun-title">ป.1 - ป.3</h3>
                  <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-xl mb-4 font-bold text-sm md:text-base shadow-lg inline-block">
                      ระดับ Pre-A1 ถึง A1
                  </div>
                  <p className="text-gray-600 text-lg font-medium mb-6">เริ่มต้นเรียนภาษาอังกฤษด้วยประโยคง่ายๆ</p>
                  <div className="flex justify-center space-x-3">
                      <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">🎯 เริ่มต้น</span>
                      <span className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">🎨 สนุกสนาน</span>
                  </div>
              </div>
            </div>
            
            <div className="mode-card bg-white/90 backdrop-blur rounded-3xl p-8 shadow-2xl cursor-pointer border border-white/50 group" onClick={() => setScreen('dashboard')}>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                  <div className="text-7xl md:text-9xl mb-6 floating-icon stagger-2 group-hover:scale-110 transition-transform duration-300">🚀</div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4 fun-title">ป.4 - ป.6</h3>
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl mb-4 font-bold text-sm md:text-base shadow-lg inline-block">
                      ระดับ A1 ถึง A2
                  </div>
                  <p className="text-gray-600 text-lg font-medium mb-6">พัฒนาทักษะด้วยประโยคที่ซับซ้อนขึ้น</p>
                  <div className="flex justify-center space-x-3">
                      <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">⚡ ท้าทาย</span>
                      <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">🎪 หลากหลาย</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Dashboard / Categories Screen */}
      {screen === 'dashboard' && (
        <div className="max-w-6xl mx-auto fade-in-up">
          <button 
            onClick={() => setScreen('grade')}
            className="mb-6 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl backdrop-blur flex items-center space-x-2 transition-all font-bold"
          >
            <span>←</span>
            <span>กลับไปเลือกระดับชั้น</span>
          </button>
          
          <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 fun-title drop-shadow-md">เลือกภารกิจที่อยากฝึกสนทนา</h2>
              <p className="text-white/90 text-lg font-medium">คลิกที่ภารกิจเพื่อเริ่มผจญภัยภาษาอังกฤษ!</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* Missions Section */}
            <div className="lg:col-span-2 space-y-8">
              {Object.entries(missionsByUnit).map(([unit, unitMissions]: [string, any]) => (
                <div key={unit} className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 drop-shadow-md">
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm px-4 py-1.5 rounded-full shadow-lg">{unit.split(':')[0]}</span>
                    {unit.split(':')[1] || unit}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {unitMissions.map((mission: any) => (
                      <Link href={`/student/mission/${mission.id}`} key={mission.id} className="block">
                        <div 
                          className={`mode-card p-6 rounded-2xl border-2 transition-all bg-white/95 backdrop-blur shadow-lg ${
                            mission.status === "locked" ? "opacity-75 border-gray-300" : "border-white hover:border-purple-300"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <span className="text-5xl drop-shadow-md floating-icon">{mission.emoji}</span>
                            <span className="font-bold text-sm bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full shadow-md">{mission.xp} ⭐</span>
                          </div>
                          <h3 className="font-extrabold text-xl mb-2 text-gray-800 tracking-tight">{mission.title}</h3>
                          <p className="text-sm font-medium text-gray-500 mb-4">{mission.type}</p>
                          
                          {mission.status === "completed" ? (
                            <div className="w-full py-2.5 bg-green-100 rounded-xl font-bold text-center border border-green-200 text-green-700">
                              DONE! 🎉
                            </div>
                          ) : mission.status === "locked" ? (
                            <div className="w-full py-2.5 bg-gray-100 rounded-xl font-bold text-center text-gray-400 border border-gray-200">
                              LOCKED 🔒
                            </div>
                          ) : (
                            <div className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl font-bold text-center text-white shadow-md group-hover:scale-105 transition-transform">
                              PLAY NOW! 🚀
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar / Badges / Shop */}
            <div className="space-y-6">
              <div className="glass-morphism p-6 rounded-3xl border border-white/30 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h2 className="text-2xl font-extrabold text-white mb-4 text-center fun-title relative z-10 drop-shadow-md">My Badges 🏅</h2>
                <div className="grid grid-cols-3 gap-3 relative z-10">
                  <div className="aspect-square bg-white rounded-2xl flex items-center justify-center border-2 border-yellow-400 shadow-lg floating hover:scale-110 transition-transform">
                    <span className="text-3xl">🌟</span>
                  </div>
                  <div className="aspect-square bg-white rounded-2xl flex items-center justify-center border-2 border-orange-400 shadow-lg floating" style={{ animationDelay: '0.2s' }}>
                    <span className="text-3xl">🔥</span>
                  </div>
                  <div className="aspect-square bg-white/30 rounded-2xl flex items-center justify-center border-2 border-dashed border-white/50 backdrop-blur">
                    <span className="text-white/50 text-2xl">🔒</span>
                  </div>
                </div>
              </div>

              <div className="glass-morphism p-6 rounded-3xl border border-white/30 text-center relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <div className="text-6xl mb-4 animate-bounce relative z-10 drop-shadow-lg">🛍️</div>
                 <h2 className="text-2xl font-extrabold text-white mb-2 fun-title relative z-10 drop-shadow-md">Avatar Shop</h2>
                 <p className="text-white/80 font-medium mb-6 relative z-10">Spend your stars!</p>
                 <Link href="/student/shop" className="relative z-10 inline-block w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black py-3.5 rounded-2xl hover:scale-105 shadow-xl transition-transform border border-pink-400/50">
                   Visit Shop
                 </Link>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
