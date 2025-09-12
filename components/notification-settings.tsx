"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, MapPin, Gift, Shield, MessageCircle } from "lucide-react"

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    pushEnabled: true,
    emailEnabled: true,
    smsEnabled: false,
    tripReminders: true,
    rewardAlerts: true,
    safetyAlerts: true,
    chatMessages: true,
    locationUpdates: false,
    marketingEmails: false,
  })

  const [quietHours, setQuietHours] = useState({
    enabled: true,
    startTime: "22:00",
    endTime: "08:00",
  })

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handleQuietHoursChange = (key: string, value: string | boolean) => {
    setQuietHours((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      {/* General Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Choose how you want to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
            </div>
            <Switch
              id="push-notifications"
              checked={notifications.pushEnabled}
              onCheckedChange={(checked) => handleNotificationChange("pushEnabled", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <Switch
              id="email-notifications"
              checked={notifications.emailEnabled}
              onCheckedChange={(checked) => handleNotificationChange("emailEnabled", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive important alerts via SMS</p>
            </div>
            <Switch
              id="sms-notifications"
              checked={notifications.smsEnabled}
              onCheckedChange={(checked) => handleNotificationChange("smsEnabled", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Specific Notification Types */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Types</CardTitle>
          <CardDescription>Customize which types of notifications you receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-primary" />
              <div>
                <Label htmlFor="trip-reminders">Trip Reminders</Label>
                <p className="text-sm text-muted-foreground">Reminders about your planned trips</p>
              </div>
            </div>
            <Switch
              id="trip-reminders"
              checked={notifications.tripReminders}
              onCheckedChange={(checked) => handleNotificationChange("tripReminders", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Gift className="h-4 w-4 text-primary" />
              <div>
                <Label htmlFor="reward-alerts">Reward Alerts</Label>
                <p className="text-sm text-muted-foreground">Notifications about earned coins and rewards</p>
              </div>
            </div>
            <Switch
              id="reward-alerts"
              checked={notifications.rewardAlerts}
              onCheckedChange={(checked) => handleNotificationChange("rewardAlerts", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-4 w-4 text-primary" />
              <div>
                <Label htmlFor="safety-alerts">Safety Alerts</Label>
                <p className="text-sm text-muted-foreground">Emergency and safety-related notifications</p>
              </div>
            </div>
            <Switch
              id="safety-alerts"
              checked={notifications.safetyAlerts}
              onCheckedChange={(checked) => handleNotificationChange("safetyAlerts", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-4 w-4 text-primary" />
              <div>
                <Label htmlFor="chat-messages">AI Chat Messages</Label>
                <p className="text-sm text-muted-foreground">Responses from AI travel assistant</p>
              </div>
            </div>
            <Switch
              id="chat-messages"
              checked={notifications.chatMessages}
              onCheckedChange={(checked) => handleNotificationChange("chatMessages", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-primary" />
              <div>
                <Label htmlFor="location-updates">Location Updates</Label>
                <p className="text-sm text-muted-foreground">Updates about nearby attractions</p>
              </div>
            </div>
            <Switch
              id="location-updates"
              checked={notifications.locationUpdates}
              onCheckedChange={(checked) => handleNotificationChange("locationUpdates", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-4 w-4 text-primary" />
              <div>
                <Label htmlFor="marketing-emails">Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">Promotional offers and updates</p>
              </div>
            </div>
            <Switch
              id="marketing-emails"
              checked={notifications.marketingEmails}
              onCheckedChange={(checked) => handleNotificationChange("marketingEmails", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card>
        <CardHeader>
          <CardTitle>Quiet Hours</CardTitle>
          <CardDescription>Set times when you don't want to receive non-urgent notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="quiet-hours">Enable Quiet Hours</Label>
              <p className="text-sm text-muted-foreground">Pause non-urgent notifications during specified hours</p>
            </div>
            <Switch
              id="quiet-hours"
              checked={quietHours.enabled}
              onCheckedChange={(checked) => handleQuietHoursChange("enabled", checked)}
            />
          </div>

          {quietHours.enabled && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-time">Start Time</Label>
                <Select
                  value={quietHours.startTime}
                  onValueChange={(value) => handleQuietHoursChange("startTime", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, "0")
                      return (
                        <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                          {hour}:00
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="end-time">End Time</Label>
                <Select value={quietHours.endTime} onValueChange={(value) => handleQuietHoursChange("endTime", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, "0")
                      return (
                        <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                          {hour}:00
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
