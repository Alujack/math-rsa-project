"use client";

import { useState } from 'react';
import RSA from '@/libs/rsaEcryptDecript';

export default function HomePage() {
  const [message, setMessage] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');
  const [showDetails, setShowDetails] = useState(false); 
  const [showEncrypted, setShowEncrypted] = useState(true);

  const rsa = new RSA(61, 53);

  const handleEncrypt = () => {
    playSound();
    setEncrypted(rsa.encrypt(message));
    setShowEncrypted(true);
  };

  const handleDecrypt = () => {
    playSound();
    setDecrypted(rsa.decrypt(encrypted));
    setShowEncrypted(false);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  const playSound = () => {
    const audio = new Audio('/sound/click2.mp3');
    audio.play();
  };

  return (
    <div className="w-full flex flex-col justify-between items-center pt-10">
     <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your Message"
        className="p-4 h-[8vh] rounded-full text-black bg-cyan-400 placeholder-black  w-full sm:w-[77vw] md:w-[60vw] lg:w-[65vw]"
      />
      <div className="flex flex-col gap-3 sm:flex-row  mt-4">
        <button
          onClick={handleEncrypt}
          className="text-white w-full  lg:w-[25vw] font-bold py-2 px-14 rounded-full bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
        >
          Encrypt
        </button>
        <button
          onClick={handleDecrypt}
          className="text-white w-full lg:w-[25vw] font-bold py-2 px-14 rounded-full bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
        >
          Decrypt
        </button>
      </div>


      <div className="w-[60vw] p-4 mt-8 text-xl h-auto">
        <p className="mb-3 text-gray-500 dark:text-gray-400 h-auto w-full">
          Original Message: {message || 'No message entered'}
        </p>
        {showEncrypted ? (
          <p className="mb-3 text-gray-500 dark:text-gray-400 h-auto w-full">
            Encrypted: {encrypted || 'No message encrypted'}
          </p>
        ) : (
          <p className="mb-3 text-gray-500 dark:text-gray-400 h-auto w-full">
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
            <p className="text-gray-500 dark:text-gray-400">p: {Number(rsa.p)}</p>
            <p className="text-gray-500 dark:text-gray-400">q: {Number(rsa.q)}</p>
            <p className="text-gray-500 dark:text-gray-400">Public Key (e, n): ({Number(rsa.e)}, {Number(rsa.n)})</p>
          </div>
        )}
      </div>
    </div>
  );
}
