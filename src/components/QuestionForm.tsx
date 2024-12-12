import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface QuestionFormProps {
  onSubmit: (question: string, cardCount: number) => void;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [showCustomCount, setShowCustomCount] = useState(false);
  const [customCount, setCustomCount] = useState('3');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    const count = showCustomCount ? Math.min(Math.max(1, parseInt(customCount, 10)), 10) : 3;
    onSubmit(question, count);
  };

  return (
    <motion.form
      className="bg-purple-900 rounded-lg p-6 max-w-xl mx-auto mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label htmlFor="question" className="block text-white mb-2">
          What question seeks answers in the cards?
        </label>
        <textarea
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 rounded-lg bg-purple-800 text-white border border-purple-600 focus:border-gold focus:ring-1 focus:ring-gold"
          rows={3}
          required
        />
      </div>

      <div className="mb-4">
        <p className="text-white mb-2">How many cards would you like to draw?</p>
        <div className="flex gap-2">
          <motion.button
            type="button"
            className={`px-4 py-2 rounded-lg ${!showCustomCount ? 'bg-[#FFD700] text-purple-900 font-semibold' : 'bg-purple-800 text-white hover:bg-purple-700'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCustomCount(false)}
          >
            3 Cards
          </motion.button>
          <motion.button
            type="button"
            className={`px-4 py-2 rounded-lg ${showCustomCount ? 'bg-[#FFD700] text-purple-900 font-semibold' : 'bg-purple-800 text-white hover:bg-purple-700'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCustomCount(true)}
          >
            Custom
          </motion.button>
        </div>
      </div>

      {showCustomCount && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-4"
        >
          <label htmlFor="customCount" className="block text-white mb-2">
            Number of cards (1-10):
          </label>
          <input
            type="number"
            id="customCount"
            value={customCount}
            onChange={(e) => setCustomCount(e.target.value)}
            min="1"
            max="10"
            className="w-24 p-2 rounded-lg bg-purple-800 text-white border border-purple-600 focus:border-gold focus:ring-1 focus:ring-gold"
          />
        </motion.div>
      )}

      <motion.button
        type="submit"
        className="w-full bg-[#FFD700] text-purple-900 font-bold py-2 rounded-lg hover:bg-[#FFE55C]"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Begin Reading
      </motion.button>
    </motion.form>
  );
};