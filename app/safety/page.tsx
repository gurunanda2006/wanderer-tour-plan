"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, MapPin, Phone, AlertTriangle } from "lucide-react"
import { LocationSharing } from "@/components/location-sharing"
import { EmergencyContacts } from "@/components/emergency-contacts"
import { SOSButton } from "@/components/sos-button"
import { SafetyTips } from "@/components/safety-tips"
import { useLanguage } from "@/contexts/language-context"

export default function SafetyPage() {
  const [locationSharingEnabled, setLocationSharingEnabled] = useState(false)
  const [sosEnabled, setSOSEnabled] = useState(false)
  const [emergencyMode, setEmergencyMode] = useState(false)
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-balance">{t("safety.title")}</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">{t("safety.subtitle")}</p>
        </div>

        {/* Emergency Alert */}
        {emergencyMode && (
          <Alert className="mb-6 border-red-500 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Emergency mode is active. Your location is being shared with emergency contacts and authorities.
            </AlertDescription>
          </Alert>
        )}

        {/* Quick Safety Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-primary" />
                {t("safety.locationSharing")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Share live location</p>
                  <Badge variant={locationSharingEnabled ? "default" : "secondary"} className="mt-1">
                    {locationSharingEnabled ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <Switch checked={locationSharingEnabled} onCheckedChange={setLocationSharingEnabled} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="h-5 w-5 text-primary" />
                {t("safety.sosButton")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Quick emergency alert</p>
                  <Badge variant={sosEnabled ? "default" : "secondary"} className="mt-1">
                    {sosEnabled ? "Ready" : "Disabled"}
                  </Badge>
                </div>
                <Switch checked={sosEnabled} onCheckedChange={setSOSEnabled} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Phone className="h-5 w-5 text-primary" />
                {t("safety.emergencyContacts")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">3</div>
                <p className="text-sm text-muted-foreground">Contacts added</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SOS Button */}
        {sosEnabled && (
          <div className="mb-8">
            <SOSButton onEmergency={() => setEmergencyMode(true)} />
          </div>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="location" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
            <TabsTrigger value="tips">{t("safety.safetyTips")}</TabsTrigger>
          </TabsList>

          {/* Location Sharing Tab */}
          <TabsContent value="location">
            <LocationSharing isEnabled={locationSharingEnabled} onToggle={setLocationSharingEnabled} />
          </TabsContent>

          {/* Emergency Contacts Tab */}
          <TabsContent value="contacts">
            <EmergencyContacts />
          </TabsContent>

          {/* Emergency Services Tab */}
          <TabsContent value="emergency">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Emergency Services
                </CardTitle>
                <CardDescription>Important emergency numbers for Telangana</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Police Emergency</h3>
                      <Badge variant="destructive">Emergency</Badge>
                    </div>
                    <p className="text-2xl font-bold text-primary mb-2">100</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Medical Emergency</h3>
                      <Badge variant="destructive">Emergency</Badge>
                    </div>
                    <p className="text-2xl font-bold text-primary mb-2">108</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Fire Emergency</h3>
                      <Badge variant="destructive">Emergency</Badge>
                    </div>
                    <p className="text-2xl font-bold text-primary mb-2">101</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Tourist Helpline</h3>
                      <Badge variant="secondary">Support</Badge>
                    </div>
                    <p className="text-2xl font-bold text-primary mb-2">1363</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Women Helpline</h3>
                      <Badge variant="secondary">Support</Badge>
                    </div>
                    <p className="text-2xl font-bold text-primary mb-2">181</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Cyber Crime</h3>
                      <Badge variant="secondary">Support</Badge>
                    </div>
                    <p className="text-2xl font-bold text-primary mb-2">1930</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Safety Tips Tab */}
          <TabsContent value="tips">
            <SafetyTips />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
