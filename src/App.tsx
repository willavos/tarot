import { Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TarotSpread } from "./components/TarotSpread";
import { Reading } from "./components/Reading";
import { QuestionForm } from "./components/QuestionForm";
import { useTarotDeck } from "./hooks/useTarotDeck";

function App() {
  const {
    deck,
    drawnCards,
    drawCard,
    shuffleDeck,
    startReading,
    question,
    isReadingStarted,
    maxCards,
    isReadingComplete,
  } = useTarotDeck();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white p-8">
      <header className="text-center mb-12">
        <motion.h1
          className="text-4xl font-bold mb-4 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles className="w-8 h-8" />
          Mystic Tarot
          <Sparkles className="w-8 h-8" />
        </motion.h1>
        <motion.p
          className="text-purple-200 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isReadingStarted
            ? `Your Question: ${question}`
            : "Begin your journey into the mystic realm"}
        </motion.p>
        {!isReadingStarted && (
          <motion.button
            className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
            onClick={shuffleDeck}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shuffle Deck
          </motion.button>
        )}
      </header>

      <AnimatePresence mode="wait">
        {!isReadingStarted && <QuestionForm onSubmit={startReading} />}
      </AnimatePresence>
      <div className="relative">
        <AnimatePresence mode="wait">
          {isReadingStarted && (
            <TarotSpread
              deck={deck}
              onCardClick={drawCard}
              drawnPositions={drawnCards.map((card) => card.position)}
              maxCards={maxCards}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {drawnCards.length > 0 && (
            <div className="fixed bottom-0 left-0 w-full">
              <Reading
                drawnCards={drawnCards}
                isReadingComplete={isReadingComplete}
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
