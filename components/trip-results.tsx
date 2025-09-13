"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, IndianRupee, Utensils, Camera, Star, Navigation, FileText } from "lucide-react"
import Image from "next/image"

interface TripResultsProps {
  tripData: any
}

export function TripResults({ tripData }: TripResultsProps) {
  // Generate dummy data based on destination
  const generateTripPlan = () => {
    const attractions = {
      Hyderabad: [
        {
          name: "Charminar",
          time: "2 hours",
          cost: "₹50",
          rating: 4.5,
          image: "/charminar-hyderabad-historic-monument.jpg",
        },
        { name: "Golconda Fort", time: "3 hours", cost: "₹100", rating: 4.3, image: "/golconda-fort.jpg" },
        {
          name: "Hussain Sagar Lake",
          time: "1.5 hours",
          cost: "Free",
          rating: 4.2,
          image: "/hussain-sagar-lake.jpg",
        },
      ],
      Warangal: [
        {
          name: "Warangal Fort",
          time: "2.5 hours",
          cost: "₹75",
          rating: 4.4,
          image: "/warangal-fort-ancient-ruins.jpg",
        },
        {
          name: "Thousand Pillar Temple",
          time: "1.5 hours",
          cost: "Free",
          rating: 4.6,
          image: "/thousand-pillar-temple.jpg",
        },
        { name: "Bhadrakali Temple", time: "1 hour", cost: "Free", rating: 4.3, image: "/bhadrakali-temple.jpg" },
      ],
      Srisailam: [
        {
          name: "Srisailam Temple",
          time: "2 hours",
          cost: "Free",
          rating: 4.7,
          image: "/srisailam-temple-spiritual-architecture.jpg",
        },
        { name: "Srisailam Dam", time: "1.5 hours", cost: "₹30", rating: 4.2, image: "/srisailam-dam.jpg" },
        { name: "Akkamahadevi Caves", time: "2 hours", cost: "₹50", rating: 4.1, image: "/akkamahadevi-caves.jpg" },
      ],
      Bhadrachalam: [
        {
          name: "Bhadrachalam Temple",
          time: "2 hours",
          cost: "Free",
          rating: 4.6,
          image: "/bhadrachalam-temple-lord-rama.jpg",
        },
        { name: "Godavari River", time: "1 hour", cost: "Free", rating: 4.3, image: "/godavari-river.jpg" },
        { name: "Parnasala", time: "1.5 hours", cost: "₹25", rating: 4.2, image: "/parnasala-bhadrachalam.jpg" },
      ],
    }

    const restaurants = {
      Hyderabad: [
        { name: "Paradise Biryani", cuisine: "Hyderabadi", cost: "₹300-500", rating: 4.4 },
        { name: "Shah Ghouse", cuisine: "Mughlai", cost: "₹250-400", rating: 4.3 },
        { name: "Bawarchi", cuisine: "Indian", cost: "₹200-350", rating: 4.2 },
      ],
      Warangal: [
        { name: "Hotel Ashoka", cuisine: "South Indian", cost: "₹150-250", rating: 4.1 },
        { name: "Kakatiya Deluxe", cuisine: "Multi-cuisine", cost: "₹200-300", rating: 4.0 },
        { name: "Suprabha", cuisine: "Vegetarian", cost: "₹100-200", rating: 4.2 },
      ],
      Srisailam: [
        { name: "Haritha Hotel", cuisine: "South Indian", cost: "₹150-250", rating: 4.0 },
        { name: "Punnami Restaurant", cuisine: "Vegetarian", cost: "₹100-180", rating: 3.9 },
        { name: "Srisailam Canteen", cuisine: "Local", cost: "₹80-150", rating: 3.8 },
      ],
      Bhadrachalam: [
        { name: "Haritha Hotel", cuisine: "South Indian", cost: "₹120-200", rating: 4.0 },
        { name: "Annapurna Restaurant", cuisine: "Vegetarian", cost: "₹80-150", rating: 3.9 },
        { name: "Godavari Restaurant", cuisine: "Local", cost: "₹100-180", rating: 3.8 },
      ],
    }

    return {
      attractions: attractions[tripData.destination as keyof typeof attractions] || attractions.Hyderabad,
      restaurants: restaurants[tripData.destination as keyof typeof restaurants] || restaurants.Hyderabad,
    }
  }

  const { attractions, restaurants } = generateTripPlan()
  const budget = Number.parseInt(tripData.budget) || 5000
  const estimatedCost = Math.floor(budget * 0.8)

  return (
    <div className="space-y-6 mt-8">
      {/* AI-generated trip plan section if available */}
      {tripData.aiTripPlan && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              AI-Generated Trip Plan
            </CardTitle>
            <CardDescription>Personalized itinerary created by our AI travel assistant</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{tripData.aiTripPlan}</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trip Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-primary" />
            Your Trip Plan
          </CardTitle>
          <CardDescription>
            {tripData.duration} {tripData.durationType} in {tripData.destination} •{" "}
            {tripData.isGroupTrip ? "Group" : "Solo"} Trip
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">₹{estimatedCost}</div>
              <div className="text-sm text-muted-foreground">Estimated Cost</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{attractions.length}</div>
              <div className="text-sm text-muted-foreground">Attractions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{restaurants.length}</div>
              <div className="text-sm text-muted-foreground">Restaurants</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{tripData.duration}</div>
              <div className="text-sm text-muted-foreground">{tripData.durationType}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attractions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            Recommended Attractions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {attractions.map((attraction, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-32">
                  <Image
                    src={attraction.image || "/placeholder.svg"}
                    alt={attraction.name}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    {attraction.rating}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{attraction.name}</h3>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {attraction.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <IndianRupee className="h-3 w-3" />
                      {attraction.cost}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Restaurants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5 text-primary" />
            Recommended Restaurants
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {restaurants.map((restaurant, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">{restaurant.name}</h3>
                  <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-3 w-3 text-yellow-500" />
                    {restaurant.rating}
                  </div>
                  <div className="text-sm text-muted-foreground">{restaurant.cost}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="flex-1" size="lg">
          <MapPin className="h-4 w-4 mr-2" />
          View on Map
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent" size="lg">
          <Camera className="h-4 w-4 mr-2" />
          AR Preview
        </Button>
      </div>
    </div>
  )
}
