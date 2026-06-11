"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const mockSubmissions = [
  { id: "s1", studentName: "Alice Smith", mission: "Ordering Food", level: "A2", audioUrl: "#", status: "pending" },
  { id: "s2", studentName: "Bob Jones", mission: "Introduce Yourself", level: "A1", audioUrl: "#", status: "pending" },
];

export default function GradingDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedSubmission, setSelectedSubmission] = useState<any | null>(null);
  const [scores, setScores] = useState({ pronunciation: 0, fluency: 0, vocabulary: 0, grammar: 0, confidence: 0 });
  const [feedback, setFeedback] = useState("");

  const handleGrade = (e: React.FormEvent) => {
    e.preventDefault();
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    alert(`Graded successfully! Total Score: ${totalScore}/20. Feedback sent.`);
    setSelectedSubmission(null);
    // In real app, remove from pending list
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <button onClick={() => router.push('/teacher')} className="text-indigo-600 hover:underline mb-2 inline-block">
            &larr; Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Grading Dashboard</h1>
          <p className="text-gray-500">Review and grade your students' speaking missions</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 border-r pr-4">
          <h2 className="text-xl font-bold mb-4">Pending Submissions</h2>
          <div className="space-y-3">
            {mockSubmissions.map((sub) => (
              <div 
                key={sub.id} 
                onClick={() => setSelectedSubmission(sub)}
                className={`p-4 border rounded-xl cursor-pointer transition ${selectedSubmission?.id === sub.id ? 'bg-indigo-50 border-indigo-300' : 'bg-white hover:border-indigo-300'}`}
              >
                <h3 className="font-bold text-gray-800">{sub.studentName}</h3>
                <p className="text-sm text-gray-500">{sub.mission} (CEFR {sub.level})</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedSubmission ? (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedSubmission.studentName}</h2>
                  <p className="text-indigo-600 font-medium">{selectedSubmission.mission}</p>
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                  CEFR {selectedSubmission.level}
                </span>
              </div>

              <div className="mb-8 bg-gray-100 p-4 rounded-xl flex items-center justify-center">
                {/* Fake audio player for MVP */}
                <div className="flex items-center gap-4 w-full max-w-md">
                  <button className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700">▶</button>
                  <div className="h-2 flex-1 bg-gray-300 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 w-1/3"></div>
                  </div>
                  <span className="text-sm font-mono text-gray-500">0:15 / 0:45</span>
                </div>
              </div>

              <form onSubmit={handleGrade}>
                <h3 className="text-lg font-bold mb-4">Evaluation Criteria (20 Points)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {['pronunciation', 'fluency', 'vocabulary', 'grammar', 'confidence'].map((criterion) => (
                    <div key={criterion}>
                      <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                        {criterion} (Max {criterion === 'pronunciation' || criterion === 'fluency' ? 5 : criterion === 'vocabulary' ? 4 : 3})
                      </label>
                      <input 
                        type="number" 
                        min="0" 
                        max={criterion === 'pronunciation' || criterion === 'fluency' ? 5 : criterion === 'vocabulary' ? 4 : 3}
                        value={(scores as any)[criterion]}
                        onChange={(e) => setScores({...scores, [criterion]: parseInt(e.target.value) || 0})}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Feedback / Comments</label>
                  <textarea 
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full border rounded-lg p-3 h-24 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Great pronunciation, but try to speak a bit slower next time..."
                  ></textarea>
                </div>

                <div className="flex justify-end gap-4">
                  <button type="button" onClick={() => setSelectedSubmission(null)} className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">
                    Cancel
                  </button>
                  <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition">
                    Submit Grade & Award XP
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl h-96 flex items-center justify-center text-gray-400 font-medium">
              Select a submission from the left to start grading.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
