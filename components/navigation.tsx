"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, Globe, QrCode } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { QRScanner } from "@/components/qr-scanner"
import { useLanguage, type Language } from "@/contexts/language-context"

const languages = [
  { code: "en" as Language, name: "English", flag: "🇺🇸" },
  { code: "te" as Language, name: "తెలుగు", flag: "🇮🇳" },
  { code: "hi" as Language, name: "हिंदी", flag: "🇮🇳" },
]

export function Navigation() {
  const { language, setLanguage, t } = useLanguage()
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false)

  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0]

  const navItems = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.planTrip"), href: "/plan-trip" },
    { name: t("nav.arGuide"), href: "/ar-guide" },
    { name: t("nav.rewards"), href: "/rewards" },
    { name: t("nav.safety"), href: "/safety" },
    { name: t("nav.settings"), href: "/settings" },
  ]

  const handleQRScan = (coins: number) => {
    // Handle QR scan success - could show a toast notification
    console.log(`Earned ${coins} coins!`)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 min-w-fit">
            <Image
              src="/images/wanderer-logo.png"
              alt="Wanderer Logo"
              width={44}
              height={44}
              className="rounded-full ring-2 ring-primary/20"
            />
            <span className="text-xl font-bold text-primary tracking-wide whitespace-nowrap">WANDERER</span>
          </Link>

          <div className="flex-1 flex justify-end ml-8">
            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex mr-8">
              <NavigationMenuList className="gap-4">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-5 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                        {item.name}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right side actions */}
            <div className="flex items-center space-x-3">
              {/* QR Scanner */}
              <Button
                variant="ghost"
                size="icon"
                className="text-primary hover:bg-primary/10"
                onClick={() => setIsQRScannerOpen(true)}
              >
                <QrCode className="h-5 w-5" />
              </Button>

              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 hover:bg-primary/10">
                    <Globe className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {currentLanguage.flag} {currentLanguage.name}
                    </span>
                    <span className="sm:hidden">{currentLanguage.flag}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map((lang) => (
                    <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)} className="gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-4">
                    <div className="flex items-center space-x-3 pb-4 border-b">
                      <Image
                        src="/images/wanderer-logo.png"
                        alt="Wanderer Logo"
                        width={36}
                        height={36}
                        className="rounded-full ring-2 ring-primary/20"
                      />
                      <span className="text-lg font-bold text-primary tracking-wide">WANDERER</span>
                    </div>
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center py-2 text-lg hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* QR Scanner Modal */}
      {isQRScannerOpen && <QRScanner onClose={() => setIsQRScannerOpen(false)} onScanSuccess={handleQRScan} />}
    </>
  )
}
