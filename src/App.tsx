import { Sparkles, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { TarotSpread } from "./components/TarotSpread";
import { Reading } from "./components/Reading";
import { QuestionForm } from "./components/QuestionForm";
import { UserInfo, UserInfoForm } from "./components/UserInfoForm";
import { Welcome } from "./components/Welcome";
import { useTarotDeck } from "./hooks/useTarotDeck";

function App() {
  const [stage, setStage] = useState<
    "welcome" | "userInfo" | "question" | "reading"
  >("welcome");
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);

  const {
    deck,
    drawnCards,
    drawCard,
    startReading,
    resetReading,
    question,
    maxCards,
    shuffleDeck,
    isReadingComplete,
  } = useTarotDeck();

  useEffect(() => {
    const savedUserInfo = localStorage.getItem("userInfo");
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
    } else {
      setStage("userInfo");
    }
  }, []);

  useEffect(() => {
    console.log("Stage changed to:", stage);
  }, [stage]);

  useEffect(() => {
    console.log("Deck updated, length:", deck.length);
  }, [deck]);

  const handleUserInfoComplete = (info: UserInfo) => {
    setUserInfo(info);
    setStage("welcome");
    setShowUserInfoModal(false);
  };

  const handleStartReading = () => {
    setStage("question");
  };

  const handleQuestionSubmit = (question: string, maxCards: number) => {
    shuffleDeck();
    setStage("reading");
    startReading(question, maxCards);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white p-8">
      <button
        onClick={() => setShowUserInfoModal(true)}
        className="fixed top-4 right-4 p-2 rounded-full bg-purple-800 hover:bg-purple-700 transition"
      >
        <Settings className="w-5 h-5" />
      </button>

      <header className="text-center mb-12">
        <motion.h1
          className="text-4xl font-bold mb-4 flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => {
              console.log("Resetting reading...");
              shuffleDeck();
              setStage("question");
            }}
          >
            <Sparkles className="w-8 h-8" />
            Mystic Tarot
            <Sparkles className="w-8 h-8" />
          </div>
        </motion.h1>
        <motion.p
          className="text-purple-200 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {stage === "reading"
            ? `Your Question: ${question}`
            : "Begin your journey into the mystic realm"}
        </motion.p>
      </header>

      <AnimatePresence mode="wait">
        {stage === "welcome" && userInfo && (
          <Welcome userName={userInfo.name} onStart={handleStartReading} />
        )}
        {stage === "userInfo" && (
          <UserInfoForm onComplete={handleUserInfoComplete} />
        )}
        {stage === "question" && (
          <QuestionForm onSubmit={handleQuestionSubmit} />
        )}
      </AnimatePresence>

      <div className="relative">
        {stage === "reading" && deck.length > 0 && (
          <TarotSpread
            key={`tarot-spread-${stage}-${deck.length}`}
            deck={deck}
            onCardClick={drawCard}
            drawnPositions={drawnCards.map((card) => card.position)}
            maxCards={maxCards}
          />
        )}

        <AnimatePresence>
          {drawnCards.length > 0 && (
            <div className="fixed bottom-0 left-0 w-full">
              <Reading
                drawnCards={drawnCards}
                isReadingComplete={isReadingComplete}
                question={question}
                userInfo={userInfo}
              />
            </div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showUserInfoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
          >
            <div className="bg-purple-900 p-6 rounded-lg max-w-md w-full">
              <h2 className="text-xl mb-4">Update Your Information</h2>
              <UserInfoForm onComplete={handleUserInfoComplete} />
              <button
                onClick={() => setShowUserInfoModal(false)}
                className="mt-4 w-full p-2 bg-purple-700 rounded"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
