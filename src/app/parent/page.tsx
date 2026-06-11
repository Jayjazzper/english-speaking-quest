"use client";

export default function ParentPortal() {
  const student = {
    name: "Alice Smith",
    level: 3,
    xp: 1240,
    streak: 5,
    cefr: "A2"
  };

  return (
    <div className="min-h-screen bg-teal-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-10 bg-white p-6 rounded-3xl shadow-sm border border-teal-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center text-3xl text-white shadow-inner">
              👨‍👩‍👧
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-teal-900">Parent Portal</h1>
              <p className="text-teal-600 font-medium">Tracking {student.name}'s Progress</p>
            </div>
          </div>
          <button className="text-teal-700 bg-teal-100 px-4 py-2 rounded-xl font-bold hover:bg-teal-200 transition">
            Log Out
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
            <div className="text-4xl mb-2">🔥</div>
            <p className="text-gray-500 font-medium">Current Streak</p>
            <p className="text-3xl font-bold text-orange-500">{student.streak} Days</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
            <div className="text-4xl mb-2">⭐</div>
            <p className="text-gray-500 font-medium">Total XP</p>
            <p className="text-3xl font-bold text-yellow-500">{student.xp}</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
            <div className="text-4xl mb-2">📈</div>
            <p className="text-gray-500 font-medium">CEFR Level</p>
            <p className="text-3xl font-bold text-blue-600">{student.cefr}</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span>🎙️</span> Best Recording of the Week
          </h2>
          
          <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-teal-900">Mission: Ordering Food</h3>
              <span className="text-sm font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">Score: 18/20</span>
            </div>
            
            <div className="flex items-center gap-4 w-full">
              <button className="bg-teal-600 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-teal-500 transition shadow-md">
                ▶
              </button>
              <div className="h-3 flex-1 bg-teal-200 rounded-full overflow-hidden">
                <div className="h-full bg-teal-600 w-full opacity-50"></div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-teal-200">
              <p className="text-sm font-bold text-gray-700 mb-1">Teacher's Feedback:</p>
              <p className="text-gray-600 text-sm italic">"Alice spoke very clearly and politely. Her pronunciation of 'vegetables' has improved a lot since last week!"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
