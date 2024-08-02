"use client";

import { useState } from 'react';
import CaesarCipher from '@/libs/caesorCiperEncryptDecrypt';
import Link from "next/link";

export default function HomePage() {
  const [message, setMessage] = useState('');
  const [shift, setShift] = useState(3); // Default shift value
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [showEncrypted, setShowEncrypted] = useState(true);

  const caesarCipher = new CaesarCipher(shift);

  const handleEncrypt = () => {
    playSound();
    setEncrypted(caesarCipher.encrypt(message));
    setShowEncrypted(true);
  };

  const handleDecrypt = () => {
    playSound();
    setDecrypted(caesarCipher.decrypt(encrypted));
    setShowEncrypted(false);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const playSound = () => {
    const audio = new Audio('/sound/click.wav');
    audio.play();
  };

  return (
    <div className="banner-cc w-full min-h-screen flex flex-col items-center pt-10 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 flex justify-start">
        <button className="p-2 rounded-lg bg-teal-400 text-white">
          <Link href="../">Back</Link>
        </button>
      </div>
      <div className="w-full max-w-lg mt-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Message"
          className="w-full p-4 rounded-full text-black bg-cyan-400 placeholder-black"
        />
      </div>
      <div className="w-full max-w-lg mt-4">
        <input
          type="number"
          value={shift}
          onChange={(e) => setShift(Number(e.target.value))}
          placeholder="Shift"
          className="w-full p-4 rounded-full text-black bg-cyan-400 placeholder-black"
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
          Original Message: {message || 'No message entered'}
        </p>
        {showEncrypted ? (
          <p className="mb-3 text-gray-500">
            Encrypted: {encrypted || 'No message encrypted'}
          </p>
        ) : (
          <p className="mb-3 text-gray-500">
            Decrypted: {decrypted || 'No message decrypted'}
          </p>
        )}
        <button
          onClick={toggleDetails}
          className="text-blue-500 mt-4"
        >
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>
        {showDetails && (
          <div className="mt-4">
            <p className="text-gray-500">Shift: {shift}</p>
          </div>
        )}
      </div>
    </div>
  );
}
