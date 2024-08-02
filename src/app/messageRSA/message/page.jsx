"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showSecondPopup, setShowSecondPopup] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, id: Date.now() }]);
      setInput("");
    }
  };

  const handleInviteClick = () => {
    setShowSecondPopup(true);
  };

  const handleSecondSubmit = () => {
    // Handle submission logic here
    setShowSecondPopup(false);
  };

  return (
    <div className="min-h-screen bg-stone-600 flex flex-col items-center pt-4">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 flex justify-start mb-4">
        <button className="p-3 rounded-lg bg-teal-400 text-white">
          <Link href="../">Back</Link>
        </button>
      </div>

      <div className="flex flex-col w-full max-w-2xl bg-white border border-gray-300 rounded-lg shadow-lg h-[80vh]">
        <div className="w-auto flex justify-end p-2">
          <button
            className="p-3 bg-teal-400 rounded-lg"
            onClick={handleInviteClick}
          >
            Invite
          </button>
        </div>  

        <div className="flex-1 p-4 overflow-auto">
          <div className="space-y-2">
            {messages.map((message) => (
              <div key={message.id} className="bg-gray-200 p-2 rounded-lg">
                {message.text}
              </div>
            ))}
          </div>
        </div>

        <div className="p-2 border-t border-gray-300 bg-white flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg"
            placeholder="Type a message"
          />
          <button
            onClick={handleSend}
            className="ml-2 px-4 py-2 bg-teal-400 text-white rounded-lg"
          >
            Send
          </button>
        </div>
      </div>

      {showSecondPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl mb-4">Add Your Partner</h2>
            <div className="flex justify-end">
              <button
                onClick={handleSecondSubmit}
                className="bg-teal-500 text-white px-4 py-2 rounded mr-2"
              >
                Submit
              </button>
              <button
                onClick={() => setShowSecondPopup(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
