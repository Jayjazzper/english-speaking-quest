"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import TextToSpeech from "@/components/TextToSpeech";

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
  const user = dashboardData.user;
  
  const topics = [
    { id: 't1', title: 'การทักทายและแนะนำตัว', emoji: '👋', color: 'from-[#6B8DFF] to-[#7B61FF]' },
    { id: 't2', title: 'ภาษาที่ใช้ในห้องเรียน', emoji: '🏫', color: 'from-[#FF8A9B] to-[#FF5E89]' },
    { id: 't3', title: 'สภาพอากาศและฤดูกาล', emoji: '☀️', color: 'from-[#D87BFF] to-[#FF8CA9]' },
    { id: 't4', title: 'การซื้อของและตัวเลข', emoji: '🛒', color: 'from-[#4DB8FF] to-[#20D3FF]' },
    { id: 't5', title: 'ครอบครัวและเพื่อน', emoji: '👨‍👩‍👧‍👦', color: 'from-[#42E3B4] to-[#2BDCA4]' },
    { id: 't6', title: 'การเดินทางและสถานที่', emoji: '✈️', color: 'from-[#FF9E67] to-[#FFC556]' },
    { id: 't7', title: 'กิจวัตรประจำวัน', emoji: '⏰', color: 'from-[#3AC9FF] to-[#20A4FF]' },
    { id: 't8', title: 'อาหารและเครื่องดื่ม', emoji: '🍎', color: 'from-[#67E2A4] to-[#47D59A]' },
    { id: 't9', title: 'สัตว์และธรรมชาติ', emoji: '🐶', color: 'from-[#E1A27A] to-[#E9CD57]' },
    { id: 't10', title: 'งานอดิเรกและเวลาว่าง', emoji: '🎨', color: 'from-[#6479DF] to-[#7A5BCA]' },
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 relative z-10">
      
      {/* 1. Mode Selection Screen */}
      {screen === 'mode' && (
        <div className="max-w-6xl mx-auto text-center fade-in-up">
          <div className="relative mb-12 z-20">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20 rounded-3xl blur-3xl z-10 dark:opacity-50"></div>
            <div className="relative bg-white/50 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 border border-gray-200 dark:border-gray-700 z-20 shadow-xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3 fun-title drop-shadow-sm leading-tight">เลือกโหมดการเรียน</h2>
              <div className="flex items-center justify-center space-x-3 mb-2">
                  <div className="sparkle" style={{ animationDelay: '0.5s' }}>✨</div>
                  <div className="sparkle" style={{ animationDelay: '1.5s' }}>⭐</div>
              </div>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium tracking-wide">เริ่มต้นการผจญภัยภาษาอังกฤษของคุณ! 🚀</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="mode-card bg-white/90 backdrop-blur rounded-3xl p-8 md:p-12 shadow-2xl cursor-pointer border border-white/50 group" onClick={() => setScreen('grade')}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                  <div className="text-7xl md:text-9xl mb-6 floating-icon stagger-1 group-hover:scale-110 transition-transform duration-300">🎯</div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 fun-title text-gray-800 flex items-center justify-center gap-2">
                    Solo Mode
                    <TextToSpeech text="Solo Mode" className="scale-75" />
                  </h3>
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
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 fun-title text-gray-800 flex items-center justify-center gap-2">
                    Pair Mode
                    <TextToSpeech text="Pair Mode" className="scale-75" />
                  </h3>
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
            className="mb-6 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-all mx-auto font-bold shadow-sm"
          >
            <span>←</span>
            <span>กลับไปเลือกโหมด</span>
          </button>
          
          <div className="relative mb-12 z-20">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl z-10 dark:opacity-50"></div>
            <div className="relative bg-white/50 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 border border-gray-200 dark:border-gray-700 z-20 shadow-xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3 fun-title drop-shadow-sm leading-tight">เลือกระดับชั้นเรียน</h2>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium tracking-wide">เลือกระดับที่เหมาะกับความสามารถของคุณ! 📚</p>
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
            className="mb-8 bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-all mx-auto font-bold shadow-sm backdrop-blur-md border border-gray-200 dark:border-gray-700"
          >
            <span>←</span>
            <span>กลับไปเลือกระดับชั้น</span>
          </button>
          
          <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4 drop-shadow-sm tracking-tight" style={{ fontFamily: 'var(--font-fredoka)' }}>เลือกหัวข้อที่อยากฝึกสนทนา</h2>
              <p className="text-gray-500 dark:text-gray-300 text-xl font-medium tracking-wide">คลิกที่หัวข้อที่สนใจเพื่อเริ่มผจญภัยภาษาอังกฤษ</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {topics.map((topic) => (
              <div 
                key={topic.id} 
                className={`relative overflow-hidden rounded-[2.5rem] p-8 md:p-10 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl bg-gradient-to-br ${topic.color} text-white border border-white/20`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl -ml-5 -mb-5 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center h-full">
                  <div className="text-6xl md:text-7xl mb-6 drop-shadow-lg floating-icon">{topic.emoji}</div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-wide drop-shadow-md flex items-center gap-2">
                    {topic.title}
                    <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                      <TextToSpeech text={topic.title} className="scale-75 opacity-70 hover:opacity-100" />
                    </div>
                  </h3>
                  
                  <div className="bg-white/20 backdrop-blur-md px-5 py-1.5 rounded-full text-sm font-bold tracking-widest mb-4 shadow-sm border border-white/30">
                    Pre-A1 - A1
                  </div>
                  
                  <p className="text-white/90 font-medium mb-4">5 บทสนทนา</p>
                  
                  <div className="flex gap-2 mb-8">
                    <div className="w-2.5 h-2.5 bg-white rounded-full opacity-100 shadow-sm"></div>
                    <div className="w-2.5 h-2.5 bg-white rounded-full opacity-60"></div>
                    <div className="w-2.5 h-2.5 bg-white rounded-full opacity-40"></div>
                    <div className="w-2.5 h-2.5 bg-white rounded-full opacity-20"></div>
                    <div className="w-2.5 h-2.5 bg-white rounded-full opacity-20"></div>
                  </div>
                  
                  <div className="flex gap-4 w-full mt-auto">
                    <Link href={`/student/mission/mcq/${topic.id}`} className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-sm border border-white/30">
                      <span className="text-xl">💬</span> เริ่มสนทนา
                    </Link>
                    <button className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-sm border border-white/30">
                      <span className="text-xl">📚</span> คำศัพท์
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
