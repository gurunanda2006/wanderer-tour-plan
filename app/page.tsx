import { HeroSection } from "@/components/hero-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Camera, Gift, Shield, Settings, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { WeaveBackground } from "@/components/ui/weave-background"

export default function HomePage() {
  const features = [
    {
      icon: MapPin,
      title: "Smart Trip Planning",
      description: "AI-powered itineraries based on your budget, preferences, and duration",
      href: "/plan-trip",
    },
    {
      icon: Camera,
      title: "AR Guide",
      description: "Experience attractions through augmented reality previews",
      href: "/ar-guide",
    },
    {
      icon: Gift,
      title: "Rewards System",
      description: "Earn coins by scanning QR codes and redeem for exclusive discounts",
      href: "/rewards",
    },
    {
      icon: Shield,
      title: "Safety Features",
      description: "Location sharing and SOS features for secure travel",
      href: "/safety",
    },
    {
      icon: MessageCircle,
      title: "AI Chat Assistant",
      description: "Get instant answers about tourism and travel planning",
      href: "/plan-trip",
    },
    {
      icon: Settings,
      title: "Personalized Settings",
      description: "Customize your experience with language and API preferences",
      href: "/settings",
    },
  ]

  const popularDestinations = [
    {
      name: "Charminar",
      location: "Hyderabad",
      image: "/charminar-hyderabad-historic-monument.jpg",
      description: "Iconic 16th-century mosque and monument",
    },
    {
      name: "Warangal Fort",
      location: "Warangal",
      image: "/warangal-fort-ancient-ruins.jpg",
      description: "Magnificent ruins of the Kakatiya dynasty",
    },
    {
      name: "Srisailam Temple",
      location: "Srisailam",
      image: "/srisailam-temple-spiritual-architecture.jpg",
      description: "Sacred Jyotirlinga temple on Krishna river",
    },
    {
      name: "Bhadrachalam Temple",
      location: "Bhadrachalam",
      image: "/bhadrachalam-temple-lord-rama.jpg",
      description: "Famous temple dedicated to Lord Rama",
    },
  ]

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Features Section */}
      <section className="relative py-8 px-2 bg-card overflow-hidden transition-all duration-500 hover:bg-card/80 group">
        <WeaveBackground />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance group-hover:text-primary transition-colors duration-300">
              Everything You Need for the Perfect Trip
            </h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto group-hover:text-foreground transition-colors duration-300">
              From AI-powered planning to AR experiences, we've got all the tools to make your Telangana journey
              unforgettable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group/card hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 hover:bg-card/90"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover/card:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-pretty">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={feature.href}>
                    <Button
                      variant="outline"
                      className="w-full group-hover/card:bg-primary group-hover/card:text-primary-foreground transition-colors bg-transparent"
                    >
                      Explore Feature
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="relative py-8 px-2 overflow-hidden transition-all duration-500 hover:bg-muted/30 group">
        <WeaveBackground />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance group-hover:text-primary transition-colors duration-300">
              Popular Destinations
            </h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto group-hover:text-foreground transition-colors duration-300">
              Discover the most visited attractions in Telangana, each with its own unique story and cultural
              significance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularDestinations.map((destination) => (
              <Card
                key={destination.name}
                className="group/card overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover group-hover/card:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover/card:from-black/90 group-hover/card:via-black/40 transition-all duration-300" />
                  <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 group-hover/card:bg-black/80 transition-colors duration-300">
                    <h3 className="font-bold text-lg text-white">{destination.name}</h3>
                    <p className="text-sm text-gray-200">{destination.location}</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground text-pretty">{destination.description}</p>
                  <Button variant="ghost" className="w-full mt-3 text-primary hover:bg-primary/10">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-8 px-2 hero-gradient overflow-hidden transition-all duration-500 hover:brightness-90 group">
        <WeaveBackground />
        <div className="container mx-auto max-w-4xl text-center text-white relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance group-hover:drop-shadow-lg transition-all duration-300">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl mb-8 text-gray-200 text-pretty group-hover:text-white transition-colors duration-300">
            Join thousands of travelers who have discovered the magic of Telangana with Wanderer
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/plan-trip">
              <Button size="lg" variant="secondary" className="px-8 hover:scale-105 transition-transform duration-300">
                Plan Your Trip Now
              </Button>
            </Link>
            <Link href="/ar-guide">
              <Button
                size="lg"
                variant="outline"
                className="px-8 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:scale-105 transition-all duration-300"
              >
                Download AR Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
