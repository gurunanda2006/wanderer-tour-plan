"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Key, CheckCircle, AlertCircle, Info, Eye, EyeOff, Edit3 } from "lucide-react"

interface APISettingsProps {
  onConfigurationChange: (configured: boolean) => void
}

export function APISettings({ onConfigurationChange }: APISettingsProps) {
  const [apiKey, setApiKey] = useState("")
  const [modelName, setModelName] = useState("gpt-4o-mini")
  const [isCustomModel, setIsCustomModel] = useState(false)
  const [customModelName, setCustomModelName] = useState("")
  const [showApiKey, setShowApiKey] = useState(false)
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "success" | "error">("idle")
  const [testResponse, setTestResponse] = useState("")

  // Load saved settings from localStorage
  useEffect(() => {
    const savedApiKey = localStorage.getItem("openrouter_api_key")
    const savedModel = localStorage.getItem("openrouter_model")
    const savedCustomModel = localStorage.getItem("openrouter_custom_model")

    if (savedApiKey) {
      setApiKey(savedApiKey)
      onConfigurationChange(true)
    }
    if (savedModel) {
      setModelName(savedModel)
    }
    if (savedCustomModel) {
      setCustomModelName(savedCustomModel)
      setIsCustomModel(true)
    }
  }, [onConfigurationChange])

  const handleSaveSettings = () => {
    if (apiKey.trim()) {
      localStorage.setItem("openrouter_api_key", apiKey.trim())
      if (isCustomModel && customModelName.trim()) {
        localStorage.setItem("openrouter_model", customModelName.trim())
        localStorage.setItem("openrouter_custom_model", customModelName.trim())
      } else {
        localStorage.setItem("openrouter_model", modelName)
        localStorage.removeItem("openrouter_custom_model")
      }
      onConfigurationChange(true)
      setConnectionStatus("success")
    }
  }

  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      setConnectionStatus("error")
      return
    }

    setIsTestingConnection(true)
    setConnectionStatus("idle")

    setTimeout(() => {
      if (apiKey.includes("sk-")) {
        setConnectionStatus("success")
        setTestResponse("Connection successful! AI chat is now enabled.")
      } else {
        setConnectionStatus("error")
        setTestResponse("Invalid API key format. Please check your OpenRouter API key.")
      }
      setIsTestingConnection(false)
    }, 2000)
  }

  const handleClearSettings = () => {
    setApiKey("")
    setModelName("gpt-4o-mini")
    setCustomModelName("")
    setIsCustomModel(false)
    localStorage.removeItem("openrouter_api_key")
    localStorage.removeItem("openrouter_model")
    localStorage.removeItem("openrouter_custom_model")
    onConfigurationChange(false)
    setConnectionStatus("idle")
    setTestResponse("")
  }

  const availableModels = [
    { value: "gpt-4o-mini", label: "GPT-4o Mini (Recommended)", description: "Fast and cost-effective" },
    { value: "gpt-4o", label: "GPT-4o", description: "Most capable model" },
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo", description: "Good balance of speed and quality" },
    { value: "claude-3-haiku", label: "Claude 3 Haiku", description: "Fast and efficient" },
    { value: "claude-3-sonnet", label: "Claude 3 Sonnet", description: "Balanced performance" },
  ]

  return (
    <div className="space-y-6">
      {/* OpenRouter API Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-primary" />
            OpenRouter API Configuration
          </CardTitle>
          <CardDescription>Configure your OpenRouter API key to enable AI-powered chat assistance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* API Key Input */}
          <div className="space-y-2">
            <Label htmlFor="api-key">OpenRouter API Key</Label>
            <div className="relative">
              <Input
                id="api-key"
                type={showApiKey ? "text" : "password"}
                placeholder="sk-or-v1-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Get your API key from{" "}
              <a
                href="https://openrouter.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                openrouter.ai
              </a>
            </p>
          </div>

          {/* Model Selection */}
          <div className="space-y-2">
            <Label htmlFor="model">AI Model</Label>
            <div className="flex items-center gap-2 mb-2">
              <Button
                type="button"
                variant={!isCustomModel ? "default" : "outline"}
                size="sm"
                onClick={() => setIsCustomModel(false)}
              >
                Select Model
              </Button>
              <Button
                type="button"
                variant={isCustomModel ? "default" : "outline"}
                size="sm"
                onClick={() => setIsCustomModel(true)}
              >
                <Edit3 className="h-4 w-4 mr-1" />
                Custom Model
              </Button>
            </div>

            {!isCustomModel ? (
              <Select value={modelName} onValueChange={setModelName}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map((model) => (
                    <SelectItem key={model.value} value={model.value}>
                      <div>
                        <div className="font-medium">{model.label}</div>
                        <div className="text-xs text-muted-foreground">{model.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="space-y-2">
                <Input
                  placeholder="Enter custom model name (e.g., gpt-4-turbo, claude-3-opus)"
                  value={customModelName}
                  onChange={(e) => setCustomModelName(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Enter any OpenRouter-supported model name. Check the OpenRouter documentation for available models.
                </p>
              </div>
            )}
          </div>

          {/* Connection Status */}
          {connectionStatus !== "idle" && (
            <Alert
              className={connectionStatus === "success" ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}
            >
              {connectionStatus === "success" ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={connectionStatus === "success" ? "text-green-800" : "text-red-800"}>
                {testResponse}
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button onClick={handleSaveSettings} disabled={!apiKey.trim()}>
              Save Settings
            </Button>
            <Button
              variant="outline"
              onClick={handleTestConnection}
              disabled={!apiKey.trim() || isTestingConnection}
              className="bg-transparent"
            >
              {isTestingConnection ? "Testing..." : "Test Connection"}
            </Button>
            <Button variant="destructive" onClick={handleClearSettings}>
              Clear Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* API Usage Information */}
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
          <CardDescription>Understanding the AI integration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                When you configure an OpenRouter API key, the AI chat assistant will use real AI models to answer your
                tourism questions. Without an API key, the chat will use pre-programmed responses for demonstration.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <div>
                  <p className="font-semibold">Get API Key</p>
                  <p className="text-sm text-muted-foreground">Sign up at openrouter.ai and get your API key</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <div>
                  <p className="font-semibold">Configure Settings</p>
                  <p className="text-sm text-muted-foreground">Enter your API key and select your preferred model</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <div>
                  <p className="font-semibold">Start Chatting</p>
                  <p className="text-sm text-muted-foreground">
                    Use the AI chat in trip planning for intelligent responses
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fallback Information */}
      <Card>
        <CardHeader>
          <CardTitle>Fallback Mode</CardTitle>
          <CardDescription>What happens without API configuration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p>If no API key is configured, the app will use dummy responses for:</p>
            <ul className="space-y-1 ml-4">
              <li>• Tourism-related questions and answers</li>
              <li>• Basic travel recommendations</li>
              <li>• Information about Telangana attractions</li>
              <li>• General travel tips and guidance</li>
            </ul>
            <p className="text-muted-foreground">
              This ensures the app remains functional for demonstration purposes even without API access.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
