'use client';

import { motion } from 'framer-motion';
import { BsRobot } from 'react-icons/bs';

export default function HealMateMascot() {
  return (
    <motion.div
      className="bg-white p-3 rounded-full shadow-xl border border-indigo-300"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <BsRobot className="text-indigo-600 text-3xl" title="HealMate" />
    </motion.div>
  );
}
