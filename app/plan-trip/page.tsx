"use client"

import { useState } from "react"
import { TripPlannerForm } from "@/components/trip-planner-form"
import { AIChat } from "@/components/ai-chat"
import { TripResults } from "@/components/trip-results"
import { useLanguage } from "@/contexts/language-context"

export default function PlanTripPage() {
  const [showResults, setShowResults] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [tripData, setTripData] = useState(null)
  const { t } = useLanguage()

  const handlePlanTrip = (formData: any) => {
    setTripData(formData)
    setShowResults(true)
    setShowChat(true)
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-balance">{t("trip.title")}</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">{t("trip.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trip Planner Form */}
          <div className="lg:col-span-2">
            <TripPlannerForm onPlanTrip={handlePlanTrip} />
            {showResults && tripData && <TripResults tripData={tripData} />}
          </div>

          {/* AI Chat Sidebar */}
          <div className="lg:col-span-1">
            <AIChat isVisible={showChat} />
          </div>
        </div>
      </div>
    </div>
  )
}
