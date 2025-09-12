"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Coins, Utensils, ShoppingBag, Camera, MapPin, Percent } from "lucide-react"

interface DiscountOffersProps {
  userCoins: number
  onRedeem: (cost: number) => void
}

export function DiscountOffers({ userCoins, onRedeem }: DiscountOffersProps) {
  const [redeemedOffers, setRedeemedOffers] = useState<number[]>([])

  const offers = [
    {
      id: 1,
      title: "Paradise Biryani - 20% Off",
      description: "Get 20% discount on your next meal at Paradise Restaurant",
      category: "Food",
      icon: Utensils,
      cost: 200,
      originalPrice: "₹500",
      discountedPrice: "₹400",
      image: "/placeholder.svg?height=100&width=100&text=Paradise",
      validUntil: "Valid for 30 days",
    },
    {
      id: 2,
      title: "Charminar Souvenir Shop - 15% Off",
      description: "Exclusive discount on traditional handicrafts and souvenirs",
      category: "Shopping",
      icon: ShoppingBag,
      cost: 150,
      originalPrice: "₹1000",
      discountedPrice: "₹850",
      image: "/placeholder.svg?height=100&width=100&text=Souvenirs",
      validUntil: "Valid for 15 days",
    },
    {
      id: 3,
      title: "Professional Photo Session",
      description: "Get professional photos at iconic Telangana landmarks",
      category: "Photography",
      icon: Camera,
      cost: 300,
      originalPrice: "₹2000",
      discountedPrice: "₹1500",
      image: "/placeholder.svg?height=100&width=100&text=Photo",
      validUntil: "Valid for 60 days",
    },
    {
      id: 4,
      title: "Guided Heritage Walk - 25% Off",
      description: "Join expert-led tours of Hyderabad's historic sites",
      category: "Tours",
      icon: MapPin,
      cost: 250,
      originalPrice: "₹800",
      discountedPrice: "₹600",
      image: "/placeholder.svg?height=100&width=100&text=Tour",
      validUntil: "Valid for 45 days",
    },
    {
      id: 5,
      title: "Bawarchi Restaurant - 30% Off",
      description: "Special discount on authentic Hyderabadi cuisine",
      category: "Food",
      icon: Utensils,
      cost: 180,
      originalPrice: "₹600",
      discountedPrice: "₹420",
      image: "/placeholder.svg?height=100&width=100&text=Bawarchi",
      validUntil: "Valid for 20 days",
    },
    {
      id: 6,
      title: "Cultural Craft Workshop",
      description: "Learn traditional Telangana crafts with local artisans",
      category: "Experience",
      icon: ShoppingBag,
      cost: 400,
      originalPrice: "₹1500",
      discountedPrice: "₹1050",
      image: "/placeholder.svg?height=100&width=100&text=Craft",
      validUntil: "Valid for 90 days",
    },
  ]

  const handleRedeem = (offer: (typeof offers)[0]) => {
    if (userCoins >= offer.cost && !redeemedOffers.includes(offer.id)) {
      onRedeem(offer.cost)
      setRedeemedOffers((prev) => [...prev, offer.id])
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Food":
        return "bg-orange-500/10 text-orange-600 border-orange-500/20"
      case "Shopping":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20"
      case "Photography":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      case "Tours":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      case "Experience":
        return "bg-pink-500/10 text-pink-600 border-pink-500/20"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5 text-primary" />
            Exclusive Discounts
          </CardTitle>
          <CardDescription>
            Redeem your coins for exclusive discounts at restaurants, shops, and attractions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offers.map((offer) => {
              const isRedeemed = redeemedOffers.includes(offer.id)
              const canAfford = userCoins >= offer.cost
              const IconComponent = offer.icon

              return (
                <Card key={offer.id} className={`relative ${isRedeemed ? "opacity-60" : ""}`}>
                  {isRedeemed && (
                    <div className="absolute top-2 right-2 z-10">
                      <Badge variant="default" className="bg-green-600">
                        Redeemed
                      </Badge>
                    </div>
                  )}

                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-sm leading-tight">{offer.title}</h3>
                          <Badge variant="outline" className={`text-xs ${getCategoryColor(offer.category)}`}>
                            {offer.category}
                          </Badge>
                        </div>

                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{offer.description}</p>

                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs line-through text-muted-foreground">{offer.originalPrice}</span>
                          <span className="text-sm font-semibold text-green-600">{offer.discountedPrice}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Coins className="h-3 w-3 text-yellow-500" />
                            <span className="text-sm font-medium">{offer.cost} coins</span>
                          </div>

                          <Button
                            size="sm"
                            disabled={!canAfford || isRedeemed}
                            onClick={() => handleRedeem(offer)}
                            className="text-xs px-3"
                          >
                            {isRedeemed ? "Redeemed" : canAfford ? "Redeem" : "Not enough coins"}
                          </Button>
                        </div>

                        <p className="text-xs text-muted-foreground mt-2">{offer.validUntil}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
