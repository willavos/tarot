import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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

export function UserInfoForm({ onComplete }: UserInfoFormProps) {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    birthDate: "",
    zodiacSign: "",
    knowFuture: false,
    otherInfo: "",
  });

  useEffect(() => {
    const savedUserInfo = localStorage.getItem("userInfo");
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        <textarea
          className="w-full p-2 rounded bg-purple-900/50 border border-purple-500"
          rows={3}
          value={userInfo.otherInfo}
          onChange={(e) =>
            setUserInfo({ ...userInfo, otherInfo: e.target.value })
          }
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-purple-600 rounded hover:bg-purple-700 transition"
      >
        Begin Your Journey
      </button>
    </motion.form>
  );
}
