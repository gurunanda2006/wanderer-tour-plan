import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coins, QrCode, MapPin, Camera, Utensils, Calendar } from "lucide-react"

export function RewardsHistory() {
  const history = [
    {
      id: 1,
      type: "earned",
      action: "QR Code Scan",
      location: "Charminar",
      coins: 150,
      date: "2024-01-15",
      time: "14:30",
      icon: QrCode,
    },
    {
      id: 2,
      type: "redeemed",
      action: "Paradise Biryani Discount",
      location: "Paradise Restaurant",
      coins: -200,
      date: "2024-01-14",
      time: "19:45",
      icon: Utensils,
    },
    {
      id: 3,
      type: "earned",
      action: "Location Check-in",
      location: "Golconda Fort",
      coins: 100,
      date: "2024-01-13",
      time: "11:15",
      icon: MapPin,
    },
    {
      id: 4,
      type: "earned",
      action: "Photo Share",
      location: "Hussain Sagar Lake",
      coins: 25,
      date: "2024-01-12",
      time: "17:20",
      icon: Camera,
    },
    {
      id: 5,
      type: "earned",
      action: "QR Code Scan",
      location: "Salar Jung Museum",
      coins: 120,
      date: "2024-01-11",
      time: "10:30",
      icon: QrCode,
    },
    {
      id: 6,
      type: "redeemed",
      action: "Souvenir Shop Discount",
      location: "Charminar Bazaar",
      coins: -150,
      date: "2024-01-10",
      time: "16:00",
      icon: Utensils,
    },
    {
      id: 7,
      type: "earned",
      action: "Restaurant Review",
      location: "Bawarchi Restaurant",
      coins: 40,
      date: "2024-01-09",
      time: "20:15",
      icon: Utensils,
    },
    {
      id: 8,
      type: "earned",
      action: "Location Check-in",
      location: "Warangal Fort",
      coins: 80,
      date: "2024-01-08",
      time: "13:45",
      icon: MapPin,
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Transaction History
        </CardTitle>
        <CardDescription>Your complete rewards and redemption history</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((item) => {
            const IconComponent = item.icon
            const isEarned = item.type === "earned"

            return (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isEarned ? "bg-green-500/10" : "bg-red-500/10"
                    }`}
                  >
                    <IconComponent className={`h-5 w-5 ${isEarned ? "text-green-600" : "text-red-600"}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{item.action}</h3>
                    <p className="text-xs text-muted-foreground">{item.location}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(item.date)} at {item.time}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`flex items-center gap-1 ${isEarned ? "text-green-600" : "text-red-600"}`}>
                    <Coins className="h-4 w-4" />
                    <span className="font-semibold">
                      {isEarned ? "+" : ""}
                      {item.coins}
                    </span>
                  </div>
                  <Badge variant={isEarned ? "default" : "secondary"} className="text-xs mt-1">
                    {isEarned ? "Earned" : "Redeemed"}
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
