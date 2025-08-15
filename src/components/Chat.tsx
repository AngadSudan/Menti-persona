"use client";
import React, { useState, useEffect, useRef } from "react";
import PromptBar from "./PromptBar";
import MessageBox from "./MessageBox";
import axios from "axios";
export interface Message {
  role: "HITESH_SIR" | "PIYUSH_SIR" | "USER";
  message: String;
  timestamp?: Date;
  id?: string;
}

function getProfile(role: string): string {
  switch (role) {
    case "HITESH_SIR":
      return "https://avatars.githubusercontent.com/u/11613311?v=4";
    case "PIYUSH_SIR":
      return "https://avatars.githubusercontent.com/u/44976328?v=4";
    case "USER":
      return "https://imgs.search.brave.com/7XKV5ppMMzcehc7v2V9P8mPHJTh4XXXy5n3fDHhdxps/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvNTAwcC80/MS85MC9hdmF0YXIt/ZGVmYXVsdC11c2Vy/LXByb2ZpbGUtaWNv/bi1zaW1wbGUtZmxh/dC12ZWN0b3ItNTcy/MzQxOTAuanBn";
  }
  return "";
}

function getMentorName(role: string): string {
  switch (role) {
    case "HITESH_SIR":
      return "Hitesh";
    case "PIYUSH_SIR":
      return "Piyush";
    default:
      return "Mentor";
  }
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "HITESH_SIR",
      message: "Hi There, its Hitesh! How's it going",
      timestamp: new Date(),
      id: "welcome-1",
    },
  ]);
  const [currentMentor, setCurrentMentor] = useState("HITESH_SIR");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const simulateMentorResponse = async (userMessage: string) => {
    setIsTyping(true);
    const response = await axios.post("/generate", {
      userMessage,
      messages,
      currentMentor,
    });

    console.log(response);

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: currentMentor as "HITESH_SIR" | "PIYUSH_SIR" | "USER",
        message: response.data.message.replaceAll("\\n"),
      },
    ]);
    setIsTyping(false);
  };

  const handleNewMessage = (newMessages: Message[]) => {
    const latestMessage = newMessages[newMessages.length - 1];
    setMessages(newMessages);

    if (latestMessage.role === "USER") {
      simulateMentorResponse(latestMessage.message as string);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: currentMentor as "HITESH_SIR" | "PIYUSH_SIR",
        message: `Hi There ! I'm ${getMentorName(
          currentMentor
        )} Let's get it going?`,
        timestamp: new Date(),
        id: `clear-${Date.now()}`,
      },
    ]);
  };

  const handleMentorChange = (newMentor: string) => {
    setCurrentMentor(newMentor);

    setMessages(() => [
      {
        role: newMentor as "HITESH_SIR" | "PIYUSH_SIR",
        message: `Hi! I'm ${getMentorName(
          newMentor
        )}. I'm here now to assist you. How can I help?`,
        timestamp: new Date(),
        id: `mentor-change-${Date.now()}`,
      },
    ]);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-white">
      <div className="flex-shrink-0 bg-white border-b-2 border-amber-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-200 via-yellow-300 to-amber-400 p-0.5 shadow-lg">
                  <div className="w-full h-full rounded-full bg-white p-0.5">
                    <img
                      src={getProfile(currentMentor)}
                      className="w-full h-full rounded-full object-cover border border-amber-200"
                      alt="current-mentor"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {getMentorName(currentMentor)}
                </h2>
                <p className="text-sm text-gray-600">
                  {isTyping ? (
                    <span className="flex items-center gap-1">
                      <span className="flex gap-1">
                        <span className="w-1 h-1 bg-amber-500 rounded-full animate-bounce"></span>
                        <span
                          className="w-1 h-1 bg-amber-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></span>
                        <span
                          className="w-1 h-1 bg-amber-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></span>
                      </span>
                      <span className="ml-1">typing...</span>
                    </span>
                  ) : (
                    "Online • Ready to help"
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                {messages.length} messages
              </div>

              <button
                onClick={clearChat}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-amber-700 bg-amber-100 hover:bg-amber-200 rounded-lg border border-amber-300 transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Clear Chat
              </button>

              <div>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/AngadSudan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/angadsudan/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto scroll-smooth"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#F59E0B #FEF3C7",
        }}
      >
        <div className="max-w-4xl mx-auto px-4">
          {messages.length <= 1 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-200 to-yellow-300 rounded-full shadow-lg mb-4">
                <svg
                  className="w-8 h-8 text-amber-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Welcome to Chai Mentorship
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Start a conversation with your mentor. Ask questions, seek
                guidance, or discuss any topic you'd like to explore.
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <MessageBox
              key={message.id || index}
              role={message.role}
              message={message.message}
              profile={getProfile(message.role)}
            />
          ))}

          {isTyping && (
            <div className="flex justify-start py-4 px-4">
              <div className="flex items-center gap-4 max-w-[85%]">
                <div className="bg-white rounded-2xl px-6 py-4 shadow-lg border border-amber-100 rounded-tr-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <span className="text-sm">
                      {getMentorName(currentMentor)} is typing
                    </span>
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></span>
                      <span
                        className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></span>
                    </div>
                  </div>
                </div>
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 via-yellow-300 to-amber-400 p-0.5 shadow-md">
                    <img
                      src={getProfile(currentMentor)}
                      className="w-full h-full rounded-full object-cover"
                      alt="mentor-typing"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="flex-shrink-0">
        <PromptBar
          messages={messages}
          currentProfile={getProfile(currentMentor)}
          changeMentor={handleMentorChange}
          setMessages={handleNewMessage}
        />
      </div>

      <style jsx>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #fef3c7;
          border-radius: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #f59e0b;
          border-radius: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #d97706;
        }
      `}</style>
    </div>
  );
}

export default Chat;
