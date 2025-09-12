"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coins, QrCode, Trophy, Star, MapPin, Camera, Utensils } from "lucide-react"
import { QRScanner } from "@/components/qr-scanner"
import { RewardsHistory } from "@/components/rewards-history"
import { DiscountOffers } from "@/components/discount-offers"
import { useLanguage } from "@/contexts/language-context"

export default function RewardsPage() {
  const [userCoins, setUserCoins] = useState(1250)
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false)
  const [userLevel, setUserLevel] = useState(3)
  const [experiencePoints, setExperiencePoints] = useState(750)
  const nextLevelXP = 1000
  const { t } = useLanguage()

  const handleQRScan = (coins: number) => {
    setUserCoins((prev) => prev + coins)
    setExperiencePoints((prev) => prev + coins / 2)
  }

  const achievements = [
    { name: "First Visit", description: "Visited your first attraction", coins: 50, completed: true },
    { name: "Explorer", description: "Visited 5 different places", coins: 100, completed: true },
    { name: "Culture Enthusiast", description: "Visited 3 temples", coins: 75, completed: true },
    { name: "Foodie", description: "Tried 5 local restaurants", coins: 80, completed: false },
    { name: "AR Pioneer", description: "Used AR guide 10 times", coins: 120, completed: false },
    { name: "Social Traveler", description: "Shared 5 photos", coins: 60, completed: false },
  ]

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-balance">{t("rewards.title")}</h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">{t("rewards.subtitle")}</p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Coins className="h-5 w-5 text-yellow-500" />
                {t("rewards.totalCoins")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{userCoins.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">Available for redemption</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Trophy className="h-5 w-5 text-primary" />
                Level {userLevel}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to Level {userLevel + 1}</span>
                  <span>
                    {experiencePoints}/{nextLevelXP} XP
                  </span>
                </div>
                <Progress value={(experiencePoints / nextLevelXP) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <QrCode className="h-5 w-5 text-primary" />
                QR Scanner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setIsQRScannerOpen(true)} className="w-full" size="lg">
                <QrCode className="h-4 w-4 mr-2" />
                {t("rewards.scanQR")}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="earn" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="earn">{t("tabs.earn")}</TabsTrigger>
            <TabsTrigger value="redeem">{t("tabs.redeem")}</TabsTrigger>
            <TabsTrigger value="achievements">{t("tabs.achievements")}</TabsTrigger>
            <TabsTrigger value="history">{t("tabs.history")}</TabsTrigger>
          </TabsList>

          {/* Earn Coins Tab */}
          <TabsContent value="earn" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("earn.title")}</CardTitle>
                <CardDescription>{t("earn.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <QrCode className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-semibold">{t("earn.scanQR")}</h3>
                        <p className="text-sm text-muted-foreground">{t("earn.scanQRDescription")}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary">+50-200 coins</Badge>
                      <Button size="sm" onClick={() => setIsQRScannerOpen(true)}>
                        {t("earn.scanNow")}
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <MapPin className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-semibold">{t("earn.visitAttractions")}</h3>
                        <p className="text-sm text-muted-foreground">{t("earn.visitAttractionsDescription")}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary">+30-100 coins</Badge>
                      <Button size="sm" variant="outline">
                        {t("earn.viewMap")}
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Camera className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-semibold">{t("earn.sharePhotos")}</h3>
                        <p className="text-sm text-muted-foreground">{t("earn.sharePhotosDescription")}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary">+25 coins</Badge>
                      <Button size="sm" variant="outline">
                        {t("earn.share")}
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <Utensils className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-semibold">{t("earn.restaurantReviews")}</h3>
                        <p className="text-sm text-muted-foreground">{t("earn.restaurantReviewsDescription")}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary">+15-40 coins</Badge>
                      <Button size="sm" variant="outline">
                        {t("earn.review")}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Redeem Tab */}
          <TabsContent value="redeem">
            <DiscountOffers userCoins={userCoins} onRedeem={(cost) => setUserCoins((prev) => prev - cost)} />
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("achievements.title")}</CardTitle>
                <CardDescription>{t("achievements.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            achievement.completed ? "bg-green-500/10" : "bg-gray-500/10"
                          }`}
                        >
                          {achievement.completed ? (
                            <Trophy className="h-5 w-5 text-green-600" />
                          ) : (
                            <Star className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{achievement.name}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={achievement.completed ? "default" : "outline"}>
                          {achievement.completed ? t("achievements.completed") : `${achievement.coins} coins`}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <RewardsHistory />
          </TabsContent>
        </Tabs>

        {/* QR Scanner Modal */}
        {isQRScannerOpen && <QRScanner onClose={() => setIsQRScannerOpen(false)} onScanSuccess={handleQRScan} />}
      </div>
    </div>
  )
}
