'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import HealMateMascot from '@/components/HealMateMascot';

const avatarOptions = [
  '/avatars/avatar1.png',
  '/avatars/avatar2.png',
  '/avatars/avatar3.png',
  '/avatars/avatar4.png',
];

export default function UserInfoFormPage() {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({
    name: '',
    age: '',
    condition: '',
    otherCondition: '',
    profilePic: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem('companionUser');
    if (stored) setUserInfo(JSON.parse(stored));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo(prev => ({ ...prev, profilePic: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const selectAvatar = (avatar: string) => {
    setUserInfo(prev => ({ ...prev, profilePic: avatar }));
  };

  const validateForm = () => {
    if (!userInfo.name || !userInfo.age || !userInfo.condition) return false;
    if (userInfo.condition === 'other' && !userInfo.otherCondition.trim()) return false;
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Please fill in all required fields.');
      return;
    }

    localStorage.setItem('companionUser', JSON.stringify(userInfo));
    router.push('/onboarding/intro-carousel');
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 p-6">
      <motion.div
        className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          Welcome to CompanionAI 💙
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Just a few quick steps to personalize your journey with HealMate 🤝
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full border-4 border-indigo-400 flex items-center justify-center overflow-hidden bg-gray-100 mb-2">
              {userInfo.profilePic ? (
                <img
                  src={userInfo.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm text-gray-400">Profile</span>
              )}
            </div>

            <label className="text-indigo-600 text-sm font-medium cursor-pointer mb-2">
              📤 Upload your own image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {avatarOptions.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  onClick={() => selectAvatar(avatar)}
                  className={`w-14 h-14 rounded-full object-cover cursor-pointer border-2 ${
                    userInfo.profilePic === avatar
                      ? 'border-indigo-600 ring-2 ring-indigo-300'
                      : 'border-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={userInfo.name}
              onChange={handleChange}
              placeholder="E.g., Ananya"
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Your Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              min={1}
              max={120}
              required
              value={userInfo.age}
              onChange={handleChange}
              placeholder="E.g., 24"
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Condition */}
          <div>
            <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
              Health Condition
            </label>
            <select
              id="condition"
              name="condition"
              required
              value={userInfo.condition}
              onChange={handleChange}
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select</option>
              <option value="pcod">PCOD</option>
              <option value="diabetes">Diabetes</option>
              <option value="cardiac">Cardiac Condition</option>
              <option value="mental">Mental Health</option>
              <option value="chronic">Chronic Illness</option>
              <option value="bedridden">Bedridden Condition</option>
              <option value="other">Other</option>
            </select>

            {userInfo.condition === 'other' && (
              <input
                type="text"
                name="otherCondition"
                value={userInfo.otherCondition}
                onChange={handleChange}
                placeholder="Please specify"
                className="mt-3 w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
          >
            Continue ➡️
          </button>
        </form>
      </motion.div>

      {/* HealMate mascot */}
      <div className="absolute bottom-4 right-4">
        <HealMateMascot />
      </div>
    </main>
  );
}
