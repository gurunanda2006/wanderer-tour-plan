"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, QrCode, CheckCircle, AlertCircle, Coins } from "lucide-react"

interface QRScannerProps {
  onClose: () => void
  onScanSuccess: (coins: number) => void
}

export function QRScanner({ onClose, onScanSuccess }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [scanResult, setScanResult] = useState<{ location: string; coins: number } | null>(null)
  const [isScanning, setIsScanning] = useState(true)

  // Dummy QR codes for demo
  const dummyQRCodes = [
    { location: "Charminar", coins: 150 },
    { location: "Golconda Fort", coins: 200 },
    { location: "Salar Jung Museum", coins: 100 },
    { location: "Hussain Sagar Lake", coins: 75 },
    { location: "Warangal Fort", coins: 180 },
    { location: "Srisailam Temple", coins: 120 },
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

          // Simulate QR code detection after 3 seconds
          setTimeout(() => {
            if (isScanning) {
              const randomQR = dummyQRCodes[Math.floor(Math.random() * dummyQRCodes.length)]
              setScanResult(randomQR)
              setIsScanning(false)
            }
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
  }, [isScanning])

  const handleClose = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }
    onClose()
  }

  const handleClaimReward = () => {
    if (scanResult) {
      onScanSuccess(scanResult.coins)
      handleClose()
    }
  }

  const handleScanAgain = () => {
    setScanResult(null)
    setIsScanning(true)
    // Restart scanning simulation
    setTimeout(() => {
      if (isScanning) {
        const randomQR = dummyQRCodes[Math.floor(Math.random() * dummyQRCodes.length)]
        setScanResult(randomQR)
        setIsScanning(false)
      }
    }, 3000)
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              QR Scanner
            </span>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Camera View */}
          <div className="relative aspect-square bg-black rounded-lg overflow-hidden">
            {!error && <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />}

            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-sm">Starting camera...</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-2" />
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Scanning Overlay */}
            {!error && !scanResult && !isLoading && (
              <div className="absolute inset-0">
                {/* Scanning Frame */}
                <div className="absolute inset-4 border-2 border-primary rounded-lg">
                  <div className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-primary" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-primary" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-primary" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-primary" />
                </div>

                {/* Scanning Line */}
                <div className="absolute inset-4 overflow-hidden rounded-lg">
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 bg-primary animate-pulse"
                    style={{ animation: "scan 2s linear infinite" }}
                  />
                </div>

                {/* Instructions */}
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge variant="secondary" className="w-full justify-center bg-black/70 text-white">
                    Point camera at QR code
                  </Badge>
                </div>
              </div>
            )}

            {/* Success Result */}
            {scanResult && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">QR Code Detected!</h3>
                  <p className="text-sm text-gray-300 mb-4">{scanResult.location}</p>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Coins className="h-5 w-5 text-yellow-500" />
                    <span className="text-xl font-bold text-yellow-400">+{scanResult.coins} coins</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {scanResult ? (
            <div className="flex gap-2">
              <Button onClick={handleClaimReward} className="flex-1">
                <Coins className="h-4 w-4 mr-2" />
                Claim Reward
              </Button>
              <Button variant="outline" onClick={handleScanAgain}>
                Scan Again
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Scan QR codes at tourist attractions to earn coins and unlock exclusive rewards
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  )
}
