"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { WeaveBackground } from "@/components/ui/weave-background"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <WeaveBackground />

      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <iframe
          src="https://www.youtube.com/embed/MsSA6LayvGI?autoplay=1&mute=1&loop=1&playlist=MsSA6LayvGI&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
          title="Telangana Tourism Video"
          className="w-full h-full object-cover"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
        <div className="absolute inset-4 border border-blue-400/30 rounded-lg shadow-[0_0_50px_rgba(59,130,246,0.3)] backdrop-blur-[1px]" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance drop-shadow-2xl">
          {t("hero.title")}{" "}
          <span className="text-white drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]">{t("hero.telangana")}</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 text-pretty drop-shadow-lg">{t("hero.subtitle")}</p>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder={t("hero.searchPlaceholder")}
              className="pl-10 h-12 text-lg backdrop-blur border-0 shadow-lg bg-transparent text-white placeholder:text-gray-300"
            />
          </div>
          <Button size="lg" className="h-12 px-8 hover:bg-secondary/90 bg-primary shadow-lg">
            {t("hero.planTrip")}
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="backdrop-blur-sm bg-black/30 border border-white/20 rounded-lg p-3">
            <div className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">50+</div>
            <div className="text-sm text-gray-200">{t("hero.touristSpots")}</div>
          </div>
          <div className="backdrop-blur-sm bg-black/30 border border-white/20 rounded-lg p-3">
            <div className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">1000+</div>
            <div className="text-sm text-gray-200">{t("hero.happyTravelers")}</div>
          </div>
          <div className="backdrop-blur-sm bg-black/30 border border-white/20 rounded-lg p-3">
            <div className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">24/7</div>
            <div className="text-sm text-gray-200">{t("hero.support")}</div>
          </div>
          <div className="backdrop-blur-sm bg-black/30 border border-white/20 rounded-lg p-3">
            <div className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">AR</div>
            <div className="text-sm text-gray-200">{t("hero.arExperience")}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
