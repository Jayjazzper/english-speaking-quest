"use client";

import { useRouter } from "next/navigation";

export default function AnalyticsDashboard() {
  const router = useRouter();

  // Mock Data
  const stats = {
    totalStudents: 32,
    avgScore: 16.5,
    missionsCompleted: 128,
    activeStreak: 24
  };

  const commonErrors = [
    { word: "th", errorType: "Pronunciation", count: 45 },
    { word: "Past Tense", errorType: "Grammar", count: 32 },
    { word: "Vocabulary Depth", errorType: "Vocabulary", count: 28 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <button onClick={() => router.push('/teacher')} className="text-indigo-600 hover:underline mb-2 inline-block font-bold">
            &larr; Back to Dashboard
          </button>
          <h1 className="text-3xl font-extrabold text-gray-900">Advanced Analytics</h1>
          <p className="text-gray-500">Class Performance Insights & Reports</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 flex items-center gap-2 shadow-md">
          📄 Export SAR Report (PDF)
        </button>
      </header>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 font-medium mb-1">Total Students</p>
          <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 font-medium mb-1">Avg. Class Score</p>
          <p className="text-3xl font-bold text-green-600">{stats.avgScore} <span className="text-lg text-gray-400">/ 20</span></p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 font-medium mb-1">Missions Completed</p>
          <p className="text-3xl font-bold text-blue-600">{stats.missionsCompleted}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 font-medium mb-1">Students on Streak</p>
          <p className="text-3xl font-bold text-orange-500">🔥 {stats.activeStreak}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Chart (Mock) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Weekly Performance Trend</h2>
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {[40, 55, 45, 70, 65, 80, 95].map((height, i) => (
              <div key={i} className="w-1/6 bg-indigo-100 rounded-t-lg relative group hover:bg-indigo-200 transition" style={{ height: `${height}%` }}>
                <div className="absolute bottom-0 w-full bg-indigo-500 rounded-t-lg transition-all" style={{ height: `${height - 20}%` }}></div>
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded font-bold">
                  {height} XP
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-400 font-bold px-4">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* Common Errors Table */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Top Class Weaknesses</h2>
          <div className="space-y-4">
            {commonErrors.map((error, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-red-900">{error.word}</h3>
                    <p className="text-sm text-red-700">{error.errorType}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-red-900">{error.count}</div>
                  <div className="text-xs text-red-700 font-medium">occurrences</div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 border-2 border-dashed border-indigo-300 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition">
            + Generate Remedial Mission for Weaknesses
          </button>
        </div>
      </div>
    </div>
  );
}
