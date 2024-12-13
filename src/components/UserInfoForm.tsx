import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

export interface UserInfo {
  name: string;
  birthDate: string;
  zodiacSign: string;
  knowFuture: boolean;
  otherInfo: string;
}

interface UserInfoFormProps {
  onComplete: (userInfo: UserInfo) => void;
}

const CHARACTER_LIMIT = 500;

export function UserInfoForm({ onComplete }: UserInfoFormProps) {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    birthDate: "",
    zodiacSign: "",
    knowFuture: false,
    otherInfo: "",
  });

  const charactersRemaining = useMemo(
    () => CHARACTER_LIMIT - userInfo.otherInfo.length,
    [userInfo.otherInfo],
  );

  const isOverLimit = charactersRemaining < 0;

  useEffect(() => {
    const savedUserInfo = localStorage.getItem("userInfo");
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOverLimit) return;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    onComplete(userInfo);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto space-y-4"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-purple-200 mb-2">Your Name</label>
        <input
          type="text"
          required
          className="w-full p-2 rounded bg-purple-900/50 border border-purple-500"
          value={userInfo.name}
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-purple-200 mb-2">Birth Date</label>
        <input
          type="date"
          required
          className="w-full p-2 rounded bg-purple-900/50 border border-purple-500"
          value={userInfo.birthDate}
          onChange={(e) =>
            setUserInfo({ ...userInfo, birthDate: e.target.value })
          }
        />
      </div>
      <div>
        <label className="block text-purple-200 mb-2">Zodiac Sign</label>
        <select
          required
          className="w-full p-2 rounded bg-purple-900/50 border border-purple-500"
          value={userInfo.zodiacSign}
          onChange={(e) =>
            setUserInfo({ ...userInfo, zodiacSign: e.target.value })
          }
        >
          <option value="">Select your sign</option>
          <option value="aries">♈ Aries</option>
          <option value="taurus">♉ Taurus</option>
          <option value="gemini">♊ Gemini</option>
          <option value="cancer">♋ Cancer</option>
          <option value="leo">♌ Leo</option>
          <option value="virgo">♍ Virgo</option>
          <option value="libra">♎ Libra</option>
          <option value="scorpio">♏ Scorpio</option>
          <option value="sagittarius">♐ Sagittarius</option>
          <option value="capricorn">♑ Capricorn</option>
          <option value="aquarius">♒ Aquarius</option>
          <option value="pisces">♓ Pisces</option>
        </select>
      </div>
      <div>
        <label className="block text-purple-200 mb-2">
          Do you want to know your future?
        </label>
        <input
          type="checkbox"
          className="rounded"
          checked={userInfo.knowFuture}
          onChange={(e) =>
            setUserInfo({ ...userInfo, knowFuture: e.target.checked })
          }
        />
      </div>
      <div>
        <label className="block text-purple-200 mb-2">
          Is there any other information you would like to share?
        </label>
        <div className="relative">
          <textarea
            className={`w-full p-2 rounded bg-purple-900/50 border ${
              isOverLimit ? "border-red-500" : "border-purple-500"
            }`}
            rows={3}
            maxLength={CHARACTER_LIMIT}
            value={userInfo.otherInfo}
            onChange={(e) =>
              setUserInfo({ ...userInfo, otherInfo: e.target.value })
            }
          ></textarea>
          <span
            className={`absolute bottom-2 right-2 text-sm ${
              isOverLimit ? "text-red-500" : "text-gray-400"
            }`}
          >
            {charactersRemaining}
          </span>
        </div>
        {isOverLimit && (
          <p className="text-red-500 text-sm mt-1">
            Text exceeds maximum length of {CHARACTER_LIMIT} characters
          </p>
        )}
      </div>

      <button
        type="submit"
        className={`w-full p-2 rounded transition ${
          isOverLimit
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700"
        }`}
        disabled={isOverLimit}
      >
        Begin Your Journey
      </button>
    </motion.form>
  );
}
