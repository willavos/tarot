import React from 'react';
import { motion } from 'framer-motion';
import type { TarotCard } from '../types/tarot';

interface CardProps {
  card: TarotCard;
  isFlipped: boolean;
  onClick: () => void;
  index: number;
}

export const Card: React.FC<CardProps> = ({ card, isFlipped, onClick, index }) => {
  return (
    <motion.div
      className="relative w-32 h-48 cursor-pointer"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      layout
      onClick={onClick}
    >
      <motion.div
        className="absolute w-full h-full rounded-lg shadow-xl"
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
          rotateZ: isFlipped && Math.random() > 0.5 ? 180 : 0 
        }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute w-full h-full backface-hidden">
          <div className="w-full h-full bg-purple-900 rounded-lg border-2 border-gold p-2">
            <div className="w-full h-full bg-purple-800 rounded-lg flex items-center justify-center">
              <span className="text-gold text-2xl">✧</span>
            </div>
          </div>
        </div>
        
        <div 
          className="absolute w-full h-full backface-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <img
            src={card.image}
            alt={card.name}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 rounded-b-lg">
            <p className="text-white text-sm font-medium text-center">{card.name}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};