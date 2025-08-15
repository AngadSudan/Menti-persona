import { NextRequest } from "next/server";
import { OpenAI } from "openai";
import { PIYUSH_SIR_PROMPT, HITESH_SIR_PROMPT } from "@/lib/prompt";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set in env variables");
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const fallbackMessages = {
  HITESH_SIR:
    "Ruko zara, pehele chai pe aaein. Phir aapke sawalon ka jawab dete hain",
  PIYUSH_SIR: "Bas 2 minute, aata hoon!",
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    userMessage,
    messages,
    currentMentor,
  }: {
    userMessage: string;
    messages: any[];
    currentMentor: "HITESH_SIR" | "PIYUSH_SIR";
  } = body;
  try {
    let currentPrompt =
      currentMentor === "HITESH_SIR" ? HITESH_SIR_PROMPT : PIYUSH_SIR_PROMPT;

    currentPrompt = currentPrompt.replace("{user_message}", userMessage);
    currentPrompt = currentPrompt.replace(
      "{prev_chat}",
      JSON.stringify(messages)
    );

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: currentPrompt },
        { role: "user", content: userMessage },
      ],
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: response.choices[0].message.content,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        success: true,
        message: fallbackMessages[currentMentor],
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  }
}
