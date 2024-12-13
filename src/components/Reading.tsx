import { motion } from "framer-motion";
import type { TarotCard } from "../types/tarot";
import { ChevronUp, ChevronDown, Sparkles, Loader } from "lucide-react";
import { interpretReading } from "../services/tarotService";
import { useEffect, useState } from "react";

interface ReadingProps {
  drawnCards: Array<TarotCard>;
  isReadingComplete: boolean;
  question: string;
}

export const Reading: React.FC<ReadingProps> = ({
  drawnCards,
  isReadingComplete,
  question,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [interpretation, setInterpretation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getInterpretation() {
      if (isReadingComplete && drawnCards.length > 0) {
        setIsLoading(true);
        try {
          const cardNames = drawnCards.map(
            (card) => card.name + (card.reversed ? " (reversed)" : ""),
          );
          const result = await interpretReading(cardNames, question || "");
          setInterpretation(result);
        } catch (error) {
          console.error("Error getting interpretation:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    getInterpretation();
  }, [isReadingComplete, drawnCards, question]);

  if (drawnCards.length === 0) return null;

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{
        y: isReadingComplete || isExpanded ? 0 : "calc(100% - 60px)",
      }}
      className="fixed bottom-0 left-0 w-full bg-purple-900 rounded-t-lg shadow-lg"
      style={{ maxHeight: "80vh", overflowY: "auto" }}
    >
      <div
        className="p-4 cursor-pointer flex justify-between items-center"
        onClick={() => !isReadingComplete && setIsExpanded(!isExpanded)}
      >
        <h2 className="text-2xl font-bold text-white">
          Your Reading ({drawnCards.length}{" "}
          {drawnCards.length === 1 ? "card" : "cards"})
        </h2>
        {!isReadingComplete && (isExpanded ? <ChevronDown /> : <ChevronUp />)}
      </div>

      <div className="p-6 space-y-6">
        {drawnCards.map((card, index) => (
          <motion.div
            key={`${card.name}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-purple-800 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-semibold text-white">
                {card.nameNoSuit}
                {card.arcana === "minor" && " of"}
                {card.arcana === "minor" && <SuitTooltip suit={card.suit} />}
              </h3>
              {card.reversed && (
                <span className="text-red-400 text-sm">(Reversed)</span>
              )}
              {card.arcana === "major" && (
                <span className="ml-2 relative group cursor-help">
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-yellow-500 rounded-full text-xs font-bold text-purple-900">
                    M
                  </span>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 mb-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Major Arcana
                  </span>
                </span>
              )}
            </div>
            <p
              className={`${card.reversed ? "text-red-400" : "text-purple-200"} mb-2`}
            >
              {card.reversed ? card.reversedMeaning : card.uprightMeaning}
            </p>
            <p className="text-purple-300">{card.description}</p>
          </motion.div>
        ))}

        {/* Interpretation section */}
        {isReadingComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <div className="bg-gradient-to-r from-purple-700/30 to-indigo-700/30 rounded-lg p-6 backdrop-blur-sm border border-purple-500/20">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                Mystical Interpretation
              </h3>

              {isLoading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader className="w-6 h-6 text-purple-300 animate-spin" />
                  <span className="ml-3 text-purple-300">
                    Consulting the cards...
                  </span>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <p className="text-purple-100 leading-relaxed whitespace-pre-line">
                    {interpretation}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const SuitTooltip: React.FC<{ suit: string | undefined }> = ({ suit }) => {
  const suitMeanings: { [key: string]: string } = {
    cups: "emotions, relationships, intuition",
    wands: "passion, creativity, action",
    swords: "thought, conflict, truth",
    pentacles: "material world, work, money",
  };

  if (!suit) return null;

  return (
    <span className="relative group cursor-help ml-2">
      <span className="border-b border-dashed">
        {suit.charAt(0).toUpperCase() + suit.slice(1)}
      </span>
      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 mb-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {suitMeanings[suit.toLowerCase()]}
      </span>
    </span>
  );
};
