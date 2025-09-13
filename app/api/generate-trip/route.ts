import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { budget, destination, isGroupTrip, duration, durationType, preferences } = await request.json()

    const prompt = `Create a detailed trip plan for Telangana, India with the following requirements:
    - Destination: ${destination}
    - Budget: ₹${budget}
    - Duration: ${duration} ${durationType}
    - Trip Type: ${isGroupTrip ? "Group Trip" : "Solo Trip"}
    - Special Preferences: ${preferences || "General sightseeing"}
    
    Please provide a comprehensive itinerary including:
    1. Day-wise schedule
    2. Must-visit attractions
    3. Food recommendations
    4. Budget breakdown
    5. Transportation tips
    6. Accommodation suggestions
    7. Local cultural insights
    
    Format the response in a structured, easy-to-read manner with clear sections.`

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        "X-Title": "Telangana Tourism Trip Planner",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3.1:free",
        messages: [
          {
            role: "system",
            content:
              "You are an expert travel guide for Telangana, India. You have extensive knowledge about local attractions, culture, food, transportation, and budget travel tips. Provide detailed, practical, and culturally rich travel advice.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`)
    }

    const data = await response.json()
    const tripPlan = data.choices[0]?.message?.content

    if (!tripPlan) {
      throw new Error("No trip plan generated")
    }

    return NextResponse.json({
      success: true,
      tripPlan,
      formData: { budget, destination, isGroupTrip, duration, durationType, preferences },
    })
  } catch (error) {
    console.error("Trip generation error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate trip plan. Please try again.",
      },
      { status: 500 },
    )
  }
}
