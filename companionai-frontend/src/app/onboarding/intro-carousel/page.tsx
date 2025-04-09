'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsRobot, BsHeartPulse, BsChatDots, BsGlobe, BsMic } from 'react-icons/bs';
import { FaUserNurse } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import HealMateMascot from '@/components/HealMateMascot';

const slides = [
  {
    title: 'Meet Your Companion AI',
    description: 'Your personal wellness assistant for emotional, physical, and social support.',
    icon: <BsRobot size={48} className="text-indigo-600" />,
    voice: 'Welcome to Companion AI, your personal wellness assistant.'
  },
  {
    title: 'Emotional Support with HealMate',
    description: 'Get comfort through conversations, mood tracking, and voice of loved ones.',
    icon: <BsChatDots size={48} className="text-pink-500" />,
    voice: 'Receive emotional support with HealMate, powered by AI and your loved ones\' voices.'
  },
  {
    title: 'Health Insights That Matter',
    description: 'Track heart rate, stress, sleep, and receive personalized health analysis.',
    icon: <BsHeartPulse size={48} className="text-red-500" />,
    voice: 'Monitor your vital health parameters and stay informed with personalized health insights.'
  },
  {
    title: 'Multilingual & Voice-first',
    description: 'Interact in your preferred language using voice commands from day one.',
    icon: <BsGlobe size={48} className="text-green-600" />,
    voice: 'Interact in your language with voice-first experiences powered by AI.'
  },
  {
    title: 'Support & Caregiver Connect',
    description: 'Share progress with caregivers and connect with your community.',
    icon: <FaUserNurse size={48} className="text-yellow-600" />,
    voice: 'Connect with your caregivers and support network when you need them most.'
  }
];

export default function IntroCarousel() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  // Voice greeting
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(slides[current].voice);
      utterance.lang = 'en-US';
      synth.speak(utterance);
    }
  }, [current]);

  const nextSlide = () => {
    if (current < slides.length - 1) setCurrent(current + 1);
    else router.push('/onboarding/user-info');
  };

  const prevSlide = () => {
    if (current > 0) setCurrent(current - 1);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-sky-50 to-indigo-100 flex flex-col items-center justify-center p-6">
      {/* Animated background blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-white animate-pulse opacity-20 blur-3xl z-0" />

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6 }}
          className="z-10 w-full max-w-2xl bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center text-center gap-4"
        >
          {slides[current].icon}
          <h2 className="text-2xl font-bold text-gray-800">{slides[current].title}</h2>
          <p className="text-gray-600 text-base">{slides[current].description}</p>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="mt-6 flex gap-4 z-10">
        <button
          onClick={prevSlide}
          disabled={current === 0}
          className="px-4 py-2 rounded-lg border border-gray-400 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-40"
        >
          Back
        </button>
        <button
          onClick={nextSlide}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          {current === slides.length - 1 ? 'Get Started' : 'Next'}
        </button>
      </div>

      {/* Progress Dots */}
      <div className="flex mt-6 space-x-2 z-10">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current ? 'bg-indigo-500 scale-125' : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>

      {/* HealMate mascot */}
      <div className="absolute bottom-6 right-6 z-20">
        <HealMateMascot />
      </div>
    </div>
  );
}
