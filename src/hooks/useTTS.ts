"use client";

import { useState, useEffect, useCallback } from "react";

export function useTTS() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      // Filter only English voices
      const englishVoices = availableVoices.filter(v => v.lang.startsWith("en"));
      setVoices(englishVoices);

      // Restore previously selected voice from localStorage if available
      const savedVoiceURI = localStorage.getItem("selected_voice_uri");
      if (savedVoiceURI && englishVoices.length > 0) {
        const found = englishVoices.find(v => v.voiceURI === savedVoiceURI);
        if (found) setSelectedVoice(found);
      } else if (englishVoices.length > 0) {
        // Default to a female Google US voice or similar if available, else first English voice
        const defaultVoice = englishVoices.find(v => v.name.includes("Google") && v.name.includes("Female")) 
                          || englishVoices[0];
        setSelectedVoice(defaultVoice);
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Set and save selected voice
  const setVoice = (voiceURI: string) => {
    const voice = voices.find(v => v.voiceURI === voiceURI);
    if (voice) {
      setSelectedVoice(voice);
      localStorage.setItem("selected_voice_uri", voice.voiceURI);
    }
  };

  // Speak function
  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // Stop any currently playing audio
    const utterance = new SpeechSynthesisUtterance(text);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    // Slow down the rate slightly for kids
    utterance.rate = 0.9;
    
    window.speechSynthesis.speak(utterance);
  }, [selectedVoice]);

  return { voices, selectedVoice, setVoice, speak };
}
