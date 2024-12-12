import React from 'react';
import { motion } from 'framer-motion';
import type { TarotCard } from '../types/tarot';

interface ReadingProps {
  drawnCards: Array<TarotCard & { isReversed: boolean }>;
}

export const Reading: React.FC<ReadingProps> = ({ drawnCards }) => {
  if (drawnCards.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-purple-900 rounded-lg p-6 max-w-2xl mx-auto mt-8"
    >
      <h2 className="text-2xl font-bold text-white mb-4">Your Reading</h2>
      <div className="space-y-6">
        {drawnCards.map((card, index) => (
          <motion.div
            key={`${card.name}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-purple-800 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-semibold text-white">{card.name}</h3>
              {card.isReversed && (
                <span className="text-red-400 text-sm">(Reversed)</span>
              )}
            </div>
            <p className="text-purple-200 mb-2">
              {card.isReversed ? card.reversedMeaning : card.uprightMeaning}
            </p>
            <p className="text-purple-300">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};