"use client";
import Image from "next/image";
import React, { useState } from "react";

function PromptBar({
  messages,
  setMessages,
  currentProfile,
  changeMentor,
}: any) {
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (userInput.trim()) {
      setMessages([...messages, { role: "USER", message: userInput }]);
      setUserInput("");
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full bg-white border-t border-amber-100 shadow-lg">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          {/* Profile Section */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-200 via-yellow-300 to-amber-400 p-0.5 shadow-lg">
                <div className="w-full h-full rounded-full bg-white p-0.5">
                  <Image
                    src={currentProfile}
                    width={44}
                    height={44}
                    className="w-full h-full rounded-full object-cover border border-amber-200"
                    alt="current-mentor-profile"
                  />
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full border-2 border-white shadow-sm">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-200 to-amber-300 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                </div>
              </div>
            </div>

            <select
              name="mentor"
              id="mentor"
              onChange={(e) => changeMentor(e.target.value)}
              className="bg-white text-black border-2 border-amber-200 rounded-lg px-3 py-2 text-sm font-medium shadow-sm hover:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 cursor-pointer"
            >
              <option value="HITESH_SIR">Hitesh Sir</option>
              <option value="PIYUSH_SIR">Piyush Sir</option>
            </select>
          </div>

          <div className="flex-1 relative">
            <div className="relative bg-white border-2 border-amber-200 rounded-xl shadow-sm hover:border-amber-300 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-200 transition-all duration-200">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-50 via-transparent to-yellow-50 opacity-30 pointer-events-none"></div>

              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask your mentor anything..."
                className="relative z-10 w-full px-4 py-3 bg-transparent text-black placeholder-gray-500 resize-none outline-none rounded-xl font-medium leading-relaxed min-h-[50px] max-h-32"
                rows={1}
                style={{
                  height: "auto",
                  minHeight: "50px",
                }}
                onInput={(e: any) => {
                  e.target.style.height = "auto";
                  e.target.style.height =
                    Math.min(e.target.scrollHeight, 128) + "px";
                }}
              />

              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-gradient-to-br from-amber-300 to-yellow-400 rounded-full opacity-50"></div>
              <div className="absolute bottom-2 right-2 w-1 h-1 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-full opacity-40"></div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!userInput.trim()}
            className="flex-shrink-0 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl disabled:shadow-sm transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed group"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">Send</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
          </button>
        </form>

        <div className="mt-2 text-xs text-gray-500 text-center">
          Press{" "}
          <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-mono">
            Enter
          </kbd>{" "}
          to send,
          <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs font-mono ml-1">
            Shift + Enter
          </kbd>{" "}
          for new line
        </div>
      </div>
    </div>
  );
}

export default PromptBar;
