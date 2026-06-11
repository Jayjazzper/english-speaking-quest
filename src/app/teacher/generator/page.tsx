"use client";

import { useState } from "react";

export default function AIQuestGenerator() {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("B1");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuest, setGeneratedQuest] = useState<any>(null);

  const handleGenerate = () => {
    if (!topic) return;
    setIsGenerating(true);
    
    // Mock AI Generation delay
    setTimeout(() => {
      setGeneratedQuest({
        title: `Debate: ${topic}`,
        scenario: `You are at a town hall meeting discussing ${topic}. You need to express your opinion clearly and provide two supporting reasons.`,
        vocabulary: ["Impact", "Sustainable", "Community", "Long-term", "Regulation"],
        estimatedTime: "2 mins"
      });
      setIsGenerating(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-indigo-900 mb-2">AI Quest Generator 🪄</h1>
        <p className="text-indigo-600 font-medium mb-8">Generate custom speaking missions instantly with AI.</p>

        <div className="bg-white p-8 rounded-3xl shadow-lg border border-indigo-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Topic or Situation</label>
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Artificial Intelligence replacing jobs" 
                className="w-full border-2 border-indigo-100 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">CEFR Level</label>
              <select 
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full border-2 border-indigo-100 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white"
              >
                <option value="A1">A1 Beginner</option>
                <option value="A2">A2 Elementary</option>
                <option value="B1">B1 Intermediate</option>
                <option value="B2">B2 Upper Intermediate</option>
              </select>
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={isGenerating || !topic}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <><span className="animate-spin text-xl">🪄</span> Generating magic...</>
            ) : (
              "✨ Generate Quest"
            )}
          </button>
        </div>

        {generatedQuest && (
          <div className="mt-8 bg-gradient-to-br from-purple-600 to-indigo-700 p-1 rounded-3xl animate-fade-in-up">
            <div className="bg-white p-8 rounded-[22px]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{generatedQuest.title}</h2>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-bold border border-indigo-200">
                  {level}
                </span>
              </div>
              
              <div className="bg-indigo-50 p-6 rounded-2xl mb-6 border border-indigo-100">
                <h3 className="font-bold text-indigo-900 mb-2">Scenario</h3>
                <p className="text-indigo-800">{generatedQuest.scenario}</p>
              </div>

              <div className="mb-8">
                <h3 className="font-bold text-gray-700 mb-3">Suggested Vocabulary</h3>
                <div className="flex flex-wrap gap-2">
                  {generatedQuest.vocabulary.map((vocab: string, i: number) => (
                    <span key={i} className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700">
                      {vocab}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-green-500 hover:bg-green-400 text-white font-bold py-3 rounded-xl transition-all shadow-md">
                  Publish to Class
                </button>
                <button onClick={() => setGeneratedQuest(null)} className="px-6 py-3 bg-gray-100 text-gray-600 hover:bg-gray-200 font-bold rounded-xl transition-all">
                  Discard
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
