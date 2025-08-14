import Image from "next/image";
import React from "react";
import { Message } from "./Chat";

export interface ChatMessage extends Message {
  profile: string;
}

function MessageContent({ message }: { message: string }) {
  const paragraphs = message.split("\n\n");

  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, index) => {
        if (/^\d+\./.test(paragraph.trim())) {
          const listItems = paragraph.split("\n").filter((line) => line.trim());
          return (
            <ol key={index} className="list-decimal list-inside space-y-2 ml-4">
              {listItems.map((item, itemIndex) => (
                <li key={itemIndex} className="text-black leading-relaxed">
                  <span className="ml-2">{item.replace(/^\d+\.\s*/, "")}</span>
                </li>
              ))}
            </ol>
          );
        }

        const processedText = paragraph
          .split("\n")
          .map((line, lineIndex) => {
            if (!line.trim()) return null;

            return (
              <span key={lineIndex} className="block">
                {formatInlineText(line)}
              </span>
            );
          })
          .filter(Boolean);

        return (
          <div key={index} className="text-black leading-relaxed">
            {processedText}
          </div>
        );
      })}
    </div>
  );
}

function formatInlineText(text: string) {
  const parts = text.split("`");

  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <code
          key={index}
          className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-sm font-mono border border-amber-200"
        >
          {part}
        </code>
      );
    }

    return processTextFormatting(part, index);
  });
}

function processTextFormatting(text: string, key: number) {
  const processedText = text.replace(/😎/g, " 😎").replace(/—/g, " — ").trim();

  if (processedText.includes("**")) {
    const boldParts = processedText.split("**");
    return (
      <span key={key}>
        {boldParts.map((part, index) =>
          index % 2 === 1 ? (
            <strong key={index} className="font-semibold text-amber-800">
              {part}
            </strong>
          ) : (
            part
          )
        )}
      </span>
    );
  }

  return <span key={key}>{processedText}</span>;
}

export interface ChatMessage extends Message {
  profile: string;
}

function MessageBox({ role, message, profile }: ChatMessage) {
  const isUser = role === "USER";

  return (
    <div
      className={`flex w-full py-6 px-4 ${
        isUser ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`flex max-w-[85%] gap-4 ${
          isUser ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-200 via-yellow-300 to-amber-400 p-0.5 shadow-lg">
            <div className="w-full h-full rounded-full bg-white p-0.5">
              <Image
                src={profile}
                width={44}
                height={44}
                className="w-full h-full rounded-full object-cover border border-amber-200"
                alt="profile-pic"
              />
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full border-2 border-white shadow-sm">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-200 to-amber-300 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className={`relative text-justify`}>
          <div
            className={`relative bg-white text-black px-6 py-4 rounded-2xl shadow-lg border border-amber-100 ${
              isUser
                ? "rounded-tl-sm before:absolute before:-left-2 before:top-4 before:w-0 before:h-0 before:border-t-8 before:border-t-transparent before:border-r-8 before:border-r-white before:border-b-8 before:border-b-transparent after:absolute after:-left-2.5 after:top-4 after:w-0 after:h-0 after:border-t-8 after:border-t-transparent after:border-r-8 after:border-r-amber-100 after:border-b-8 after:border-b-transparent"
                : "rounded-tr-sm before:absolute before:-right-2 before:top-4 before:w-0 before:h-0 before:border-t-8 before:border-t-transparent before:border-l-8 before:border-l-white before:border-b-8 before:border-b-transparent after:absolute after:-right-2.5 after:top-4 after:w-0 after:h-0 after:border-t-8 after:border-t-transparent after:border-l-8 after:border-l-amber-100 after:border-b-8 after:border-b-transparent"
            }`}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-50 via-transparent to-yellow-50 opacity-30 pointer-events-none"></div>

            <div className="relative z-10 text-black leading-relaxed font-medium">
              <MessageContent message={message as string} />
            </div>

            <div
              className={`absolute ${
                isUser ? "top-2 right-2" : "top-2 left-2"
              } w-2 h-2 bg-gradient-to-br from-amber-300 to-yellow-400 rounded-full opacity-60`}
            ></div>
            <div
              className={`absolute ${
                isUser ? "bottom-2 right-2" : "bottom-2 left-2"
              } w-1.5 h-1.5 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-full opacity-40`}
            ></div>
          </div>

          <div
            className={`mt-2 text-xs text-gray-500 font-light ${
              isUser ? "text-left" : "text-right"
            }`}
          >
            {new Date().toLocaleString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageBox;
