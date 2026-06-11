"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TeacherDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [className, setClassName] = useState("");
  const [classes, setClasses] = useState<any[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!className) return;

    // Simulate API call for MVP UI
    const newClass = { 
      id: Date.now().toString(), 
      name: className, 
      joinCode: Math.random().toString(36).substring(2, 8).toUpperCase() 
    };
    setClasses([...classes, newClass]);
    setClassName("");
  };

  if (status === "loading") return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-gray-500">Welcome back, {session?.user?.name || 'Teacher'}</p>
        </div>
        <button onClick={() => router.push('/teacher/grading')} className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700">
          Grade Submissions
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-indigo-700">Create New Class</h2>
            <form onSubmit={handleCreateClass} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class Name</label>
                <input
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. Basic English 101"
                />
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white rounded-lg p-2 font-medium hover:bg-indigo-700 transition">
                Create Class
              </button>
            </form>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-indigo-700">Your Classes</h2>
            {classes.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <p className="text-gray-500 font-medium">No classes created yet.</p>
                <p className="text-sm text-gray-400 mt-1">Create your first class to invite students.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {classes.map(c => (
                  <div key={c.id} className="flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition bg-white">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{c.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">Join Code: <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{c.joinCode}</span></p>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium">Manage</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
