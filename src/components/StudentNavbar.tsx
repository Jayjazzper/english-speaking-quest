"use client";

import { useState } from "react";
import Link from "next/link";
import SettingsModal from "./SettingsModal";

export default function StudentNavbar({ xp = 20, coins = 150, stars = 3, level = 1 }: { xp?: number, coins?: number, stars?: number, level?: number }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <div className="nav-glass shadow-lg border-b border-white/10 sticky top-0 z-40">
        <div className="container mx-auto px-4 md:px-8 py-4 md:py-6">
          {/* Top Row: Logo and Navigation */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
            {/* Logo Section */}
            <Link href="/student" className="flex items-center space-x-4 md:space-x-6 hover:scale-105 transition-transform">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative text-5xl md:text-6xl floating-icon stagger-1 mascot-breathing drop-shadow-lg">🎓</div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl md:text-4xl font-bold fun-title leading-tight mb-1">English Adventure</h1>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white/90 text-sm font-medium tracking-wide">Learn & Play Together! 🌟</span>
                </div>
              </div>
            </Link>
            
            {/* Navigation Buttons */}
            <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="bg-white/90 hover:bg-white text-gray-900 px-4 py-3 md:px-6 md:py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-md border border-white/40 flex items-center space-x-2"
              >
                <span className="text-xl">⚙️</span>
                <span className="text-sm md:text-base hidden sm:inline">ตั้งค่าระบบ</span>
              </button>
            </div>
          </div>
          
          {/* Bottom Row: Player Stats */}
          <div className="grid grid-cols-3 gap-2 md:gap-6 justify-items-center">
            <div className="bg-white/90 w-full hover:bg-white flex flex-col md:flex-row items-center md:space-x-4 p-2 md:px-6 md:py-4 rounded-2xl md:rounded-3xl shadow-md transition-all duration-300 group">
              <div className="relative mb-1 md:mb-0">
                <span className="text-2xl md:text-4xl floating-icon stagger-2 group-hover:scale-110 transition-transform block">🪙</span>
              </div>
              <div className="flex flex-col items-center md:items-start w-full">
                <span className="text-[10px] md:text-sm text-gray-500 font-bold uppercase tracking-wider hidden sm:block">Coins</span>
                <span className="font-black text-gray-800 text-lg md:text-2xl leading-none">{coins}</span>
              </div>
            </div>
            
            <div className="bg-white/90 w-full hover:bg-white flex flex-col md:flex-row items-center md:space-x-4 p-2 md:px-6 md:py-4 rounded-2xl md:rounded-3xl shadow-md transition-all duration-300 group">
              <div className="relative mb-1 md:mb-0">
                <span className="text-2xl md:text-4xl floating-icon stagger-3 group-hover:scale-110 transition-transform block">⭐</span>
              </div>
              <div className="flex flex-col items-center md:items-start w-full">
                <span className="text-[10px] md:text-sm text-gray-500 font-bold uppercase tracking-wider hidden sm:block">Stars</span>
                <span className="font-black text-gray-800 text-lg md:text-2xl leading-none">{stars}</span>
              </div>
            </div>
            
            <div className="bg-white/90 w-full hover:bg-white flex flex-col md:flex-row items-center md:space-x-4 p-2 md:px-6 md:py-4 rounded-2xl md:rounded-3xl shadow-md transition-all duration-300 group">
              <div className="relative mb-1 md:mb-0">
                <span className="text-2xl md:text-4xl group-hover:scale-110 transition-transform block">🏆</span>
              </div>
              <div className="flex flex-col items-center md:items-start w-full">
                <span className="text-[10px] md:text-sm text-gray-500 font-bold uppercase tracking-wider hidden sm:block">Level</span>
                <span className="font-black text-blue-600 text-lg md:text-2xl leading-none">Lv.{level}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* XP Progress Bar */}
        <div className="px-4 md:px-8 pb-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between text-xs md:text-sm mb-2">
              <div className="flex items-center space-x-1 md:space-x-2">
                <span className="text-sm md:text-lg">✨</span>
                <span className="font-bold text-white tracking-wide drop-shadow-md">ประสบการณ์</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-white drop-shadow-md">{xp}/100 XP</span>
              </div>
            </div>
            <div className="relative">
              <div className="w-full bg-black/20 backdrop-blur rounded-full h-3 md:h-4 shadow-inner border border-white/20">
                <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 h-full rounded-full transition-all duration-1000 progress-glow relative overflow-hidden" style={{ width: `${xp}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}
