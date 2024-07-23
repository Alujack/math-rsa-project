"use client";

import { useState } from 'react';
import CaesarCipher from '@/libs/caesorCiperEncryptDecrypt';

export default function HomePage() {
  const [message, setMessage] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [showEncrypted, setShowEncrypted] = useState(true);

  const caesarCipher = new CaesarCipher(3);

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
    <div className="w-full flex flex-col items-center pt-10 px-4 sm:px-6 md:px-8 lg:px-12">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your Message"
        className="w-full max-w-lg p-4 rounded-full text-black bg-cyan-400 placeholder-black"
      />

      <div className="flex flex-col sm:flex-row sm:space-x-4 mt-4 w-full max-w-lg">
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
        <p className="mb-3 text-gray-500 dark:text-gray-400">
          Original Message: {message || 'No message entered'}
        </p>
        {showEncrypted ? (
          <p className="mb-3 text-gray-500 dark:text-gray-400">
            Encrypted: {encrypted || 'No message encrypted'}
          </p>
        ) : (
          <p className="mb-3 text-gray-500 dark:text-gray-400">
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
            <p className="text-gray-500 dark:text-gray-400">Shift: {caesarCipher.shift}</p>
          </div>
        )}
      </div>
    </div>
  );
}
