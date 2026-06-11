"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function MissionRoom({ params }: { params: { id: string } }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setTimer(0);
      timerIntervalRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    } catch (err) {
      console.error("Error accessing microphone", err);
      alert("Please allow microphone access to complete the mission.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      // Stop all tracks to release mic
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleSubmit = () => {
    // In MVP, we just pretend to submit
    alert("Mission Submitted! +30 XP");
    router.push("/student");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-700">
        <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
          <h1 className="text-2xl font-bold text-blue-400">Mission: Ordering Food</h1>
          <span className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full text-sm font-mono border border-blue-800">
            CEFR A2
          </span>
        </div>

        <div className="bg-gray-700/50 rounded-2xl p-6 mb-8 text-lg text-gray-200 leading-relaxed text-center">
          "Imagine you are at a restaurant. Look at the menu and record yourself ordering a main course and a drink. Speak clearly!"
        </div>

        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Recording UI */}
          <div className="relative">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-32 h-32 rounded-full flex items-center justify-center transition-all shadow-xl ${
                isRecording 
                  ? "bg-red-500 animate-pulse border-4 border-red-300" 
                  : "bg-blue-600 hover:bg-blue-500 hover:scale-105 border-4 border-blue-400"
              }`}
            >
              <svg className={`w-12 h-12 ${isRecording ? "text-white" : "text-white"}`} fill="currentColor" viewBox="0 0 20 20">
                {isRecording ? (
                  <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 0v10h10V5H5z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                )}
              </svg>
            </button>
            {isRecording && (
              <div className="absolute -top-4 -right-4 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                REC
              </div>
            )}
          </div>

          <div className="text-3xl font-mono text-gray-300">
            {Math.floor(timer / 60).toString().padStart(2, '0')}:{(timer % 60).toString().padStart(2, '0')}
          </div>

          {/* Audio Playback & Submission */}
          {audioUrl && !isRecording && (
            <div className="w-full max-w-md bg-gray-700 p-6 rounded-2xl flex flex-col items-center space-y-6 animate-fade-in-up">
              <audio src={audioUrl} controls className="w-full" />
              <div className="flex gap-4 w-full">
                <button 
                  onClick={() => setAudioUrl(null)} 
                  className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-xl font-bold transition"
                >
                  Retake
                </button>
                <button 
                  onClick={handleSubmit}
                  className="flex-1 bg-green-500 hover:bg-green-400 text-white py-3 rounded-xl font-bold shadow-lg shadow-green-500/30 transition"
                >
                  Submit Mission
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
