"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [role, setRole] = useState<"student" | "teacher" | "parent">("student");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // MOCK LOGIN LOGIC FOR MVP DEMONSTRATION
    // Bypasses NextAuth temporarily so the app can be presented without a database
    if (role === "student") {
      router.push("/student");
    } else if (role === "teacher") {
      router.push("/teacher");
    } else if (role === "parent") {
      router.push("/parent");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-sky-50 p-4 font-sans">
      <div className="w-full max-w-md rounded-[3rem] bg-white p-8 shadow-[0_8px_0_#BAE6FD] border-4 border-sky-200">
        <div className="mb-8 text-center">
          <div className="text-6xl mb-4 animate-bounce">🏰</div>
          <h1 className="text-3xl font-black text-sky-600">Speaking Quest</h1>
          <p className="text-gray-500 font-bold mt-2">Log in to start your adventure!</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-extrabold text-gray-700 mb-2">I am a...</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`py-2 px-1 rounded-2xl border-4 font-bold transition-all ${role === 'student' ? 'bg-orange-100 border-orange-400 text-orange-600 shadow-sm' : 'border-gray-100 text-gray-400'}`}
              >
                🧒 Student
              </button>
              <button
                type="button"
                onClick={() => setRole("teacher")}
                className={`py-2 px-1 rounded-2xl border-4 font-bold transition-all ${role === 'teacher' ? 'bg-indigo-100 border-indigo-400 text-indigo-600 shadow-sm' : 'border-gray-100 text-gray-400'}`}
              >
                👩‍🏫 Teacher
              </button>
              <button
                type="button"
                onClick={() => setRole("parent")}
                className={`py-2 px-1 rounded-2xl border-4 font-bold transition-all ${role === 'parent' ? 'bg-teal-100 border-teal-400 text-teal-600 shadow-sm' : 'border-gray-100 text-gray-400'}`}
              >
                👨‍👩‍👧 Parent
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-extrabold text-gray-700 mb-1">Username / Code</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-2xl border-4 border-sky-100 px-4 py-3 text-gray-900 font-bold focus:border-sky-400 focus:outline-none transition-colors"
              placeholder="e.g. Buddy123"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-extrabold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-2xl border-4 border-sky-100 px-4 py-3 text-gray-900 font-bold focus:border-sky-400 focus:outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-sky-500 px-4 py-4 text-white font-black text-xl border-4 border-sky-600 hover:bg-sky-400 shadow-[0_6px_0_#0284C7] active:shadow-none active:translate-y-2 transition-all"
          >
            ENTER QUEST 🚀
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm font-bold text-gray-400">
          Need an account? <span className="text-sky-500 cursor-pointer">Ask your teacher!</span>
        </div>
      </div>
    </div>
  );
}
