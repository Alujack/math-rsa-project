"use client";

import { useState } from "react";
import Link from "next/link";

export default function MessageLayout() {
  const [groups, setGroups] = useState([]); // List of groups
  const [selectedGroup, setSelectedGroup] = useState(null); // Currently selected group
  const [newGroupName, setNewGroupName] = useState(""); // Name for a new group
  const [newFriendName, setNewFriendName] = useState(""); // Name for a new friend to add
  const [newMessage, setNewMessage] = useState(""); // Message to send
  const [showCreateGroupPopup, setShowCreateGroupPopup] = useState(false); // State for showing Create Group popup
  const [showAddFriendPopup, setShowAddFriendPopup] = useState(false); // State for showing Add Friend popup

  // Function to handle creating a new group
  const handleCreateGroup = () => {
    if (newGroupName.trim() === "") {
      alert("Please enter a group name.");
      return;
    }
    setGroups([...groups, { name: newGroupName, friends: [], messages: [] }]);
    setNewGroupName("");
    setShowCreateGroupPopup(false);
  };

  // Function to handle selecting a group
  const handleSelectGroup = (groupName) => {
    setSelectedGroup(groups.find((group) => group.name === groupName));
  };

  // Function to handle adding a friend to the selected group
  const handleAddFriend = () => {
    if (!selectedGroup || newFriendName.trim() === "") {
      alert("Please enter a friend's name.");
      return;
    }
    setGroups(
      groups.map((group) =>
        group.name === selectedGroup.name
          ? { ...group, friends: [...group.friends, newFriendName] }
          : group
      )
    );
    setNewFriendName("");
    setShowAddFriendPopup(false);
  };

  // Function to handle leaving a group
  const handleLeaveGroup = () => {
    if (!selectedGroup) return;
    setGroups(groups.filter((group) => group.name !== selectedGroup.name));
    setSelectedGroup(null);
  };

  // Function to handle sending a message
  const handleSendMessage = () => {
    if (!selectedGroup || newMessage.trim() === "") {
      alert("Please enter a message.");
      return;
    }
    const updatedGroups = groups.map((group) =>
      group.name === selectedGroup.name
        ? { ...group, messages: [...group.messages, newMessage] }
        : group
    );
    setGroups(updatedGroups);
    setSelectedGroup(updatedGroups.find(group => group.name === selectedGroup.name)); // Update selectedGroup with new messages
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4 p-4 bg-gray-800 flex flex-col">
        <h2 className="text-xl font-bold mb-4">Groups</h2>
        <button
          className="bg-teal-500 p-2 rounded mb-4"
          onClick={() => setShowCreateGroupPopup(true)}
        >
          Create New Group
        </button>
        <div className="flex flex-col space-y-2">
          {groups.map((group, index) => (
            <button
              key={index}
              className={`p-2 rounded ${selectedGroup?.name === group.name ? "bg-teal-700" : "bg-gray-700"}`}
              onClick={() => handleSelectGroup(group.name)}
            >
              {group.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="w-full md:w-2/3 lg:w-3/4 p-4 flex-1 bg-gray-700 flex flex-col">
        {selectedGroup ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{selectedGroup.name} Group Chat</h2>
              <div className="flex space-x-2">
                <button
                  className="bg-teal-500 p-2 rounded"
                  onClick={() => setShowAddFriendPopup(true)}
                >
                  Add Friend
                </button>
                <button
                  className="bg-red-500 p-2 rounded"
                  onClick={handleLeaveGroup}
                >
                  Leave Group
                </button>
              </div>
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto bg-gray-800 p-4 rounded mb-4">
              {/* Display messages here */}
              {selectedGroup.messages.length > 0 ? (
                selectedGroup.messages.map((msg, index) => (
                  <div
                    key={index}
                    className="bg-gray-600 p-2 mb-2 rounded-lg border w-2/4 border-gray-500"
                  >
                    {msg}
                  </div>
                ))
              ) : (
                <p>No messages yet.</p>
              )}
            </div>
            <div className="flex items-center space-x-4 mb-4 text-black">
              <input
                type="text"
                placeholder="Write a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 p-2 border rounded"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
              />
              <button
                className="bg-blue-500 p-2 rounded ml-2"
                onClick={handleSendMessage}
              >
                Message
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-xl">Select a group to view chat.</p>
        )}
      </div>

      {/* Create Group Popup */}
      {showCreateGroupPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-black">
            <h2 className="text-xl mb-4">Create New Group</h2>
            <input
              type="text"
              placeholder="Group Name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCreateGroup}
                className="bg-teal-500 text-white px-4 py-2 rounded"
              >
                Create
              </button>
              <button
                onClick={() => setShowCreateGroupPopup(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Friend Popup */}
      {showAddFriendPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-black">
            <h2 className="text-xl mb-4">Add Friend to {selectedGroup?.name}</h2>
            <input
              type="text"
              placeholder="Friend's Name"
              value={newFriendName}
              onChange={(e) => setNewFriendName(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleAddFriend}
                className="bg-teal-500 text-white px-4 py-2 rounded"
              >
                Add Friend
              </button>
              <button
                onClick={() => setShowAddFriendPopup(false)}
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
