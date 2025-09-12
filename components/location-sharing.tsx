"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MapPin, Users, Clock, Navigation, Info } from "lucide-react"

interface LocationSharingProps {
  isEnabled: boolean
  onToggle: (enabled: boolean) => void
}

export function LocationSharing({ isEnabled, onToggle }: LocationSharingProps) {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [sharedContacts, setSharedContacts] = useState([
    { name: "Family Group", members: 3, status: "active" },
    { name: "Travel Buddy", members: 1, status: "active" },
  ])

  useEffect(() => {
    if (isEnabled) {
      getCurrentLocation()
    }
  }, [isEnabled])

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setLocationError(null)
        },
        (error) => {
          setLocationError("Unable to access location. Please enable location permissions.")
        },
      )
    } else {
      setLocationError("Geolocation is not supported by this browser.")
    }
  }

  return (
    <div className="space-y-6">
      {/* Location Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Live Location Sharing
          </CardTitle>
          <CardDescription>Share your real-time location with trusted contacts for safety</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {locationError && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>{locationError}</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-semibold">Location Sharing Status</h3>
              <p className="text-sm text-muted-foreground">
                {isEnabled ? "Your location is being shared" : "Location sharing is disabled"}
              </p>
              {currentLocation && isEnabled && (
                <p className="text-xs text-muted-foreground mt-1">Last updated: {new Date().toLocaleTimeString()}</p>
              )}
            </div>
            <div className="text-right">
              <Badge variant={isEnabled ? "default" : "secondary"}>{isEnabled ? "Active" : "Inactive"}</Badge>
              <div className="mt-2">
                <Button variant={isEnabled ? "destructive" : "default"} size="sm" onClick={() => onToggle(!isEnabled)}>
                  {isEnabled ? "Stop Sharing" : "Start Sharing"}
                </Button>
              </div>
            </div>
          </div>

          {isEnabled && currentLocation && (
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2">Current Location</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Latitude: {currentLocation.lat.toFixed(6)}</p>
                <p>Longitude: {currentLocation.lng.toFixed(6)}</p>
                <p>Accuracy: ±10 meters</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Shared With */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Sharing With
          </CardTitle>
          <CardDescription>Contacts who can see your live location</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sharedContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h3 className="font-semibold">{contact.name}</h3>
                  <p className="text-sm text-muted-foreground">{contact.members} member(s)</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={contact.status === "active" ? "default" : "secondary"}>
                    {contact.status === "active" ? "Sharing" : "Paused"}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent">
              <Users className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Location History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Recent Locations
          </CardTitle>
          <CardDescription>Your location history for the past 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { place: "Charminar", time: "2 hours ago", type: "Tourist Attraction" },
              { place: "Paradise Restaurant", time: "4 hours ago", type: "Restaurant" },
              { place: "Golconda Fort", time: "6 hours ago", type: "Tourist Attraction" },
              { place: "Hotel Taj Krishna", time: "12 hours ago", type: "Accommodation" },
            ].map((location, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Navigation className="h-4 w-4 text-primary" />
                  <div>
                    <h3 className="font-semibold text-sm">{location.place}</h3>
                    <p className="text-xs text-muted-foreground">{location.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{location.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
