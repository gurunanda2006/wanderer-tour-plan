"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Key, Globe, CheckCircle, AlertCircle } from "lucide-react"
import { APISettings } from "@/components/api-settings"
import { NotificationSettings } from "@/components/notification-settings"
import { PrivacySettings } from "@/components/privacy-settings"
import { ProfileSettings } from "@/components/profile-settings"
import { ThemeSettings } from "@/components/theme-settings"
import { useLanguage } from "@/contexts/language-context"

export default function SettingsPage() {
  const [apiConfigured, setApiConfigured] = useState(false)
  const [savedSettings, setSavedSettings] = useState(false)
  const { t, language } = useLanguage()

  const getLanguageDisplayName = () => {
    switch (language) {
      case "te":
        return "తెలుగు"
      case "hi":
        return "हिंदी"
      default:
        return "English (US)"
    }
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-balance">{t("settings.title")}</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Customize your Wanderer experience and configure API integrations
          </p>
        </div>

        {/* Settings Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Key className="h-5 w-5 text-primary" />
                API Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">OpenRouter Integration</p>
                  <Badge variant={apiConfigured ? "default" : "secondary"} className="mt-1">
                    {apiConfigured ? "Connected" : "Not Configured"}
                  </Badge>
                </div>
                {apiConfigured ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Globe className="h-5 w-5 text-primary" />
                Language
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-sm text-muted-foreground">Current Language</p>
                <p className="font-semibold mt-1">{getLanguageDisplayName()}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="h-5 w-5 text-primary" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-sm text-muted-foreground">Account Status</p>
                <Badge variant="default" className="mt-1">
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="api" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="profile">{t("settings.profile")}</TabsTrigger>
            <TabsTrigger value="notifications">{t("settings.notifications")}</TabsTrigger>
            <TabsTrigger value="privacy">{t("settings.privacy")}</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          {/* API Settings Tab */}
          <TabsContent value="api">
            <APISettings onConfigurationChange={setApiConfigured} />
          </TabsContent>

          {/* Theme Settings Tab */}
          <TabsContent value="theme">
            <ThemeSettings />
          </TabsContent>

          {/* Profile Settings Tab */}
          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>

          {/* Privacy Settings Tab */}
          <TabsContent value="privacy">
            <PrivacySettings />
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About Wanderer</CardTitle>
                <CardDescription>Tourism app for exploring Telangana</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Version Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>App Version:</span>
                      <span>1.0.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Build Number:</span>
                      <span>2024.01.15</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Updated:</span>
                      <span>January 15, 2024</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Features</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• AI-powered trip planning with OpenRouter integration</li>
                    <li>• Augmented reality guide for attractions</li>
                    <li>• QR code rewards system</li>
                    <li>• Safety features with location sharing</li>
                    <li>• Multi-language support (Telugu, Hindi, English)</li>
                    <li>• Emergency SOS functionality</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Support</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Contact Support
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Privacy Policy
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Terms of Service
                    </Button>
                  </div>
                </div>

                <div className="text-center pt-4 border-t">
                  <p className="text-sm text-muted-foreground">Made with ❤️ for Telangana Tourism</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
