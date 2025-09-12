"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

interface AIChatProps {
  isVisible: boolean
}

export function AIChat({ isVisible }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI travel assistant. I can help you with questions about Telangana tourism, travel tips, and planning your perfect trip. What would you like to know?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Dummy responses for demo (will be replaced with OpenRouter API)
  const dummyResponses = {
    "what do you mean by tourism":
      "Tourism refers to the activity of traveling to and staying in places outside your usual environment for leisure, business, or other purposes. In Telangana, tourism showcases our rich cultural heritage, ancient temples, historic forts, and natural beauty.",
    "best places to visit":
      "Some must-visit places in Telangana include Charminar and Golconda Fort in Hyderabad, the ancient Warangal Fort, the sacred Srisailam Temple, and the beautiful Bhadrachalam Temple. Each offers unique historical and cultural experiences.",
    "food recommendations":
      "Don't miss trying authentic Hyderabadi Biryani, Haleem, Qubani ka Meetha, and traditional Telangana dishes like Sarva Pindi and Jonna Rotte. Paradise and Bawarchi are famous restaurants for biryani.",
    "budget travel tips":
      "For budget travel in Telangana: Use public transport, stay in government guest houses, eat at local dhabas, visit free temples and monuments, and travel during off-season for better deals.",
    default:
      "That's an interesting question! Based on my knowledge of Telangana tourism, I'd recommend exploring our heritage sites, trying local cuisine, and experiencing the warm hospitality. Is there a specific aspect of your trip you'd like help with?",
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const lowerInput = inputMessage.toLowerCase()
      let response = dummyResponses.default

      // Simple keyword matching for demo
      for (const [key, value] of Object.entries(dummyResponses)) {
        if (lowerInput.includes(key)) {
          response = value
          break
        }
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  if (!isVisible) {
    return (
      <Card className="sticky top-24">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            AI Travel Assistant
          </CardTitle>
          <CardDescription>Plan your trip and get instant answers about Telangana tourism</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            Start planning your trip to activate the AI chat assistant
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="sticky top-24 h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          AI Travel Assistant
        </CardTitle>
        <CardDescription>Ask me anything about your Telangana trip</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {message.content}
                </div>
                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-secondary" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 text-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-current rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-current rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Ask about places, food, budget tips..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <Button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
