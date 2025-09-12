"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Phone, MapPin, Clock } from "lucide-react"

interface SOSButtonProps {
  onEmergency: () => void
}

export function SOSButton({ onEmergency }: SOSButtonProps) {
  const [isPressed, setIsPressed] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [isActivated, setIsActivated] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsActivated(true)
            onEmergency()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [countdown, onEmergency])

  const handleSOSPress = () => {
    if (!isPressed) {
      setIsPressed(true)
      setCountdown(5) // 5 second countdown
    }
  }

  const handleCancel = () => {
    setIsPressed(false)
    setCountdown(0)
  }

  const handleDeactivate = () => {
    setIsActivated(false)
    setIsPressed(false)
    setCountdown(0)
  }

  if (isActivated) {
    return (
      <Card className="border-red-500 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <AlertTriangle className="h-5 w-5" />
            Emergency Mode Active
          </CardTitle>
          <CardDescription className="text-red-700">Emergency services and contacts have been notified</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-red-500">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Your location is being shared with emergency contacts and authorities. Help is on the way.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white rounded-lg border">
              <Phone className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <p className="text-sm font-semibold">Contacts Notified</p>
              <p className="text-xs text-muted-foreground">3 emergency contacts</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <MapPin className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <p className="text-sm font-semibold">Location Shared</p>
              <p className="text-xs text-muted-foreground">Live tracking active</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border">
              <Clock className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <p className="text-sm font-semibold">Response Time</p>
              <p className="text-xs text-muted-foreground">5-10 minutes</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDeactivate} className="flex-1 bg-transparent">
              Cancel Emergency
            </Button>
            <Button variant="destructive" className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              Call 100 (Police)
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          Emergency SOS
        </CardTitle>
        <CardDescription>Press and hold for 5 seconds to activate emergency mode</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isPressed && countdown > 0 && (
          <Alert className="border-orange-500 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              Emergency will activate in {countdown} seconds. Release to cancel.
            </AlertDescription>
          </Alert>
        )}

        <div className="relative">
          <Button
            size="lg"
            variant="destructive"
            className={`w-32 h-32 rounded-full text-white font-bold text-lg transition-all duration-200 ${
              isPressed ? "scale-110 bg-red-700" : "bg-red-600 hover:bg-red-700"
            }`}
            onMouseDown={handleSOSPress}
            onMouseUp={handleCancel}
            onMouseLeave={handleCancel}
            onTouchStart={handleSOSPress}
            onTouchEnd={handleCancel}
          >
            {isPressed ? countdown : "SOS"}
          </Button>
          {isPressed && <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping" />}
        </div>

        <div className="text-sm text-muted-foreground space-y-1">
          <p>This will:</p>
          <ul className="text-xs space-y-1">
            <li>• Notify all emergency contacts</li>
            <li>• Share your live location</li>
            <li>• Alert local authorities</li>
            <li>• Start audio recording</li>
          </ul>
        </div>

        {isPressed && (
          <Button variant="outline" onClick={handleCancel} className="w-full bg-transparent">
            Cancel Emergency
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
