"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, MapPin, Eye, Trash2, Download, Info } from "lucide-react"

export function PrivacySettings() {
  const [privacy, setPrivacy] = useState({
    locationTracking: true,
    dataCollection: true,
    analyticsSharing: false,
    personalizedAds: false,
    profileVisibility: true,
    activitySharing: false,
  })

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Location Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Location Privacy
          </CardTitle>
          <CardDescription>Control how your location data is used</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="location-tracking">Location Tracking</Label>
              <p className="text-sm text-muted-foreground">Allow app to track your location for features</p>
            </div>
            <Switch
              id="location-tracking"
              checked={privacy.locationTracking}
              onCheckedChange={(checked) => handlePrivacyChange("locationTracking", checked)}
            />
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Location tracking is required for safety features, AR guide, and location-based rewards. Disabling this
              will limit app functionality.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Data Collection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Data Collection
          </CardTitle>
          <CardDescription>Manage what data we collect and how it's used</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="data-collection">Usage Data Collection</Label>
              <p className="text-sm text-muted-foreground">Help improve the app by sharing usage data</p>
            </div>
            <Switch
              id="data-collection"
              checked={privacy.dataCollection}
              onCheckedChange={(checked) => handlePrivacyChange("dataCollection", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="analytics-sharing">Analytics Sharing</Label>
              <p className="text-sm text-muted-foreground">Share anonymized analytics with third parties</p>
            </div>
            <Switch
              id="analytics-sharing"
              checked={privacy.analyticsSharing}
              onCheckedChange={(checked) => handlePrivacyChange("analyticsSharing", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="personalized-ads">Personalized Advertisements</Label>
              <p className="text-sm text-muted-foreground">Show ads based on your interests and activity</p>
            </div>
            <Switch
              id="personalized-ads"
              checked={privacy.personalizedAds}
              onCheckedChange={(checked) => handlePrivacyChange("personalizedAds", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Profile Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Profile Privacy
          </CardTitle>
          <CardDescription>Control the visibility of your profile and activities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="profile-visibility">Profile Visibility</Label>
              <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
            </div>
            <Switch
              id="profile-visibility"
              checked={privacy.profileVisibility}
              onCheckedChange={(checked) => handlePrivacyChange("profileVisibility", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="activity-sharing">Activity Sharing</Label>
              <p className="text-sm text-muted-foreground">Share your travel activities with other users</p>
            </div>
            <Switch
              id="activity-sharing"
              checked={privacy.activitySharing}
              onCheckedChange={(checked) => handlePrivacyChange("activitySharing", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-primary" />
            Data Management
          </CardTitle>
          <CardDescription>Manage your personal data and account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Download My Data
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Eye className="h-4 w-4 mr-2" />
              View Data Usage
            </Button>
            <Button variant="destructive" className="w-full justify-start">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Deleting your account will permanently remove all your data, including trip history, rewards, and
              settings. This action cannot be undone.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
