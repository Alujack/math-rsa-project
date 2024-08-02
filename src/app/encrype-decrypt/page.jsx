"use client";

import { useState } from "react";
import RSA from "@/libs/rsaEcryptDecript";
import Link from "next/link";

export default function HomePage() {
  const [message, setMessage] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");
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
    const audio = new Audio("/sound/click2.mp3");
    audio.play();
  };

  return (
    <div className="banner-rsa min-h-screen bg-gray-100 flex flex-col items-center pt-4">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 flex justify-start">
        <button className="p-3 rounded-lg p-2 bg-teal-400 text-white">
          <Link href="../">Back</Link>
        </button>
      </div>
      <div className="w-11/12 max-w-md mx-auto flex flex-col items-center pt-10">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Message"
          className="p-4 rounded-full text-black bg-cyan-400 placeholder-black w-full"
        />
        <div className="flex flex-col gap-3 sm:flex-row mt-4 w-full">
          <button
            onClick={handleEncrypt}
            className="text-white w-full sm:w-auto font-bold py-2 px-6 sm:px-8 md:px-10 lg:px-12 rounded-full bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
          >
            Encrypt
          </button>
          <button
            onClick={handleDecrypt}
            className="text-white w-full sm:w-auto font-bold py-2 px-6 sm:px-8 md:px-10 lg:px-12 rounded-full bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
          >
            Decrypt
          </button>
        </div>

        <div className="w-full p-4 mt-8 text-xl">
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
            <div className="mt-4 text-gray-500">
              <p>p: {Number(rsa.p)}</p>
              <p>q: {Number(rsa.q)}</p>
              <p>
                Public Key (e, n): ({Number(rsa.e)}, {Number(rsa.n)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
