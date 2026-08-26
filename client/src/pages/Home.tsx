/**
 * 设计提示：赤砂石的门槛——以城门、台阶与边注建立叙事路线；真实照片承担空间证据，印地语与英语绝不混排。
 */
import { BrandMark } from "@/components/BrandMark";
import { ChevronDown, CircleAlert, Clock3, ExternalLink, Languages, MapPin, Menu, MoveRight, Ticket, TrainFront, Utensils, CarFront, Plane, Landmark, Accessibility, Fuel, Store, Building2, ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";

type Language = "hi" | "en";

const images = {
  buland: "/manus-storage/buland-darwaza-wikimedia_3ec88d2b.jpg",
  courtyard: "/manus-storage/fatehpur-courtyard-unsplash_8847534b.jpg",
  diwan: "/manus-storage/fatehpur-diwan-unsplash_320bdc2e.jpg",
  archPattern: "/manus-storage/fatehpur-hero-arch-pattern_7d69fed8.png",
  jali: "/manus-storage/fatehpur-jali-pattern_5985755b.png",
  stone: "/manus-storage/fatehpur-stone-detail_6f0f1cd5.png",
  brand: "/manus-storage/fatehpur-brand-mark_de56814f.png",
};

const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6326.810449348338!2d77.66366847720768!3d27.096651076537977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397393fd030fffff%3A0x75aefa4abef7bb0c!2sFatehpur%20Sikri%20Fort!5e1!3m2!1shi!2s!4v1787621608212!5m2!1shi!2s";

const translations = {
  hi: {
    htmlLang: "hi",
    siteName: "फ़तेहपुर सीकरी",
    markLabel: "फ़तेहपुर सीकरी विरासत गाइड",
    eyebrow: "स्वतंत्र विरासत गाइड · उत्तर प्रदेश, भारत",
    nav: ["कहानी", "यात्रा की योजना", "वहाँ पहुँचें", "नक्शा", "सवाल"],
    heroKicker: "बुलंद दरवाज़े के पास",
    heroTitle: <>दरवाज़े के पार,<br /><em>एक नियोजित मुग़ल शहर।</em></>,
    heroCopy: "लाल बलुआ पत्थर, खुले आँगन और समय के साथ बनी एक राजधानी। फ़तेहपुर सीकरी को समझने के लिए एक शांत, स्वतंत्र और गैर-लाभकारी मार्गदर्शिका।",
    planVisit: "यात्रा की तैयारी",
    learnStory: "कहानी पढ़ें",
    rating: "Google Maps पर 4.5/5 · 43,565 समीक्षाएँ",
    photoCredit: "मुख्य चित्र: Buland Darwaza, Fatehpur Sikri · Wikimedia Commons",
    landmarkLabel: "विश्व धरोहर परिसर",
    quickFacts: [
      ["स्थान", "आगरा ज़िला, उत्तर प्रदेश"],
      ["समय", "सूर्योदय से सूर्यास्त तक"],
      ["अनुशंसित समय", "कम-से-कम आधा दिन"],
    ],
    introNumber: "01 — पृष्ठभूमि",
    introTitle: "विजय की नगरी, जो एक दशक के लिए राजधानी बनी।",
    introBody: "सम्राट अकबर ने 16वीं शताब्दी के उत्तरार्ध में इस पहाड़ी किनारे पर फ़तेहपुर सीकरी बसाई। यह मुग़ल साम्राज्य की राजधानी लगभग एक दशक रही और आज अपने महलों, सार्वजनिक भवनों, मस्जिदों तथा एकीकृत नगर नियोजन के लिए यूनेस्को विश्व धरोहर है।",
    introQuote: "“बुलंद दरवाज़ा” — ऊँचा द्वार — जामा मस्जिद के दक्षिणी आँगन तक पहुँचने वाला स्मारकीय प्रवेश है।",
    heritageSource: "यूनेस्को विश्व धरोहर सूची",
    storyCards: [
      ["1571–1573", "निर्माण और राजधानी", "अकबर के शासन में यह मुग़लों का पहला नियोजित नगर बना।"],
      ["1575", "बुलंद दरवाज़ा", "गुजरात की विजय की स्मृति में बना विशाल प्रवेश-द्वार।"],
      ["1585", "राजधानी का स्थानांतरण", "दरबार लाहौर चला गया; परिसर शाही यात्राओं का स्थल बना रहा।"],
    ],
    architectureTag: "लाल पत्थर में रची परतें",
    architectureTitle: "यहाँ की भाषा केवल एक शैली नहीं, कई परंपराओं का संवाद है।",
    architectureBody: "स्तंभ, छतरियाँ, झरोखे, मेहराब और जालीदार परदे स्थानीय शिल्प परंपराओं को फ़ारसी प्रभावों के साथ जोड़ते हैं। जामा मस्जिद, पंच महल, दीवान-ए-आम और दीवान-ए-ख़ास के बीच चलते हुए उसी मिश्रित स्थापत्य व्याकरण को पढ़ा जा सकता है।",
    detailsKicker: "02 — यात्रा की तैयारी",
    detailsTitle: "जाने से पहले आवश्यक बातें",
    feeTitle: "प्रवेश और शुल्क",
    feeBody: "भारतीय पुरातत्व सर्वेक्षण के अनुसार परिसर सूर्योदय से सूर्यास्त तक खुला रहता है। शुल्क और ऑनलाइन/काउंटर व्यवस्था बदल सकती है; यात्रा से पहले आधिकारिक स्रोत या टिकट काउंटर से पुनः जाँच करें। 15 वर्ष से कम आयु के बच्चों के लिए प्रवेश निःशुल्क बताया गया है।",
    feeNote: "दरें व संचालन-नियम बदल सकते हैं—इन्हें अंतिम आधिकारिक सूचना न मानें।",
    bestTitle: "सर्वोत्तम समय और ठहराव",
    bestBody: "सुबह का समय अपेक्षाकृत शांत और छाया के लिए अनुकूल रहता है। देर दोपहर लाल पत्थर के रंगों को देखने का अवसर दे सकती है। महल परिसर और जामा मस्जिद क्षेत्र को समझकर देखने के लिए कम-से-कम आधा दिन रखें।",
    comfortTitle: "सुविधाएँ और जिम्मेदार तैयारी",
    comfortBody: "शौचालय, पानी और निर्धारित सहायता सेवाओं की उपलब्धता स्थान व समय के अनुसार बदल सकती है। धूप से बचाव, पीने का पानी और आरामदायक जूते साथ रखें। धार्मिक क्षेत्र में शांतिपूर्वक व्यवहार करें और स्थानीय नियमों का सम्मान करें।",
    helpItems: [
      ["चलना", "सीढ़ियाँ और असमतल सतहें मिल सकती हैं।"],
      ["पार्किंग", "निर्धारित सार्वजनिक पार्किंग क्षेत्र व संकेतों का उपयोग करें।"],
      ["भोजन", "आसपास स्थानीय भोजन और जलपान के प्रकार मिल सकते हैं; स्वतंत्र रूप से जाँचें।"],
      ["ईंधन/खरीद", "रास्ते में सामान्य ईंधन, चार्जिंग और दैनिक-जरूरत सेवाएँ मिल सकती हैं।"],
    ],
    transportKicker: "03 — वहाँ पहुँचें",
    transportTitle: "आगरा या भरतपुर से, विरासत परिसर की ओर",
    transportIntro: "फ़तेहपुर सीकरी आगरा से लगभग 37 किमी और भरतपुर से लगभग 18 किमी दूर है। यह खंड केवल परिवहन के प्रकार बताता है; किसी निजी संचालक, दुकान या ठहरने की जगह की सिफारिश नहीं करता।",
    transportCards: [
      ["हवाई मार्ग", "आगरा का हवाई संपर्क उपयोगी हो सकता है; उपलब्ध उड़ानों और आगे की सड़क-यात्रा की पुष्टि पहले करें।"],
      ["रेल", "आगरा कैंट प्रमुख रेल केंद्र है। वहाँ से आगे टैक्सी या बस जैसे स्थानीय सड़क विकल्पों पर विचार करें।"],
      ["बस", "आगरा से फ़तेहपुर सीकरी दिशा में बस सेवाएँ मिल सकती हैं। समय और स्टॉप पहले सत्यापित करें।"],
      ["टैक्सी / सड़क", "आगरा या भरतपुर से दिन-यात्रा के लिए वाहन एक व्यावहारिक विकल्प हो सकता है; किराया और लौटने की व्यवस्था पहले तय करें।"],
    ],
    nearbyKicker: "04 — आसपास समझें",
    nearbyTitle: "एक दिन, कई परतें",
    nearbyCards: [
      ["परिसर के भीतर", "जामा मस्जिद, शेख सलीम चिश्ती का मकबरा, पंच महल, दीवान-ए-आम और दीवान-ए-ख़ास को समय देकर देखें।"],
      ["आगरा क्षेत्र", "ताजमहल और आगरा किला जैसे संरक्षित ऐतिहासिक स्थलों के साथ दिन-यात्रा की योजना बनाई जा सकती है।"],
      ["भरतपुर दिशा", "भरतपुर से आने वाले यात्री मार्ग और समय की स्थितियों की जाँच कर विरासत यात्रा को संयोजित कर सकते हैं।"],
    ],
    mapKicker: "05 — स्थान",
    mapTitle: "बुलंद दरवाज़ा, दादूपुरा",
    mapBody: "नक्शा केवल स्थान-समझ के लिए है। दिशा, सड़क की स्थिति, स्थानीय आवागमन और प्रवेश व्यवस्था यात्रा से पहले सत्यापित करें।",
    openMap: "Google Maps में खोलें",
    faqKicker: "06 — सामान्य प्रश्न",
    faqTitle: "यात्रा से पहले अक्सर पूछे जाने वाले प्रश्न",
    faq: [
      ["फ़तेहपुर सीकरी कब खुलती है?", "भारतीय पुरातत्व सर्वेक्षण इसे सूर्योदय से सूर्यास्त तक खुला बताता है। समय बदल सकता है, इसलिए उसी दिन आधिकारिक जाँच उपयोगी है।"],
      ["मुझे यहाँ कितना समय देना चाहिए?", "महल परिसर और जामा मस्जिद क्षेत्र को समझकर देखने के लिए कम-से-कम आधे दिन की योजना सुविधाजनक रहती है।"],
      ["बुलंद दरवाज़ा किसलिए प्रसिद्ध है?", "यह जामा मस्जिद परिसर का विशाल प्रवेश-द्वार है। यूनेस्को के अनुसार यह गुजरात विजय की स्मृति में पूरा किया गया था और इसकी ऊँचाई लगभग 40 मीटर है।"],
      ["क्या आगरा से दिन-यात्रा संभव है?", "हाँ, आधिकारिक उत्तर प्रदेश पर्यटन सामग्री इसे आगरा से सुलभ दिन-यात्रा के रूप में बताती है। वास्तविक यात्रा समय यातायात और वाहन पर निर्भर करेगा।"],
    ],
    resourcesKicker: "स्रोत और उत्तरदायित्व",
    resourcesTitle: "खुली जानकारी, स्वतंत्र प्रस्तुति",
    resourcesBody: "इतिहास और व्यावहारिक संकेत विश्वसनीय सार्वजनिक स्रोतों के आधार पर संकलित किए गए हैं। महत्वपूर्ण निर्णयों, टिकट, समय, पहुँच और स्थानीय नियमों के लिए हमेशा आधिकारिक चैनल देखें।",
    sources: [
      ["यूनेस्को", "विश्व धरोहर सूची और असाधारण सार्वभौमिक मूल्य"],
      ["भारतीय पुरातत्व सर्वेक्षण", "फ़तेहपुर सीकरी: समय, प्रवेश और संग्रहालय सूचना"],
      ["उत्तर प्रदेश पर्यटन", "आगरा से यात्रा और स्थल-विवरण"],
    ],
    footerTag: "स्वतंत्र, गैर-लाभकारी आगंतुक सूचना परियोजना",
    footerStatement: "यह एक स्वतंत्र, गैर-लाभकारी आगंतुक सूचना गाइड है। इसका किसी सरकारी निकाय, आधिकारिक संगठन या वाणिज्यिक संचालक से संबंध नहीं है।",
    footerResearch: "संदर्भित जानकारी यूनेस्को, भारतीय पुरातत्व सर्वेक्षण तथा उत्तर प्रदेश के सार्वजनिक पर्यटन स्रोतों से जाँची गई है; इसमें व्यावसायिक अनुशंसा शामिल नहीं है।",
    photoRights: "चित्र-अधिकार संबंधित मूल फोटोग्राफरों के पास रहते हैं; प्रत्येक चित्र अपने स्रोत के साथ प्रस्तुत है।",
    legal: ["गोपनीयता", "सेवा शर्तें", "कुकी सेटिंग"],
    copy: "© 2026 फ़तेहपुर सीकरी विरासत गाइड",
    skip: "मुख्य सामग्री पर जाएँ",
    language: "EN",
    backTop: "ऊपर जाएँ",
  },
  en: {
    htmlLang: "en",
    siteName: "Fatehpur Sikri",
    markLabel: "Fatehpur Sikri Heritage Guide",
    eyebrow: "Independent heritage guide · Uttar Pradesh, India",
    nav: ["Story", "Plan a visit", "Getting there", "Map", "FAQ"],
    heroKicker: "By Buland Darwaza",
    heroTitle: <>Beyond the gateway,<br /><em>a planned Mughal city.</em></>,
    heroCopy: "Red sandstone, generous courtyards and a capital shaped by time. A calm, independent, nonprofit guide to understanding Fatehpur Sikri.",
    planVisit: "Plan your visit",
    learnStory: "Read the story",
    rating: "4.5/5 on Google Maps · 43,565 reviews",
    photoCredit: "Hero image: Buland Darwaza, Fatehpur Sikri · Wikimedia Commons",
    landmarkLabel: "World Heritage complex",
    quickFacts: [
      ["Location", "Agra District, Uttar Pradesh"],
      ["Hours", "Sunrise to sunset"],
      ["Allow", "At least half a day"],
    ],
    introNumber: "01 — Context",
    introTitle: "A city of victory that became a capital for a decade.",
    introBody: "Emperor Akbar founded Fatehpur Sikri on this ridge in the later 16th century. It served as the Mughal capital for about a decade and is now a UNESCO World Heritage site, recognized for its palaces, public buildings, mosques and coherent urban plan.",
    introQuote: "Buland Darwaza — the Lofty Gate — is the monumental entrance rising towards the southern court of Jama Masjid.",
    heritageSource: "UNESCO World Heritage List",
    storyCards: [
      ["1571–1573", "Construction and capital", "Under Akbar, it developed as the first planned city of the Mughals."],
      ["1575", "Buland Darwaza", "A monumental gateway completed to commemorate the victory of Gujarat."],
      ["1585", "Capital relocated", "The court moved to Lahore; the complex remained a place of imperial visits."],
    ],
    architectureTag: "Layers in red stone",
    architectureTitle: "Its language is not one style, but a conversation across traditions.",
    architectureBody: "Columns, chhatris, jharokhas, arches and pierced screens bring local craft traditions into dialogue with Persian influences. Move between Jama Masjid, Panch Mahal, Diwan-i-Am and Diwan-i-Khas to read that blended architectural grammar.",
    detailsKicker: "02 — Plan a visit",
    detailsTitle: "Useful things to know before you go",
    feeTitle: "Entry and fees",
    feeBody: "The Archaeological Survey of India states that the complex is open from sunrise to sunset. Fees and online/counter arrangements may change; recheck with an official source or the ticket counter before travel. Entry for children under 15 is listed as free.",
    feeNote: "Fees and operating rules can change; do not treat this as final official notice.",
    bestTitle: "Best time and duration",
    bestBody: "Morning can be calmer and kinder for shade. Late afternoon may reveal the warmth of the red sandstone. Allow at least half a day to explore the palace complex and the Jama Masjid area with context.",
    comfortTitle: "Facilities and considerate preparation",
    comfortBody: "Availability of toilets, water and designated assistance may vary by time and location. Bring sun protection, drinking water and comfortable shoes. Behave quietly in religious spaces and follow local instructions.",
    helpItems: [
      ["Walking", "Expect steps and uneven surfaces in parts of the complex."],
      ["Parking", "Use designated public parking areas and follow signs on arrival."],
      ["Food", "Local food and refreshment types may be available nearby; check independently."],
      ["Fuel / essentials", "General fuel, charging and everyday-service options may occur along the route."],
    ],
    transportKicker: "03 — Getting there",
    transportTitle: "Towards the heritage complex from Agra or Bharatpur",
    transportIntro: "Fatehpur Sikri is about 37 km from Agra and 18 km from Bharatpur. This section describes transport types only; it does not recommend specific private operators, shops or accommodation.",
    transportCards: [
      ["By air", "Agra’s air links may be useful; confirm active flights and the onward road journey before travelling."],
      ["By rail", "Agra Cantt is a major rail hub. From there, consider local road options such as taxi or bus."],
      ["By bus", "Bus services toward Fatehpur Sikri may operate from Agra. Verify timetables and stops before setting out."],
      ["Taxi / road", "A vehicle from Agra or Bharatpur can be practical for a day visit; agree fare and return arrangements in advance."],
    ],
    nearbyKicker: "04 — See more nearby",
    nearbyTitle: "One day, several layers",
    nearbyCards: [
      ["Within the complex", "Give time to Jama Masjid, the Tomb of Sheikh Salim Chishti, Panch Mahal, Diwan-i-Am and Diwan-i-Khas."],
      ["Agra area", "A wider heritage day can include protected historic places such as the Taj Mahal and Agra Fort."],
      ["Bharatpur direction", "Travellers arriving via Bharatpur can combine the route with a heritage itinerary after checking road and timing conditions."],
    ],
    mapKicker: "05 — Location",
    mapTitle: "Buland Darwaza, Dadupura",
    mapBody: "This map is for orientation. Confirm directions, road conditions, local transit and access arrangements before your trip.",
    openMap: "Open in Google Maps",
    faqKicker: "06 — FAQ",
    faqTitle: "Questions often asked before a visit",
    faq: [
      ["When is Fatehpur Sikri open?", "The Archaeological Survey of India lists it as open from sunrise to sunset. Times may vary, so an official same-day check is useful."],
      ["How much time should I allow?", "At least half a day is a comfortable allowance for exploring the palace complex and Jama Masjid area with context."],
      ["Why is Buland Darwaza significant?", "It is the vast gateway to the Jama Masjid precinct. UNESCO describes it as completed to commemorate the victory of Gujarat, at about 40 metres in height."],
      ["Can I visit from Agra in a day?", "Yes. Official Uttar Pradesh tourism material describes it as an accessible day trip from Agra. Actual journey time depends on traffic and transport."],
    ],
    resourcesKicker: "Sources and responsibility",
    resourcesTitle: "Open information, independent presentation",
    resourcesBody: "Historical notes and practical cues are compiled from credible public sources. Always consult official channels for consequential decisions, tickets, timing, access and local regulations.",
    sources: [
      ["UNESCO", "World Heritage List and Outstanding Universal Value"],
      ["Archaeological Survey of India", "Fatehpur Sikri: hours, admission and museum information"],
      ["Uttar Pradesh Tourism", "Journey information from Agra and site overview"],
    ],
    footerTag: "Independent, nonprofit visitor information project",
    footerStatement: "This is an independent, nonprofit visitor information guide. It is not affiliated with any government body, official organization or commercial operator.",
    footerResearch: "Information has been cross-checked against public materials from UNESCO, the Archaeological Survey of India and Uttar Pradesh tourism sources; it contains no commercial recommendations.",
    photoRights: "Image rights remain with the respective original photographers; each image is presented with its source attribution.",
    legal: ["Privacy", "Terms of use", "Cookie settings"],
    copy: "© 2026 Fatehpur Sikri Heritage Guide",
    skip: "Skip to main content",
    language: "हिं",
    backTop: "Back to top",
  },
} as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionMark({ number, label }: { number: string; label: string }) {
  return <p className="section-mark"><span>{number}</span>{label}</p>;
}

export default function Home() {
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem("fs-language") as Language) || "hi");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = translations[language];

  useEffect(() => {
    localStorage.setItem("fs-language", language);
    document.documentElement.lang = t.htmlLang;
    document.title = language === "hi" ? "फ़तेहपुर सीकरी — स्वतंत्र विरासत गाइड" : "Fatehpur Sikri — Independent Heritage Guide";
  }, [language, t.htmlLang]);

  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristAttraction",
        name: "Fatehpur Sikri / Buland Darwaza",
        alternateName: "फ़तेहपुर सीकरी / बुलंद दरवाज़ा",
        address: { "@type": "PostalAddress", streetAddress: "Buland Gate, Dadupura", addressLocality: "Fatehpur Sikri", addressRegion: "Uttar Pradesh", postalCode: "283110", addressCountry: "IN" },
        geo: { "@type": "GeoCoordinates", latitude: 27.0966511, longitude: 77.6636685 },
        openingHours: "Open from sunrise to sunset",
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.5", reviewCount: "43565" },
        image: images.buland,
      },
      {
        "@type": "FAQPage",
        mainEntity: t.faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
      },
    ],
  }), [t.faq]);

  const navIds = ["story", "visit", "transport", "map", "faq"];
  const utilities = [Accessibility, CarFront, Utensils, Fuel];
  const transportIcons = [Plane, TrainFront, Menu, CarFront];

  return (
    <div className="site-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <a className="skip-link" href="#main">{t.skip}</a>

      <header className="site-header" aria-label={t.siteName}>
        <a href="#top" className="brand" onClick={(event) => { event.preventDefault(); scrollTo("top"); }}>
          <img className="brand-image" src={images.brand} alt="" aria-hidden="true" />
          <span className="brand-wordmark"><strong>{t.siteName}</strong><small>{language === "hi" ? "विरासत गाइड" : "HERITAGE GUIDE"}</small></span>
        </a>
        <nav className={menuOpen ? "main-nav main-nav-open" : "main-nav"} aria-label={language === "hi" ? "मुख्य नेविगेशन" : "Primary navigation"}>
          {t.nav.map((item, index) => <button key={item} onClick={() => { scrollTo(navIds[index]); setMenuOpen(false); }}>{item}</button>)}
        </nav>
        <div className="header-actions">
          <button className="language-button" onClick={() => setLanguage(language === "hi" ? "en" : "hi")} aria-label={language === "hi" ? "Switch to English" : "हिंदी में बदलें"}><Languages size={15} />{t.language}</button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={language === "hi" ? "मेनू" : "Menu"}><Menu size={20} /></button>
        </div>
      </header>

      <main id="main">
        <section id="top" className="hero-section">
          <div className="hero-pattern" style={{ backgroundImage: `url(${images.archPattern})` }} aria-hidden="true" />
          <div className="hero-copy-wrap">
            <p className="eyebrow">{t.eyebrow}</p>
            <div className="hero-title">{t.heroTitle}</div>
            <p className="hero-copy">{t.heroCopy}</p>
            <div className="hero-actions">
              <button className="button-primary" onClick={() => scrollTo("visit")}>{t.planVisit}<MoveRight size={18} /></button>
              <button className="text-action" onClick={() => scrollTo("story")}>{t.learnStory}<span>↘</span></button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="arch-frame">
              <img src={images.buland} alt={language === "hi" ? "फ़तेहपुर सीकरी का बुलंद दरवाज़ा" : "Buland Darwaza at Fatehpur Sikri"} />
            </div>
            <p className="image-credit">{t.photoCredit}</p>
          </div>
          <div className="hero-facts" aria-label={t.landmarkLabel}>
            <p>{t.landmarkLabel}</p>
            <div className="facts-grid">{t.quickFacts.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
          </div>
        </section>

        <section id="story" className="story-section section-padding">
          <div className="content-rail">
            <SectionMark number="01" label={t.introNumber.replace("01 — ", "")} />
            <div className="story-intro">
              <h2>{t.introTitle}</h2>
              <div><p>{t.introBody}</p><a href="https://whc.unesco.org/en/list/255/" target="_blank" rel="noreferrer">{t.heritageSource}<ArrowUpRight size={15} /></a></div>
            </div>
            <blockquote>{t.introQuote}</blockquote>
            <div className="story-timeline">{t.storyCards.map(([date, title, body]) => <article key={date}><p>{date}</p><h3>{title}</h3><span>{body}</span></article>)}</div>
          </div>
        </section>

        <section className="architecture-section" style={{ backgroundImage: `url(${images.jali})` }}>
          <div className="architecture-copy"><p className="eyebrow">{t.architectureTag}</p><h2>{t.architectureTitle}</h2><p>{t.architectureBody}</p></div>
          <figure className="stone-figure"><img src={images.stone} alt="" /><figcaption>{language === "hi" ? "रेत-पत्थर की बनावट से प्रेरित सजावटी दृश्य" : "Decorative visual inspired by sandstone texture"}</figcaption></figure>
        </section>

        <section id="visit" className="visit-section section-padding">
          <div className="section-heading"><SectionMark number="02" label={t.detailsKicker.replace("02 — ", "")} /><h2>{t.detailsTitle}</h2></div>
          <div className="visit-layout">
            <article className="feature-card fee-card"><div className="card-icon"><Ticket size={20} /></div><h3>{t.feeTitle}</h3><p>{t.feeBody}</p><div className="note"><CircleAlert size={16} />{t.feeNote}</div></article>
            <div className="visit-stack"><article className="plain-card"><Clock3 size={18} /><div><h3>{t.bestTitle}</h3><p>{t.bestBody}</p></div></article><article className="plain-card"><Landmark size={18} /><div><h3>{t.comfortTitle}</h3><p>{t.comfortBody}</p></div></article></div>
          </div>
          <div className="utility-grid">{t.helpItems.map(([title, body], index) => { const Icon = utilities[index]; return <article key={title}><Icon size={18} /><h3>{title}</h3><p>{body}</p></article>; })}</div>
        </section>

        <section id="transport" className="transport-section section-padding">
          <div className="section-heading side-heading"><SectionMark number="03" label={t.transportKicker.replace("03 — ", "")} /><h2>{t.transportTitle}</h2><p>{t.transportIntro}</p></div>
          <div className="transport-grid">{t.transportCards.map(([title, body], index) => { const Icon = transportIcons[index]; return <article key={title}><span className="transport-index">0{index + 1}</span><Icon size={21} /><h3>{title}</h3><p>{body}</p></article>; })}</div>
        </section>

        <section className="nearby-section section-padding">
          <div className="nearby-image"><img src={images.courtyard} alt={language === "hi" ? "फ़तेहपुर सीकरी परिसर का लाल पत्थर का आँगन" : "Red sandstone courtyard at Fatehpur Sikri"} /><p className="image-credit">{language === "hi" ? "चित्र: वास्तविक फ़ोटोग्राफ़ · Unsplash" : "Photo: real photography · Unsplash"}</p></div>
          <div className="nearby-content"><SectionMark number="04" label={t.nearbyKicker.replace("04 — ", "")} /><h2>{t.nearbyTitle}</h2><div>{t.nearbyCards.map(([title, body]) => <article key={title}><span>↗</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></div>
        </section>

        <section id="map" className="map-section section-padding">
          <div className="map-copy"><SectionMark number="05" label={t.mapKicker.replace("05 — ", "")} /><h2>{t.mapTitle}</h2><p>{t.mapBody}</p><a className="map-link" href="https://maps.app.goo.gl/4fcjp1yYQ3WQsXm88" target="_blank" rel="noreferrer"><MapPin size={18} />{t.openMap}<ExternalLink size={14} /></a></div>
          <div className="map-frame"><iframe title={t.mapTitle} src={mapSrc} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
        </section>

        <section id="faq" className="faq-section section-padding">
          <div className="section-heading"><SectionMark number="06" label={t.faqKicker.replace("06 — ", "")} /><h2>{t.faqTitle}</h2></div>
          <div className="faq-list">{t.faq.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<ChevronDown size={20} /></summary><p>{answer}</p></details>)}</div>
        </section>

        <section className="sources-section section-padding">
          <div><p className="eyebrow">{t.resourcesKicker}</p><h2>{t.resourcesTitle}</h2><p>{t.resourcesBody}</p></div>
          <div className="source-list">{t.sources.map(([name, description], index) => <a key={name} href={["https://whc.unesco.org/en/list/255/", "https://asi.nic.in/pages/WorldHeritageFatehpurSikri", "https://www.tajmahal.gov.in/fatehpur-sikri.aspx"][index]} target="_blank" rel="noreferrer"><span>0{index + 1}</span><div><h3>{name}</h3><p>{description}</p></div><ArrowUpRight size={17} /></a>)}</div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand"><BrandMark className="footer-mark" title={t.markLabel} /><div><p>{t.footerTag}</p><h2>{t.siteName}</h2></div></div>
        <div className="footer-notes"><p>{t.footerStatement}</p><p>{t.footerResearch}</p><p>{t.photoRights}</p></div>
        <div className="footer-bottom"><p>{t.copy}</p><div><Link href="/privacy">{t.legal[0]}</Link><Link href="/terms">{t.legal[1]}</Link><Link href="/cookies">{t.legal[2]}</Link><button onClick={() => scrollTo("top")}>{t.backTop} ↑</button></div></div>
      </footer>
    </div>
  );
}
