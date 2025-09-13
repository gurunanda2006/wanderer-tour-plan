"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { MapPin, Clock, Users, IndianRupee, Sparkles, Loader2 } from "lucide-react"

interface TripPlannerFormProps {
  onPlanTrip: (data: any) => void
}

export function TripPlannerForm({ onPlanTrip }: TripPlannerFormProps) {
  const [formData, setFormData] = useState({
    budget: "",
    destination: "",
    isGroupTrip: false,
    duration: "",
    durationType: "days",
    preferences: "",
  })
  const [isGenerating, setIsGenerating] = useState(false)

  const destinations = [
    "Hyderabad",
    "Warangal",
    "Srisailam",
    "Bhadrachalam",
    "Nizamabad",
    "Karimnagar",
    "Khammam",
    "Mahbubnagar",
    "Nalgonda",
    "Adilabad",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to generate trip plan")
      }

      const data = await response.json()
      onPlanTrip({ ...formData, aiTripPlan: data.tripPlan })
    } catch (error) {
      console.error("Trip generation error:", error)
      // Fallback to basic trip data if AI fails
      onPlanTrip(formData)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Trip Planner
        </CardTitle>
        <CardDescription>Fill in your preferences and let our AI create the perfect itinerary for you</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Budget */}
          <div className="space-y-2">
            <Label htmlFor="budget" className="flex items-center gap-2">
              <IndianRupee className="h-4 w-4" />
              Budget (₹)
            </Label>
            <Input
              id="budget"
              type="number"
              placeholder="Enter your budget in rupees"
              value={formData.budget}
              onChange={(e) => handleInputChange("budget", e.target.value)}
              required
            />
          </div>

          {/* Destination */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Destination
            </Label>
            <Select value={formData.destination} onValueChange={(value) => handleInputChange("destination", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a destination" />
              </SelectTrigger>
              <SelectContent>
                {destinations.map((dest) => (
                  <SelectItem key={dest} value={dest}>
                    {dest}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Trip Type */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Trip Type
            </Label>
            <div className="flex items-center space-x-2">
              <Switch
                id="trip-type"
                checked={formData.isGroupTrip}
                onCheckedChange={(checked) => handleInputChange("isGroupTrip", checked)}
              />
              <Label htmlFor="trip-type">{formData.isGroupTrip ? "Group Trip" : "Solo Trip"}</Label>
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Duration
            </Label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Duration"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                className="flex-1"
                required
              />
              <Select value={formData.durationType} onValueChange={(value) => handleInputChange("durationType", value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="days">Days</SelectItem>
                  <SelectItem value="hours">Hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-2">
            <Label htmlFor="preferences">Special Preferences (Optional)</Label>
            <Textarea
              id="preferences"
              placeholder="Any specific interests? (temples, forts, nature, food, etc.)"
              value={formData.preferences}
              onChange={(e) => handleInputChange("preferences", e.target.value)}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Trip Plan...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Trip Plan
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
