"use client";

import { useTTS } from "@/hooks/useTTS";

export default function VoiceSelector() {
  const { voices, selectedVoice, setVoice } = useTTS();

  if (voices.length === 0) return null;

  return (
    <div className="absolute top-4 right-4 z-50 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-2xl shadow-lg border-2 border-gray-100 flex items-center gap-2">
      <span className="text-xl">🗣️</span>
      <select 
        className="bg-transparent text-sm font-bold text-gray-700 outline-none cursor-pointer max-w-[120px] sm:max-w-[180px] truncate"
        value={selectedVoice?.voiceURI || ""}
        onChange={(e) => setVoice(e.target.value)}
      >
        {voices.map(voice => (
          <option key={voice.voiceURI} value={voice.voiceURI}>
            {voice.name.replace(/Microsoft |Google /g, '')}
          </option>
        ))}
      </select>
    </div>
  );
}
