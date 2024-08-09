"use client";

import { useState } from "react";
import RSA from "@/libs/rsaEcryptDecript";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [message, setMessage] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [showEncrypted, setShowEncrypted] = useState(true);
  const [p, setP] = useState(""); // State for p
  const [q, setQ] = useState(""); // State for q
  const router = useRouter();

  // Function to check if a number is prime
  const isPrime = (num) => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    let i = 5;
    while (i * i <= num) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
      i += 6;
    }
    return true;
  };

  // Create RSA instance only if p and q are set and are prime
  const rsaInstance = (p && q && isPrime(parseInt(p)) && isPrime(parseInt(q))) ? 
    new RSA(parseInt(p), parseInt(q)) : null;

  const handleEncrypt = () => {
    if (rsaInstance) {
      playSound();
      setEncrypted(rsaInstance.encrypt(message));
      setShowEncrypted(true);
    } else {
      alert("Please enter valid prime values for p and q.");
    }
  };

  const handleDecrypt = () => {
    if (rsaInstance) {
      playSound();
      setDecrypted(rsaInstance.decrypt(encrypted));
      setShowEncrypted(false);
    } else {
      alert("Please enter valid prime values for p and q.");
    }
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const playSound = () => {
    const audio = new Audio("/sound/click2.mp3");
    audio.play();
  };

  return (
    <div className="banner-rsa min-h-screen flex flex-col items-center pt-4 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="w-full flex justify-start mb-4">
        <button onClick={() => router.back()} className="p-3 rounded-lg bg-violet-600 text-white">
          Back
        </button>
      </div>
      <div className="w-full max-w-md mx-auto flex flex-col items-center p-6 sm:p-8 md:p-10 lg:p-12 border border shadow-md rounded-lg">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Message"
          className="p-4 rounded-lg text-black placeholder-black w-full"
        />
        <div className="flex flex-col gap-3 sm:flex-row mt-4 w-full">
          <input
            type="number"
            value={p}
            onChange={(e) => setP(e.target.value)}
            placeholder="Enter value for p"
            className="p-4 rounded-lg text-black placeholder-black w-full"
          />
          <input
            type="number"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Enter value for q"
            className="p-4 rounded-lg text-black placeholder-black w-full"
          />
        </div>
        <div className="flex justify-between gap-3 sm:flex-row mt-4 w-full">
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

        <div className="w-full mt-8 text-xl">
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
          {showDetails && rsaInstance && (
            <div className="mt-4 text-gray-500">
              <p>p: {p || "No value for p"}</p>
              <p>q: {q || "No value for q"}</p>
              <p>
                Public Key (e, n): ({rsaInstance.e.toString()}, {rsaInstance.n.toString()})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
