"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTTS } from "@/hooks/useTTS";
import Link from "next/link";

// Mock Data for "Greetings and Introductions"
const mockQuestions = [
  {
    id: 1,
    aiText: "Hello! I'm your English teacher. What's your name?",
    options: [
      { id: 'A', text: "My name is Anna.", isCorrect: true },
      { id: 'B', text: "I am happy.", isCorrect: false },
      { id: 'C', text: "Nice day.", isCorrect: false },
    ]
  },
  {
    id: 2,
    aiText: "It is nice to meet you, Anna. How are you today?",
    options: [
      { id: 'A', text: "I am five years old.", isCorrect: false },
      { id: 'B', text: "I am fine, thank you.", isCorrect: true },
      { id: 'C', text: "Goodbye.", isCorrect: false },
    ]
  }
];

export default function MCQMission({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { speak } = useTTS();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // In a real app, we'd fetch the topic title based on params.id
  const topicTitle = "การทักทายและแนะนำตัว";

  const question = mockQuestions[currentStep];

  const handlePlayTTS = (text: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    speak(text);
  };

  const handleSelectOption = (optionId: string, isCorrect: boolean) => {
    if (selectedOption) return; // Prevent multiple clicks

    setSelectedOption(optionId);
    
    // Play the selected text
    const selectedText = question.options.find(o => o.id === optionId)?.text || "";
    speak(selectedText);

    setTimeout(() => {
      if (isCorrect) {
        // Correct! Move to next step
        setIsAnimating(true);
        setTimeout(() => {
          if (currentStep < mockQuestions.length - 1) {
            setCurrentStep(prev => prev + 1);
            setSelectedOption(null);
            setIsAnimating(false);
            speak(mockQuestions[currentStep + 1].aiText);
          } else {
            // Mission Complete
            alert("Mission Complete! 🎉");
            router.push('/student');
          }
        }, 800);
      } else {
        // Incorrect, let them try again
        setSelectedOption(null);
      }
    }, 2000); // Wait for audio to roughly finish
  };

  if (!question) return null;

  return (
    <div className="min-h-[85vh] bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-900 dark:to-gray-800 rounded-[2.5rem] p-4 md:p-8 relative overflow-hidden flex flex-col font-sans border border-white/40 dark:border-gray-700 shadow-2xl mt-4">
      
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl p-4 shadow-sm mb-6 border border-white/50 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl flex items-center justify-center text-2xl">🤖</div>
             <div>
               <h2 className="font-bold text-gray-800 dark:text-white text-lg leading-tight">{topicTitle}</h2>
               <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">🎤 เสียง: กำลังโหลด...</p>
             </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm">
            💡 คำใบ้
          </button>
          <button className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm">
            🎮 เกม
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col max-w-4xl mx-auto w-full transition-opacity duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        
        {/* AI Message */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl rounded-tl-none p-6 text-white shadow-lg mb-12 max-w-[80%] relative self-start">
          <div className="absolute -top-4 -left-4 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md text-xl border-2 border-indigo-200 dark:border-indigo-900">🤖</div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-sm bg-white/20 px-2 py-0.5 rounded-full">AI Teacher</span>
          </div>
          <p className="text-xl md:text-2xl font-medium mb-4 leading-relaxed">{question.aiText}</p>
          <button 
            onClick={() => handlePlayTTS(question.aiText)}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors"
          >
            🔊 ฟังอีกครั้ง
          </button>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-4 w-full mt-auto mb-6">
          {question.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            const statusColor = isSelected 
              ? (opt.isCorrect ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/40 dark:border-green-500 dark:text-green-300' : 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900/40 dark:border-red-500 dark:text-red-300')
              : 'bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500 text-gray-800 dark:text-gray-200';

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id, opt.isCorrect)}
                disabled={selectedOption !== null}
                className={`w-full flex items-center justify-between p-4 md:p-5 rounded-2xl border-2 transition-all duration-300 shadow-sm backdrop-blur-md group ${statusColor} ${selectedOption && !isSelected ? 'opacity-50' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg text-white shadow-sm transition-colors ${isSelected ? (opt.isCorrect ? 'bg-green-500' : 'bg-red-500') : 'bg-indigo-400 group-hover:bg-indigo-500'}`}>
                    {opt.id}
                  </div>
                  <span className="text-lg md:text-xl font-medium text-left">{opt.text}</span>
                </div>
                
                <div 
                  onClick={(e) => handlePlayTTS(opt.text, e)}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 flex items-center justify-center text-indigo-500 transition-colors z-10"
                  title="ฟังเสียง"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Bar */}
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-md transition-colors flex items-center justify-center gap-2">
          📖 เรียนรู้คำศัพท์ในประโยคนี้
        </button>
      </div>

    </div>
  );
}
