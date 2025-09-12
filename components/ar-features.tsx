import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Layers, Navigation, BookOpen, Camera, Smartphone } from "lucide-react"

export function ARFeatures() {
  const features = [
    {
      icon: Eye,
      title: "Visual Recognition",
      description: "Automatically identifies landmarks and historical sites",
      status: "Active",
    },
    {
      icon: Layers,
      title: "3D Overlays",
      description: "Interactive 3D models and historical reconstructions",
      status: "Beta",
    },
    {
      icon: Navigation,
      title: "AR Navigation",
      description: "Turn-by-turn directions with AR waypoints",
      status: "Coming Soon",
    },
    {
      icon: BookOpen,
      title: "Historical Context",
      description: "Rich historical information and stories",
      status: "Active",
    },
    {
      icon: Camera,
      title: "AR Photography",
      description: "Capture photos with AR elements and filters",
      status: "Beta",
    },
    {
      icon: Smartphone,
      title: "Multi-Device Support",
      description: "Works on smartphones and AR-enabled devices",
      status: "Active",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-600 border-green-500/20"
      case "Beta":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
      case "Coming Soon":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20"
    }
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>AR Features</CardTitle>
        <CardDescription>Discover what makes our AR experience unique and immersive</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{feature.title}</h3>
                    <Badge variant="outline" className={`text-xs ${getStatusColor(feature.status)}`}>
                      {feature.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
