"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Play, Info } from "lucide-react"
import { ARCamera } from "@/components/ar-camera"
import { ARFeatures } from "@/components/ar-features"
import { useLanguage } from "@/contexts/language-context"

export default function ARGuidePage() {
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-balance">{t("ar.title")}</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">{t("ar.subtitle")}</p>
        </div>

        {/* AR Demo Video Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5 text-primary" />
              {t("ar.demoTitle")}
            </CardTitle>
            <CardDescription>{t("ar.demoDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
              <iframe
                src="https://www.youtube.com/embed/V4pmCAU9uoA?autoplay=1&mute=1&loop=1&playlist=V4pmCAU9uoA&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&fs=0&disablekb=1"
                title="AR Experience Demo"
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-black/70 text-white">
                  AR Experience Demo
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Camera Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              {t("ar.cameraTitle")}
            </CardTitle>
            <CardDescription>{t("ar.cameraDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            {!isCameraOpen ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Camera className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{t("ar.readyToExplore")}</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">{t("ar.cameraDescription")}</p>
                <Button size="lg" onClick={() => setIsCameraOpen(true)} className="px-8">
                  <Camera className="h-4 w-4 mr-2" />
                  {t("ar.openCamera")}
                </Button>
                <div className="mt-4 text-sm text-muted-foreground">
                  <Info className="h-4 w-4 inline mr-1" />
                  {t("ar.cameraRequired")}
                </div>
              </div>
            ) : (
              <ARCamera onClose={() => setIsCameraOpen(false)} />
            )}
          </CardContent>
        </Card>

        {/* AR Features */}
        <ARFeatures />

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle>How AR Guide Works</CardTitle>
            <CardDescription>Simple steps to enhance your travel experience with augmented reality</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold mb-2">Point Camera</h3>
                <p className="text-sm text-muted-foreground">Aim your device camera at any landmark or attraction</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold mb-2">See AR Overlay</h3>
                <p className="text-sm text-muted-foreground">
                  Watch as historical information and 3D models appear on screen
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold mb-2">Learn & Explore</h3>
                <p className="text-sm text-muted-foreground">
                  Interact with AR elements to discover hidden stories and facts
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
