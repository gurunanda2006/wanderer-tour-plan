"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Monitor, Moon, Sun, Palette } from "lucide-react"

export function ThemeSettings() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const themes = [
    {
      name: "Light",
      value: "light",
      icon: Sun,
      description: "Clean and bright interface",
    },
    {
      name: "Dark",
      value: "dark",
      icon: Moon,
      description: "Easy on the eyes in low light",
    },
    {
      name: "System",
      value: "system",
      icon: Monitor,
      description: "Follows your device settings",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          Theme Settings
        </CardTitle>
        <CardDescription>Choose your preferred theme for the best viewing experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Theme Status */}
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div>
            <p className="font-medium">Current Theme</p>
            <p className="text-sm text-muted-foreground">{theme === "system" ? `System (${resolvedTheme})` : theme}</p>
          </div>
          <Badge variant="outline" className="capitalize">
            {resolvedTheme}
          </Badge>
        </div>

        {/* Theme Options */}
        <div className="space-y-3">
          <h3 className="font-medium">Choose Theme</h3>
          <div className="grid gap-3">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon
              const isActive = theme === themeOption.value

              return (
                <Button
                  key={themeOption.value}
                  variant={isActive ? "default" : "outline"}
                  className="justify-start h-auto p-4"
                  onClick={() => setTheme(themeOption.value)}
                >
                  <div className="flex items-center gap-3 w-full">
                    <Icon className="h-5 w-5" />
                    <div className="text-left flex-1">
                      <div className="font-medium">{themeOption.name}</div>
                      <div className="text-sm opacity-70">{themeOption.description}</div>
                    </div>
                    {isActive && (
                      <Badge variant="secondary" className="ml-auto">
                        Active
                      </Badge>
                    )}
                  </div>
                </Button>
              )
            })}
          </div>
        </div>

        {/* Theme Preview */}
        <div className="space-y-3">
          <h3 className="font-medium">Preview</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border bg-background">
              <div className="space-y-2">
                <div className="h-2 bg-primary rounded w-3/4"></div>
                <div className="h-2 bg-muted rounded w-1/2"></div>
                <div className="h-2 bg-muted rounded w-2/3"></div>
              </div>
            </div>
            <div className="p-3 rounded-lg border bg-card">
              <div className="space-y-2">
                <div className="h-2 bg-foreground rounded w-3/4"></div>
                <div className="h-2 bg-muted-foreground rounded w-1/2"></div>
                <div className="h-2 bg-muted-foreground rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
