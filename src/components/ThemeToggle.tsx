"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10"></div>;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="bg-white/80 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-yellow-400 p-3 rounded-2xl shadow-md border border-gray-200 dark:border-gray-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
      aria-label="Toggle Dark Mode"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
