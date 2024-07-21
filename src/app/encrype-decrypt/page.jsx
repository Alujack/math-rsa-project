"use client"

import { useState } from 'react';

export default function HomePage() {
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');

  const handleEncrypt = () => {
    // Add encryption logic here
    const encrypted = message.toUpperCase().split('').map((char) => char.charCodeAt(0)-64).join(' ');
    setEncryptedMessage(encrypted);
  };

  const handleDecrypt = () => {
    // Add decryption logic here
    const decrypted = encryptedMessage.split(' ').map((code) => String.fromCharCode(code)).join('');
    setMessage(decrypted);
  };

  return (
    <div className=" w-full flex flex-col justify-between items-center pt-5">  
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Message"
          className="size-[2.5vh] p-4 w-[55vw] h-[8vh] rounded-full text-black bg-cyan-400 placeholder-black"
        />
    
      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleEncrypt}
          className="text-white w-[23vw] font-bold py-2 px-14 rounded-full bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
        >
          Encrypt
        </button>
        <button
          onClick={handleDecrypt}
          className="text-white w-[23vw] font-bold py-2 px-14 rounded-full bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
        >
          Decrypt
        </button>
      </div>
      <div className="mt-8 text-xl">
        <p>Original Message: {message}</p>
        <p>Encrypt to: {encryptedMessage}</p>
        <a href="#" className="text-blue-500">View Detail</a>
      </div>
      <footer className="mt-8 text-center text-xl">
   
        <p>RSA Encryption and Decryption : Group 05</p>
           <p>YOEURN YAN</p>
           <p>PHAN SOVANARITH</p>
           <p>RAN FIDINAN</p>
           <p>YOUNG SOKHEANG</p>         
           <p>RA PHEAROM</p>
      </footer>
      </div>
  );
}
