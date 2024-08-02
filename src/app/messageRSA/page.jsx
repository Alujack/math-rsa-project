"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [showPopup, setShowPopup] = useState(false);
  const [showSecondPopup, setShowSecondPopup] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [secondInputValue, setSecondInputValue] = useState("");
  const [groupNames, setGroupNames] = useState([]);  // State to store group names

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSecondInputValue("");
  };

  const handleSubmit = () => {
    if (inputValue.trim() === "") {
      alert("Please enter a group name.");
      return;
    }
    setGroupNames([inputValue, ...groupNames]); // Add new group name to the list
    handleClosePopup();
  };

  const handleInviteClick = () => {
    setShowPopup(false);
    setShowSecondPopup(true);
  };

  const handleSecondSubmit = () => {
    console.log("Second submitted value:", secondInputValue);
    setShowSecondPopup(false);
  };

  return (
    <div className="banner-message">
      <div className="container">
        <button className="rounded-xl m-2 p-3 bg-teal-400">
          <Link href="../">Back</Link>
        </button>
        <h1 className="banner-title">Message - RSA</h1>
        <div className="container-color rounded-t-2xl py-2">
          <div className="flex flex-col h-[700px] rounded-t-xl mx-4 h-auto bg-stone-600 overflow-auto">
            {groupNames.map((name, index) => (
              <div key={index} className="p-2 border m-3 flex justify-between">
                {name}
                <button><Link href="/messageRSA/message">Chat</Link></button>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center">
            <div
              className="banner-button rounded-full w-16 h-16 p-3 bg-teal-400 flex items-center justify-center cursor-pointer"
              onClick={handleButtonClick}
            >
              <button className="text-2xl font-bold">+</button>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl mb-4">Enter Group Name</h2>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              placeholder="Type your group name here"
            />
            <button
              className="p-3 bg-teal-400 rounded-lg"
              onClick={handleInviteClick}
            >
              Invite
            </button>
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-teal-500 text-white px-4 py-2 rounded mr-2"
              >
                Submit
              </button>
              <button
                onClick={handleClosePopup}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
