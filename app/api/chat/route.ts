import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "Wanderer Tourism Chat",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3.1:free",
        messages: [
          {
            role: "system",
            content: `You are a helpful tourism assistant for Telangana, India. You specialize in:
            - Tourist attractions and destinations in Telangana
            - Travel planning and itineraries
            - Local culture, food, and traditions
            - Transportation and accommodation recommendations
            - Historical and cultural significance of places
            - Best times to visit different locations
            - Local festivals and events
            
            Always provide accurate, helpful information about Telangana tourism. Be friendly and enthusiastic about helping travelers discover the beauty of Telangana.`,
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 1000,
        stream: false,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json({ message: data.choices[0].message.content })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to get response from AI assistant" }, { status: 500 })
  }
}
