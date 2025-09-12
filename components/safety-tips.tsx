import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, MapPin, Users, Phone, Eye, AlertTriangle } from "lucide-react"

export function SafetyTips() {
  const tips = [
    {
      category: "General Safety",
      icon: Shield,
      color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      tips: [
        "Always inform someone about your travel plans and expected return time",
        "Keep copies of important documents in separate locations",
        "Carry emergency cash and keep your phone charged",
        "Stay in well-lit, populated areas, especially at night",
        "Trust your instincts - if something feels wrong, leave immediately",
      ],
    },
    {
      category: "Location Safety",
      icon: MapPin,
      color: "bg-green-500/10 text-green-600 border-green-500/20",
      tips: [
        "Research your destination beforehand and know safe areas",
        "Use official transportation and avoid unmarked vehicles",
        "Keep your location sharing active with trusted contacts",
        "Avoid displaying expensive items or large amounts of cash",
        "Stay aware of your surroundings and avoid distractions",
      ],
    },
    {
      category: "Social Safety",
      icon: Users,
      color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      tips: [
        "Travel in groups when possible, especially in unfamiliar areas",
        "Be cautious when meeting new people and don't share personal details",
        "Avoid accepting food or drinks from strangers",
        "Keep your accommodation details private",
        "Use reputable tour guides and verified services",
      ],
    },
    {
      category: "Communication",
      icon: Phone,
      color: "bg-orange-500/10 text-orange-600 border-orange-500/20",
      tips: [
        "Keep emergency numbers saved and easily accessible",
        "Learn basic local phrases for help and emergency situations",
        "Maintain regular contact with family or friends",
        "Know the location of nearest police stations and hospitals",
        "Keep your phone charged and carry a portable charger",
      ],
    },
    {
      category: "Awareness",
      icon: Eye,
      color: "bg-pink-500/10 text-pink-600 border-pink-500/20",
      tips: [
        "Be aware of common scams and tourist traps in the area",
        "Watch for pickpockets in crowded places",
        "Don't leave belongings unattended in public spaces",
        "Be cautious of overly friendly strangers offering help",
        "Stay updated on local news and weather conditions",
      ],
    },
    {
      category: "Emergency Preparedness",
      icon: AlertTriangle,
      color: "bg-red-500/10 text-red-600 border-red-500/20",
      tips: [
        "Know how to use the SOS feature on your device",
        "Keep a list of emergency contacts easily accessible",
        "Carry basic first aid supplies for minor injuries",
        "Know the symptoms of common travel-related illnesses",
        "Have a backup plan for transportation and accommodation",
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Travel Safety Guidelines</CardTitle>
          <CardDescription>Essential safety tips for traveling in Telangana</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Card key={index} className="h-fit">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <IconComponent className="h-5 w-5" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Reference Card */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">Quick Emergency Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-red-600">100</div>
              <div className="text-sm text-muted-foreground">Police</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">108</div>
              <div className="text-sm text-muted-foreground">Medical</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">101</div>
              <div className="text-sm text-muted-foreground">Fire</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">1363</div>
              <div className="text-sm text-muted-foreground">Tourist Help</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
