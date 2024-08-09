"use client";

import { useState } from "react";
import CaesarCipher from "@/libs/caesorCiperEncryptDecrypt";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [message, setMessage] = useState("");
  const [shift, setShift] = useState(); // Default shift value
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [showEncrypted, setShowEncrypted] = useState(true);
  const router = useRouter();

  const caesarCipher = new CaesarCipher(shift);

  const handleEncrypt = () => {
    playSound();
    const caesarCipher = new CaesarCipher(shift);
    setEncrypted(caesarCipher.encrypt(message));
    setShowEncrypted(true);
  };

  const handleDecrypt = () => {
    playSound();
    const caesarCipher = new CaesarCipher(shift);
    setDecrypted(caesarCipher.decrypt(encrypted));
    setShowEncrypted(false);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const playSound = () => {
    const audio = new Audio("/sound/click.wav");
    audio.play();
  };

  return (
    <div className="banner-cc w-full min-h-screen pt-10 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 flex justify-start mb-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
        >
          Back
        </button>
      </div>
      <div className="flex justify-center items-center w-full h-full">
        <div className="border p-4 sm:p-6 md:p-8 lg:p-12 max-w-3xl w-full flex flex-col items-center">
          <div className="w-full max-w-lg mt-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
              className="w-full p-4 rounded-lg text-black placeholder-black"
            />
          </div>
          <div className="w-full max-w-lg mt-4">
            <input
              type="number"
              value={shift || ""}
              onChange={(e) => setShift(Number(e.target.value))}
              placeholder="Number to Shift"
              className="w-full p-4 rounded-lg text-black placeholder-black"
            />
          </div>
          <div className="w-full max-w-lg mt-4 flex flex-col sm:flex-row sm:space-x-4">
            <button
              onClick={handleEncrypt}
              className="text-white w-full sm:w-1/2 font-bold py-2 px-4 rounded-full bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 mb-2 sm:mb-0"
            >
              Encrypt
            </button>
            <button
              onClick={handleDecrypt}
              className="text-white w-full sm:w-1/2 font-bold py-2 px-4 rounded-full bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
            >
              Decrypt
            </button>
          </div>
          <div className="w-full max-w-lg p-4 mt-8 text-xl">
            <p className="mb-3 text-gray-500">
              Original Message: {message || "No message entered"}
            </p>
            {showEncrypted ? (
              <p className="mb-3 text-gray-500">
                Encrypted: {encrypted || "No message encrypted"}
              </p>
            ) : (
              <p className="mb-3 text-gray-500">
                Decrypted: {decrypted || "No message decrypted"}
              </p>
            )}
            <button onClick={toggleDetails} className="text-blue-500 mt-4">
              {showDetails ? "Hide Details" : "View Details"}
            </button>
            {showDetails && (
              <div className="mt-4">
                <p className="text-gray-500">Shift: {shift}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
