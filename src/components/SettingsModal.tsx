"use client";

import { useState } from "react";
import { useTTS } from "@/hooks/useTTS";

export default function SettingsModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("voice");
  const { voices, selectedVoice, setVoice } = useTTS();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] backdrop-blur-sm animate-fade-in-up">
      <div className="bg-white rounded-3xl p-6 md:p-8 max-w-4xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="text-center mb-8 relative">
          <button 
            onClick={onClose}
            className="absolute top-0 right-0 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl transition-colors"
          >
            ✕
          </button>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 fun-title">⚙️ ตั้งค่าระบบ</h2>
          <p className="text-gray-500 font-medium text-lg">ปรับแต่งเสียง ธีม และสัตว์เลี้ยงตามความชอบ</p>
        </div>
        
        {/* Settings Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-xl p-1.5 flex space-x-2">
            <button 
              onClick={() => setActiveTab("voice")}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === "voice" ? "bg-white text-gray-800 shadow-sm scale-105" : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"}`}
            >
              🔊 เสียง
            </button>
            <button 
              onClick={() => setActiveTab("music")}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === "music" ? "bg-white text-gray-800 shadow-sm scale-105" : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"}`}
            >
              🎵 ดนตรี
            </button>
            <button 
              onClick={() => setActiveTab("theme")}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === "theme" ? "bg-white text-gray-800 shadow-sm scale-105" : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"}`}
            >
              🌈 ธีม
            </button>
            <button 
              onClick={() => setActiveTab("mascot")}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === "mascot" ? "bg-white text-gray-800 shadow-sm scale-105" : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"}`}
            >
              🐾 สัตว์เลี้ยง
            </button>
          </div>
        </div>

        {/* Voice Tab */}
        {activeTab === "voice" && (
          <div className="animate-fade-in-up">
            {/* Voice Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-5 mb-8 border border-blue-100/50 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <span className="text-2xl mr-2">💡</span>
                    เคล็ดลับการใช้งานเสียง
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium text-gray-600">
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <span className="text-green-500 text-lg">✓</span>
                            <span>เลือกเสียงที่ชัดเจนและเข้าใจง่าย</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span className="text-green-500 text-lg">✓</span>
                            <span>ลองฟังเสียงก่อนเล่นจริง</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <span className="text-blue-500 text-lg">ℹ️</span>
                            <span>เสียงสำเนียงอเมริกันจะฟังง่ายที่สุด</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-blue-500 text-lg">ℹ️</span>
                            <span>รายชื่อเสียงจะเปลี่ยนไปตามอุปกรณ์ที่คุณใช้</span>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-4">เลือกเสียงคุณครู AI (English Voices)</h3>
            
            {voices.length === 0 ? (
              <div className="text-center py-8 text-gray-500">กำลังค้นหาเสียงในเครื่องของคุณ... (หรือเครื่องนี้อาจไม่รองรับ)</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto p-2 border-2 border-gray-100 rounded-2xl">
                {voices.map(voice => {
                  const isSelected = selectedVoice?.voiceURI === voice.voiceURI;
                  return (
                    <button
                      key={voice.voiceURI}
                      onClick={() => setVoice(voice.voiceURI)}
                      className={`text-left px-4 py-3 rounded-xl border-2 transition-all font-medium ${
                        isSelected 
                          ? "border-blue-500 bg-blue-50 text-blue-700 shadow-md scale-[1.02]" 
                          : "border-gray-200 hover:border-blue-300 hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <div className="font-bold truncate">{voice.name.replace(/Microsoft |Google /g, '')}</div>
                      <div className="text-xs opacity-70 mt-1">{voice.lang}</div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Other Tabs Placeholder */}
        {activeTab !== "voice" && (
          <div className="text-center py-16 animate-fade-in-up">
            <div className="text-6xl mb-4 floating-icon">🚧</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">กำลังพัฒนาฟีเจอร์นี้</h3>
            <p className="text-gray-500">ระบบ {activeTab === 'music' ? 'ดนตรี' : activeTab === 'theme' ? 'ธีม' : 'สัตว์เลี้ยง'} จะเปิดให้ใช้งานเร็วๆ นี้!</p>
          </div>
        )}

      </div>
    </div>
  );
}
