'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRobot } from 'react-icons/fa';

const languages = [
  { code: 'en', name: 'English', emoji: '🇺🇸', greeting: 'Welcome to CompanionAI!' },
  { code: 'hi', name: 'Hindi', emoji: '🇮🇳', greeting: 'CompanionAI में आपका स्वागत है!' },
  { code: 'ta', name: 'Tamil', emoji: '🧘🏽‍♂️', greeting: 'CompanionAI-க்கு வரவேற்கின்றோம்!' },
  { code: 'bn', name: 'Bengali', emoji: '🎨', greeting: 'CompanionAI এ স্বাগতম!' },
  { code: 'te', name: 'Telugu', emoji: '📿', greeting: 'CompanionAIకి స్వాగతం!' },
  { code: 'ml', name: 'Malayalam', emoji: '🌴', greeting: 'CompanionAI-ലേക്ക് സ്വാഗതം!' },
];

export default function LanguageSelectorPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const handleLanguageSelect = (lang: any) => {
    setSelectedLanguage(lang.code);
    const utterance = new SpeechSynthesisUtterance(lang.greeting);
    utterance.lang = lang.code;
    speechSynthesis.speak(utterance);

    setTimeout(() => {
      // Navigate to onboarding carousel after greeting
      window.location.href = `/onboarding/intro-carousel?lang=${lang.code}`;
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-100 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Logo and Header */}
      <motion.div
        className="mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold text-teal-700 mb-2">CompanionAI</h1>
        <p className="text-lg text-gray-600">Your Healing Companion 💙</p>
      </motion.div>

      {/* Language Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-6 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {languages.map((lang, idx) => (
          <motion.button
            key={lang.code}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-md hover:shadow-xl rounded-2xl p-4 flex flex-col items-center justify-center transition-all duration-200"
            onClick={() => handleLanguageSelect(lang)}
          >
            <div className="text-4xl mb-2">{lang.emoji}</div>
            <div className="text-md font-semibold text-gray-700">{lang.name}</div>
          </motion.button>
        ))}
      </motion.div>

      {/* Floating HealMate Assistant */}
      <motion.div
        className="fixed bottom-6 right-6 bg-white shadow-xl p-3 rounded-full border border-teal-300 cursor-pointer hover:scale-110 transition-all"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 150 }}
        title="Hi, I'm HealMate!"
      >
        <FaRobot className="text-teal-600 text-2xl animate-bounce" />
      </motion.div>
    </div>
  );
}
