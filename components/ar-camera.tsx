"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, RotateCcw, Zap, Info, MapPin } from "lucide-react"

interface ARCameraProps {
  onClose: () => void
}

export function ARCamera({ onClose }: ARCameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [detectedLandmark, setDetectedLandmark] = useState<string | null>(null)

  // Simulate landmark detection
  const landmarks = [
    "Charminar - Historic Monument (1591 AD)",
    "Golconda Fort - Medieval Fortress",
    "Salar Jung Museum - Art Collection",
    "Hussain Sagar Lake - Heart-shaped Lake",
  ]

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setIsLoading(false)

          // Simulate landmark detection after 3 seconds
          setTimeout(() => {
            const randomLandmark = landmarks[Math.floor(Math.random() * landmarks.length)]
            setDetectedLandmark(randomLandmark)
          }, 3000)
        }
      } catch (err) {
        setError("Camera access denied. Please enable camera permissions.")
        setIsLoading(false)
      }
    }

    startCamera()

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const handleClose = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }
    onClose()
  }

  if (error) {
    return (
      <div className="relative aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
        <div className="text-center text-white p-8">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="h-8 w-8 text-red-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Camera Access Required</h3>
          <p className="text-gray-300 mb-4">{error}</p>
          <Button onClick={handleClose} variant="outline" className="text-white border-white bg-transparent">
            Close Camera
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
      {/* Video Stream */}
      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p>Initializing AR Camera...</p>
          </div>
        </div>
      )}

      {/* AR Overlay UI */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Scanning Animation */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary/60 animate-pulse" />
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-primary/60 animate-pulse" />
        </div>

        {/* Corner Brackets */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary" />

        {/* Status Indicators */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <Badge variant="secondary" className="bg-black/70 text-white">
            <Zap className="h-3 w-3 mr-1" />
            AR Active
          </Badge>
        </div>

        {/* Landmark Detection */}
        {detectedLandmark && (
          <div className="absolute bottom-20 left-4 right-4">
            <Card className="bg-black/80 border-primary/50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 text-white">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">Landmark Detected</h3>
                    <p className="text-xs text-gray-300">{detectedLandmark}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className="text-xs border-primary/50 text-primary">
                        Historical Site
                      </Badge>
                      <Badge variant="outline" className="text-xs border-primary/50 text-primary">
                        UNESCO Heritage
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 pointer-events-auto">
        <Button
          variant="secondary"
          size="icon"
          className="bg-black/70 text-white hover:bg-black/80"
          onClick={() => setDetectedLandmark(null)}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" className="bg-black/70 text-white hover:bg-black/80">
          <Info className="h-4 w-4" />
        </Button>
      </div>

      {/* Close Button */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-4 right-4 bg-black/70 text-white hover:bg-black/80 pointer-events-auto"
        onClick={handleClose}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
