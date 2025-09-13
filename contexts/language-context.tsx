"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "en" | "te" | "hi"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation data
const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.planTrip": "Plan Trip",
    "nav.arGuide": "AR Guide",
    "nav.rewards": "Rewards",
    "nav.safety": "Safety",
    "nav.chat": "AI Chat", // Added chat navigation translation
    "nav.settings": "Settings",

    // Hero Section
    "hero.title": "Discover the Heritage of",
    "hero.telangana": "Telangana",
    "hero.subtitle": "Plan your perfect journey through ancient temples, majestic forts, and vibrant culture",
    "hero.searchPlaceholder": "Where do you want to explore?",
    "hero.planTrip": "Plan Your Trip",
    "hero.touristSpots": "Tourist Spots",
    "hero.happyTravelers": "Happy Travelers",
    "hero.support": "Support",
    "hero.arExperience": "AR Experience",

    // Trip Planner
    "trip.title": "Plan Your Perfect Trip",
    "trip.subtitle": "Create customized itineraries based on your preferences and budget",
    "trip.budget": "Budget (₹)",
    "trip.budgetPlaceholder": "Enter your budget",
    "trip.destination": "Destination",
    "trip.destinationPlaceholder": "Select destination",
    "trip.tripType": "Trip Type",
    "trip.duration": "Duration",
    "trip.generatePlan": "Generate Trip Plan",
    "trip.aiChat": "AI Travel Assistant",
    "trip.askQuestion": "Ask me anything about Telangana tourism...",

    // AR Guide
    "ar.title": "AR Guide Experience",
    "ar.subtitle": "Explore Telangana's attractions through cutting-edge augmented reality technology",
    "ar.demoTitle": "AR Experience Demo",
    "ar.demoDescription": "Watch how our AR technology brings Telangana's heritage to life",
    "ar.cameraTitle": "Live AR Camera",
    "ar.cameraDescription": "Point your camera at landmarks to see AR overlays and information",
    "ar.readyToExplore": "Ready to Explore?",
    "ar.openCamera": "Open AR Camera",
    "ar.cameraRequired": "Camera access required for AR features",

    // Rewards
    "rewards.title": "Rewards & Coins",
    "rewards.subtitle": "Earn coins by exploring and redeem exclusive discounts",
    "rewards.totalCoins": "Total Coins",
    "rewards.scanQR": "Scan QR Code",
    "rewards.earnCoins": "Earn 50 Coins",
    "rewards.discountOffers": "Discount Offers",
    "rewards.redeemNow": "Redeem Now",

    // Safety
    "safety.title": "Travel Safety Center",
    "safety.subtitle": "Stay safe during your travels with our comprehensive safety features",
    "safety.locationSharing": "Location Sharing",
    "safety.emergencyContacts": "Emergency Contacts",
    "safety.sosButton": "SOS Emergency",
    "safety.safetyTips": "Safety Tips",

    // Settings
    "settings.title": "Settings",
    "settings.apiConfig": "OpenRouter API Configuration",
    "settings.notifications": "Notification Preferences",
    "settings.privacy": "Privacy Settings",
    "settings.profile": "Profile Settings",

    // Common
    "common.loading": "Loading...",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.close": "Close",
    "common.back": "Back",
    "common.next": "Next",
    "common.previous": "Previous",

    "tabs.earn": "Earn Coins",
    "tabs.redeem": "Redeem",
    "tabs.achievements": "Achievements",
    "tabs.history": "History",

    "earn.title": "Ways to Earn Coins",
    "earn.description": "Complete these activities to earn coins and experience points",
    "earn.scanQR": "Scan QR Codes",
    "earn.scanQRDescription": "At tourist attractions",
    "earn.scanNow": "Scan Now",
    "earn.visitAttractions": "Visit Attractions",
    "earn.visitAttractionsDescription": "Check-in at locations",
    "earn.viewMap": "View Map",
    "earn.sharePhotos": "Share Photos",
    "earn.sharePhotosDescription": "Post on social media",
    "earn.share": "Share",
    "earn.restaurantReviews": "Restaurant Reviews",
    "earn.restaurantReviewsDescription": "Rate local restaurants",
    "earn.review": "Review",

    "achievements.title": "Achievements",
    "achievements.description": "Complete challenges to earn bonus coins and unlock rewards",
    "achievements.completed": "Completed",
  },
  te: {
    // Navigation
    "nav.home": "హోమ్",
    "nav.planTrip": "యాత్ర ప్లాన్",
    "nav.arGuide": "AR గైడ్",
    "nav.rewards": "రివార్డ్స్",
    "nav.safety": "భద్రత",
    "nav.chat": "AI చాట్", // Added Telugu translation for chat
    "nav.settings": "సెట్టింగ్స్",

    // Hero Section
    "hero.title": "వారసత్వాన్ని కనుగొనండి",
    "hero.telangana": "తెలంగాణ",
    "hero.subtitle": "పురాతన దేవాలయాలు, గొప్ప కోటలు మరియు జీవంత సంస్కృతి ద్వారా మీ పరిపూర్ణ యాత్రను ప్లాన్ చేయండి",
    "hero.searchPlaceholder": "మీరు ఎక్కడ అన్వేషించాలనుకుంటున్నారు?",
    "hero.planTrip": "మీ యాత్రను ప్లాన్ చేయండి",
    "hero.touristSpots": "పర్యాటక స్థలాలు",
    "hero.happyTravelers": "సంతోషకరమైన యాత్రికులు",
    "hero.support": "మద్దతు",
    "hero.arExperience": "AR అనుభవం",

    // Trip Planner
    "trip.title": "మీ పరిపూర్ణ యాత్రను ప్లాన్ చేయండి",
    "trip.subtitle": "మీ ప్రాధాన్యతలు మరియు బడ్జెట్ ఆధారంగా అనుకూలీకృత ప్రయాణ ప్రణాళికలను సృష్టించండి",
    "trip.budget": "బడ్జెట్ (₹)",
    "trip.budgetPlaceholder": "మీ బడ్జెట్ను నమోదు చేయండి",
    "trip.destination": "గమ్యస్థానం",
    "trip.destinationPlaceholder": "గమ్యస్థానాన్ని ఎంచుకోండి",
    "trip.tripType": "యాత్ర రకం",
    "trip.duration": "వ్యవధి",
    "trip.generatePlan": "యాత్ర ప్రణాళికను రూపొందించండి",
    "trip.aiChat": "AI ప్రయాణ సహాయకుడు",
    "trip.askQuestion": "తెలంగాణ పర్యాటకం గురించి ఏదైనా అడగండి...",

    // AR Guide
    "ar.title": "AR గైడ్ అనుభవం",
    "ar.subtitle": "అత్యాధునిక ఆగ్మెంటెడ్ రియాలిటీ టెక్నాలజీ ద్వారా తెలంగాణ ఆకర్షణలను అన్వేషించండి",
    "ar.demoTitle": "AR అనుభవ డెమో",
    "ar.demoDescription": "మా AR టెక్నాలజీ తెలంగాణ వారసత్వాన్ని ఎలా జీవంతం చేస్తుందో చూడండి",
    "ar.cameraTitle": "లైవ్ AR కెమెరా",
    "ar.cameraDescription": "AR ఓవర్‌లేలు మరియు సమాచారాన్ని చూడటానికి మీ కెమెరాను ల్యాండ్‌మార్క్‌లపై చూపండి",
    "ar.readyToExplore": "అన్వేషించడానికి సిద్ధంగా ఉన్నారా?",
    "ar.openCamera": "AR కెమెరాను తెరవండి",
    "ar.cameraRequired": "AR ఫీచర్లకు కెమెరా యాక్సెస్ అవసరం",

    // Rewards
    "rewards.title": "రివార్డ్స్ & కాయిన్స్",
    "rewards.subtitle": "అన్వేషించడం ద్వారా కాయిన్స్ సంపాదించండి మరియు ప్రత్యేక డిస్కౌంట్లను రీడీమ్ చేయండి",
    "rewards.totalCoins": "మొత్తం కాయిన్స్",
    "rewards.scanQR": "QR కోడ్ స్కాన్ చేయండి",
    "rewards.earnCoins": "50 కాయిన్స్ సంపాదించండి",
    "rewards.discountOffers": "డిస్కౌంట్ ఆఫర్లు",
    "rewards.redeemNow": "ఇప్పుడే రీడీమ్ చేయండి",

    // Safety
    "safety.title": "ప్రయాణ భద్రతా కేంద్రం",
    "safety.subtitle": "మా సమగ్ర భద్రతా ఫీచర్లతో మీ ప్రయాణాలలో సురక్షితంగా ఉండండి",
    "safety.locationSharing": "లొకేషన్ షేరింగ్",
    "safety.emergencyContacts": "అత్యవసర పరిచయాలు",
    "safety.sosButton": "SOS అత్యవసరం",
    "safety.safetyTips": "భద్రతా చిట్కాలు",

    // Settings
    "settings.title": "సెట్టింగ్స్",
    "settings.apiConfig": "OpenRouter API కాన్ఫిగరేషన్",
    "settings.notifications": "నోటిఫికేషన్ ప్రాధాన్యతలు",
    "settings.privacy": "గోప్యతా సెట్టింగ్స్",
    "settings.profile": "ప్రొఫైల్ సెట్టింగ్స్",

    // Common
    "common.loading": "లోడ్ అవుతోంది...",
    "common.save": "సేవ్ చేయండి",
    "common.cancel": "రద్దు చేయండి",
    "common.close": "మూసివేయండి",
    "common.back": "వెనుకకు",
    "common.next": "తదుపరి",
    "common.previous": "మునుపటి",

    "tabs.earn": "కాయిన్స్ సంపాదించండి",
    "tabs.redeem": "రీడీమ్ చేయండి",
    "tabs.achievements": "విజయాలు",
    "tabs.history": "చరిత్ర",

    "earn.title": "కాయిన్స్ సంపాదించే మార్గాలు",
    "earn.description": "కాయిన్స్ మరియు అనుభవ పాయింట్లను సంపాదించడానికి ఈ కార్యకలాపాలను పూర్తి చేయండి",
    "earn.scanQR": "QR కోడ్లను స్కాన్ చేయండి",
    "earn.scanQRDescription": "పర్యాటక ఆకర్షణలలో",
    "earn.scanNow": "ఇప్పుడే స్కాన్ చేయండి",
    "earn.visitAttractions": "ఆకర్షణలను సందర్శించండి",
    "earn.visitAttractionsDescription": "లొకేషన్లలో చెక్-ఇన్ చేయండి",
    "earn.viewMap": "మ్యాప్ చూడండి",
    "earn.sharePhotos": "ఫోటోలను షేర్ చేయండి",
    "earn.sharePhotosDescription": "సోషల్ మీడియాలో పోస్ట్ చేయండి",
    "earn.share": "షేర్ చేయండి",
    "earn.restaurantReviews": "రెస్టారెంట్ రివ్యూలు",
    "earn.restaurantReviewsDescription": "స్థానిక రెస్టారెంట్లను రేట్ చేయండి",
    "earn.review": "రివ్యూ చేయండి",

    "achievements.title": "విజయాలు",
    "achievements.description": "బోనస్ కాయిన్స్ సంపాదించడానికి మరియు రివార్డ్లను అన్‌లాక్ చేయడానికి సవాళ్లను పూర్తి చేయండి",
    "achievements.completed": "పూర్తయింది",
  },
  hi: {
    // Navigation
    "nav.home": "होम",
    "nav.planTrip": "यात्रा प्लान",
    "nav.arGuide": "AR गाइड",
    "nav.rewards": "रिवार्ड्स",
    "nav.safety": "सुरक्षा",
    "nav.chat": "AI चैट", // Added Hindi translation for chat
    "nav.settings": "सेटिंग्स",

    // Hero Section
    "hero.title": "विरासत की खोज करें",
    "hero.telangana": "तेलंगाना",
    "hero.subtitle": "प्राचीन मंदिरों, भव्य किलों और जीवंत संस्कृति के माध्यम से अपनी परफेक्ट यात्रा की योजना बनाएं",
    "hero.searchPlaceholder": "आप कहाँ एक्सप्लोर करना चाहते हैं?",
    "hero.planTrip": "अपनी यात्रा प्लान करें",
    "hero.touristSpots": "पर्यटन स्थल",
    "hero.happyTravelers": "खुश यात्री",
    "hero.support": "सहायता",
    "hero.arExperience": "AR अनुभव",

    // Trip Planner
    "trip.title": "अपनी परफेक्ट यात्रा प्लान करें",
    "trip.subtitle": "अपनी प्राथमिकताओं और बजट के आधार पर कस्टमाइज़्ड यात्रा योजना बनाएं",
    "trip.budget": "बजट (₹)",
    "trip.budgetPlaceholder": "अपना बजट दर्ज करें",
    "trip.destination": "गंतव्य",
    "trip.destinationPlaceholder": "गंतव्य चुनें",
    "trip.tripType": "यात्रा का प्रकार",
    "trip.duration": "अवधि",
    "trip.generatePlan": "यात्रा योजना बनाएं",
    "trip.aiChat": "AI यात्रा सहायक",
    "trip.askQuestion": "तेलंगाना पर्यटन के बारे में कुछ भी पूछें...",

    // AR Guide
    "ar.title": "AR गाइड अनुभव",
    "ar.subtitle": "अत्याधुनिक ऑगमेंटेड रियलिटी तकनीक के माध्यम से तेलंगाना के आकर्षणों का अन्वेषण करें",
    "ar.demoTitle": "AR अनुभव डेमो",
    "ar.demoDescription": "देखें कि हमारी AR तकनीक तेलंगाना की विरासत को कैसे जीवंत बनाती है",
    "ar.cameraTitle": "लाइव AR कैमरा",
    "ar.cameraDescription": "AR ओवरले और जानकारी देखने के लिए अपने कैमरे को लैंडमार्क पर पॉइंट करें",
    "ar.readyToExplore": "एक्सप्लोर करने के लिए तैयार हैं?",
    "ar.openCamera": "AR कैमरा खोलें",
    "ar.cameraRequired": "AR फीचर्स के लिए कैमरा एक्सेस आवश्यक है",

    // Rewards
    "rewards.title": "रिवार्ड्स और कॉइन्स",
    "rewards.subtitle": "एक्सप्लोर करके कॉइन्स कमाएं और एक्सक्लूसिव डिस्काउंट रिडीम करें",
    "rewards.totalCoins": "कुल कॉइन्स",
    "rewards.scanQR": "QR कोड स्कैन करें",
    "rewards.earnCoins": "50 कॉइन्स कमाएं",
    "rewards.discountOffers": "डिस्काउंट ऑफर्स",
    "rewards.redeemNow": "अभी रिडीम करें",

    // Safety
    "safety.title": "यात्रा सुरक्षा केंद्र",
    "safety.subtitle": "हमारी व्यापक सुरक्षा सुविधाओं के साथ अपनी यात्राओं के दौरान सुरक्षित रहें",
    "safety.locationSharing": "लोकेशन शेयरिंग",
    "safety.emergencyContacts": "आपातकालीन संपर्क",
    "safety.sosButton": "SOS आपातकाल",
    "safety.safetyTips": "सुरक्षा टिप्स",

    // Settings
    "settings.title": "सेटिंग्स",
    "settings.apiConfig": "OpenRouter API कॉन्फ़िगरेशन",
    "settings.notifications": "नोटिफिकेशन प्राथमिकताएं",
    "settings.privacy": "प्राइवेसी सेटिंग्स",
    "settings.profile": "प्रोफाइल सेटिंग्स",

    // Common
    "common.loading": "लोड हो रहा है...",
    "common.save": "सेव करें",
    "common.cancel": "रद्द करें",
    "common.close": "बंद करें",
    "common.back": "वापस",
    "common.next": "अगला",
    "common.previous": "पिछला",

    "tabs.earn": "कॉइन्स कमाएं",
    "tabs.redeem": "रिडीम करें",
    "tabs.achievements": "उपलब्धियां",
    "tabs.history": "इतिहास",

    "earn.title": "कॉइन्स कमाने के तरीके",
    "earn.description": "कॉइन्स और एक्सपीरियंस पॉइंट्स कमाने के लिए इन गतिविधियों को पूरा करें",
    "earn.scanQR": "QR कोड स्कैन करें",
    "earn.scanQRDescription": "पर्यटन आकर्षणों पर",
    "earn.scanNow": "अभी स्कैन करें",
    "earn.visitAttractions": "आकर्षणों का दौरा करें",
    "earn.visitAttractionsDescription": "लोकेशन पर चेक-इन करें",
    "earn.viewMap": "मैप देखें",
    "earn.sharePhotos": "फोटो शेयर करें",
    "earn.sharePhotosDescription": "सोशल मीडिया पर पोस्ट करें",
    "earn.share": "शेयर करें",
    "earn.restaurantReviews": "रेस्टोरेंट रिव्यू",
    "earn.restaurantReviewsDescription": "स्थानीय रेस्टोरेंट को रेट करें",
    "earn.review": "रिव्यू करें",

    "achievements.title": "उपलब्धियां",
    "achievements.description": "बोनस कॉइन्स कमाने और रिवार्ड्स अनलॉक करने के लिए चुनौतियों को पूरा करें",
    "achievements.completed": "पूर्ण",
  },
}

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>("en")

  // Load saved language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferred_language") as Language
    if (savedLanguage && ["en", "te", "hi"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language to localStorage when changed
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("preferred_language", lang)
  }

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
