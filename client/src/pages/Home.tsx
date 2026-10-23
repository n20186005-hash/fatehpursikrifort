/**
 * 设计提示：赤砂石的门槛——以城门、台阶与边注建立叙事路线；真实照片承担空间证据，印地语与英语绝不混排。
 */
import brandImage from "@assets/generated/fatehpur-brand-mark.webp";
import archPatternImage from "@assets/generated/fatehpur-hero-arch-pattern.webp";
import jaliImage from "@assets/generated/fatehpur-jali-pattern.webp";
import stoneImage from "@assets/generated/fatehpur-stone-detail.webp";
import bulandImage from "@assets/generated/buland-darwaza-rajatkantib.webp";
import courtyardImage from "@assets/generated/courtyard-kamyaawasthi.webp";

import { BrandMark } from "@/components/BrandMark";
import { WeatherPanel } from "@/components/WeatherPanel";
import {
  ChevronDown,
  CircleAlert,
  Clock3,
  ExternalLink,
  Languages,
  MapPin,
  Menu,
  MoveRight,
  Ticket,
  TrainFront,
  Utensils,
  CarFront,
  Plane,
  Landmark,
  Accessibility,
  Fuel,
  Store,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import { useMemo, useState } from "react";

type Language = "hi" | "en";

const images = {
  buland: bulandImage,
  courtyard: courtyardImage,

  archPattern: archPatternImage,
  jali: jaliImage,
  stone: stoneImage,
  brand: brandImage,
};

const mapSrc =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6326.810449348338!2d77.66366847720768!3d27.096651076537977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397393fd030fffff%3A0x75aefa4abef7bb0c!2sFatehpur%20Sikri%20Fort!5e1!3m2!1shi!2s!4v1787621608212!5m2!1shi!2s";

const translations = {
  hi: {
    htmlLang: "hi",
    siteName: "फ़तेहपुर सीकरी",
    markLabel: "फ़तेहपुर सीकरी विरासत गाइड",
    eyebrow: "स्वतंत्र विरासत गाइड · उत्तर प्रदेश, भारत",
    nav: [
      "कहानी",
      "यात्रा की योजना",
      "वहाँ पहुँचें",
      "मौसम",
      "ऋतुएँ",
      "यात्रा-योजनाएँ",
      "सवाल",
    ],
    heroKicker: "बुलंद दरवाज़े के पास",
    heroTitle: (
      <>
        दरवाज़े के पार,
        <br />
        <em>एक नियोजित मुग़ल शहर।</em>
      </>
    ),
    planVisit: "यात्रा की तैयारी",
    learnStory: "कहानी पढ़ें",
    photoCredit:
      "मुख्य चित्र: Buland Darwaza, Fatehpur Sikri · Wikimedia Commons",
    landmarkLabel: "विश्व धरोहर परिसर",
    quickFacts: [
      ["स्थान", "आगरा ज़िला, उत्तर प्रदेश"],
      ["समय", "सूर्योदय से सूर्यास्त तक"],
      ["अनुशंसित समय", "कम-से-कम आधा दिन"],
    ],
    introNumber: "01 — पृष्ठभूमि",
    introTitle: "विजय की नगरी, जो एक दशक के लिए राजधानी बनी।",
    introBody:
      "सम्राट अकबर ने 16वीं शताब्दी के उत्तरार्ध में इस पहाड़ी किनारे पर फ़तेहपुर सीकरी बसाई। यह मुग़ल साम्राज्य की राजधानी लगभग एक दशक रही और आज अपने महलों, सार्वजनिक भवनों, मस्जिदों तथा एकीकृत नगर नियोजन के लिए यूनेस्को विश्व धरोहर है।",
    introQuote:
      "“बुलंद दरवाज़ा” — ऊँचा द्वार — जामा मस्जिद के दक्षिणी आँगन तक पहुँचने वाला स्मारकीय प्रवेश है।",
    heritageSource: "यूनेस्को विश्व धरोहर सूची",
    storyCards: [
      [
        "1571–1573",
        "निर्माण और राजधानी",
        "अकबर के शासन में यह मुग़लों का पहला नियोजित नगर बना।",
      ],
      [
        "1575",
        "बुलंद दरवाज़ा",
        "गुजरात की विजय की स्मृति में बना विशाल प्रवेश-द्वार।",
      ],
      [
        "1585",
        "राजधानी का स्थानांतरण",
        "दरबार लाहौर चला गया; परिसर शाही यात्राओं का स्थल बना रहा।",
      ],
    ],
    architectureTag: "लाल पत्थर में रची परतें",
    architectureTitle:
      "यहाँ की भाषा केवल एक शैली नहीं, कई परंपराओं का संवाद है।",
    architectureBody:
      "स्तंभ, छतरियाँ, झरोखे, मेहराब और जालीदार परदे स्थानीय शिल्प परंपराओं को फ़ारसी प्रभावों के साथ जोड़ते हैं। जामा मस्जिद, पंच महल, दीवान-ए-आम और दीवान-ए-ख़ास के बीच चलते हुए उसी मिश्रित स्थापत्य व्याकरण को पढ़ा जा सकता है।",
    detailsKicker: "02 — यात्रा की तैयारी",
    detailsTitle: "जाने से पहले आवश्यक बातें",
    feeTitle: "प्रवेश और शुल्क",
    bestTitle: "सर्वोत्तम समय और ठहराव",
    bestBody:
      "सुबह का समय अपेक्षाकृत शांत और छाया के लिए अनुकूल रहता है। देर दोपहर लाल पत्थर के रंगों को देखने का अवसर दे सकती है। महल परिसर और जामा मस्जिद क्षेत्र को समझकर देखने के लिए कम-से-कम आधा दिन रखें।",
    comfortTitle: "सुविधाएँ और जिम्मेदार तैयारी",
    comfortBody:
      "शौचालय, पानी और निर्धारित सहायता सेवाओं की उपलब्धता स्थान व समय के अनुसार बदल सकती है। धूप से बचाव, पीने का पानी और आरामदायक जूते साथ रखें। धार्मिक क्षेत्र में शांतिपूर्वक व्यवहार करें और स्थानीय नियमों का सम्मान करें।",
    transportKicker: "03 — वहाँ पहुँचें",
    transportTitle: "आगरा या भरतपुर से, विरासत परिसर की ओर",
    nearbyKicker: "04 — आसपास समझें",
    nearbyTitle: "एक दिन, कई परतें",
    nearbyCards: [
      [
        "परिसर के भीतर",
        "जामा मस्जिद, शेख सलीम चिश्ती का मकबरा, पंच महल, दीवान-ए-आम और दीवान-ए-ख़ास को समय देकर देखें।",
      ],
      [
        "आगरा क्षेत्र",
        "ताजमहल और आगरा किला जैसे संरक्षित ऐतिहासिक स्थलों के साथ दिन-यात्रा की योजना बनाई जा सकती है।",
      ],
      [
        "भरतपुर दिशा",
        "भरतपुर से आने वाले यात्री मार्ग और समय की स्थितियों की जाँच कर विरासत यात्रा को संयोजित कर सकते हैं।",
      ],
    ],
    mapKicker: "05 — स्थान",
    mapTitle: "बुलंद दरवाज़ा, दादूपुरा",
    mapBody:
      "नक्शा केवल स्थान-समझ के लिए है। दिशा, सड़क की स्थिति, स्थानीय आवागमन और प्रवेश व्यवस्था यात्रा से पहले सत्यापित करें।",
    openMap: "Google Maps में खोलें",
    faqKicker: "10 — सामान्य प्रश्न",
    faqTitle: "यात्रा से पहले अक्सर पूछे जाने वाले प्रश्न",
    faq: [
      [
        "फ़तेहपुर सीकरी कब खुलती है?",
        "आधिकारिक पर्यटन पृष्ठ इसे सूर्योदय से सूर्यास्त तक खुला बताता है। समय बदल सकता है, इसलिए उसी दिन आधिकारिक जाँच उपयोगी है।",
      ],
      [
        "मुझे यहाँ कितना समय देना चाहिए?",
        "महल परिसर और जामा मस्जिद क्षेत्र को समझकर देखने के लिए कम-से-कम आधे दिन की योजना सुविधाजनक रहती है।",
      ],
      [
        "बुलंद दरवाज़ा किसलिए प्रसिद्ध है?",
        "यह जामा मस्जिद परिसर का विशाल प्रवेश-द्वार है। यूनेस्को के अनुसार यह गुजरात विजय की स्मृति में पूरा किया गया था और इसकी ऊँचाई लगभग 40 मीटर है।",
      ],
      [
        "क्या आगरा से दिन-यात्रा संभव है?",
        "हाँ, आधिकारिक उत्तर प्रदेश पर्यटन सामग्री इसे आगरा से सुलभ दिन-यात्रा के रूप में बताती है। वास्तविक यात्रा समय यातायात और वाहन पर निर्भर करेगा।",
      ],
      [
        "फ़तेहपुर सीकरी क़िला कहाँ स्थित है?",
        "फ़तेहपुर सीकरी क़िला बुलंद गेट, दादूपुरा, फ़तेहपुर सीकरी, उत्तर प्रदेश 283110, भारत में स्थित है — आगरा से लगभग 37 किमी।",
      ],
      [
        "फ़तेहपुर सीकरी किस लिए प्रसिद्ध है?",
        "यह यूनेस्को विश्व धरोहर स्थल है, जो बुलंद दरवाज़े, जामा मस्जिद, पंच महल और अकबर की नियोजित मुग़ल राजधानी के लिए जाना जाता है।",
      ],
      [
        "क्या फ़तेहपुर सीकरी राजस्थान में है?",
        "नहीं। फ़तेहपुर सीकरी उत्तर प्रदेश (आगरा ज़िला) में है, राजस्थान में नहीं। यह भ्रम अक्सर होता है क्योंकि यह राजस्थान की सीमा के पास है।",
      ],
      [
        "फ़तेहपुर सीकरी की एंट्री टिकट फ़ीस क्या है?",
        "आधिकारिक पर्यटन पृष्ठ पर भारतीय/SAARC/BIMSTEC आगंतुकों के लिए ₹50 और अन्य विदेशी आगंतुकों के लिए ₹610 सूचीबद्ध हैं; 23 अक्टूबर 2026 को जाँचा। वर्तमान दर, श्रेणी और छूट टिकट लेने से पहले जाँचें; महल, मस्जिद, दरगाह और संग्रहालय की व्यवस्था अलग से पूछें।",
      ],
      [
        "शेख सलीम चिश्ती का दरगाह (Dargah) क्या है?",
        "यह परिसर के भीतर सफ़ेद संगमरमर का मकबरा है, जो एक सक्रिय सूफ़ी दरगाह है। यहाँ विनम्र कपड़े पहनें और जूते उतारें; पूजा-स्थल के नियमों का सम्मान करें।",
      ],
      [
        "क्या इस गाइड का हिंदी संस्करण है?",
        "हाँ। पृष्ठ के शीर्ष पर 'EN' / 'हिं' बटन से पूरी गाइड हिंदी और अंग्रेज़ी दोनों में पढ़ें।",
      ],
    ],
    resourcesKicker: "स्रोत और उत्तरदायित्व",
    resourcesTitle: "खुली जानकारी, स्वतंत्र प्रस्तुति",
    resourcesBody:
      "इतिहास और व्यावहारिक संकेत विश्वसनीय सार्वजनिक स्रोतों के आधार पर संकलित किए गए हैं। महत्वपूर्ण निर्णयों, टिकट, समय, पहुँच और स्थानीय नियमों के लिए हमेशा आधिकारिक चैनल देखें।",
    sources: [
      ["यूनेस्को", "विश्व धरोहर सूची और असाधारण सार्वभौमिक मूल्य"],
      ["उत्तर प्रदेश आधिकारिक पर्यटन पृष्ठ", "समय, शुल्क और आगंतुक सूचना"],
      ["उत्तर प्रदेश पर्यटन", "आगरा से यात्रा, स्थल-विवरण और आधिकारिक जानकारी"],
      ["विकिपीडिया", "स्वतंत्र विश्वकोश — संक्षिप्त इतिहास और तथ्य"],
    ],
    legal: ["गोपनीयता", "सेवा शर्तें", "कुकी सेटिंग"],
    copy: "© 2026 फ़तेहपुर सीकरी विरासत गाइड",
    skip: "मुख्य सामग्री पर जाएँ",
    language: "EN",
    backTop: "ऊपर जाएँ",
    // Weather
    weatherKicker: "06 — मौसम",
    weatherTitle: "फ़तेहपुर सीकरी में आज और आने वाला सप्ताह",
    weatherIntro:
      "Open-Meteo के मॉडल से स्थिति और सात दिन का पूर्वानुमान, पृष्ठ खोलने पर जाँचा जाता है। स्मारक पर हालात अलग हो सकते हैं; यात्रा से पहले आधिकारिक चेतावनी देखें।",
    wNow: "अभी",
    wForecast: "आने वाले 7 दिन",
    wFeels: "ऐसा लगता है",
    wHumidity: "आर्द्रता",
    wWind: "हवा",
    wRain: "बारिश",
    wUv: "यूवी",
    wUpdated: "अपडेट",
    wLoading: "वर्तमान स्थिति लोड हो रही है…",
    wError:
      "लाइव मौसम अस्थायी रूप से उपलब्ध नहीं है। स्थानीय मौसम जल्दी बदलता है—निकलने से पहले मौसम ऐप देखें।",
    wUmbrella:
      "आज बारिश का बचाव साथ रखें; छिटपट बारिश या अधिक बारिश की संभावना है।",
    wHeat: "गर्मी काफ़ी है—दोपहर में छाया में आराम करें और बार-बार पानी पिएँ।",
    wUvWarn: "यूवी बहुत अधिक है—सूर्य सुरक्षा और टोपी का उपयोग करें।",
    advTitle: "आज की यात्रा कैसे करें",
    advOutfit: "पहनावा",
    advActivity: "क्या करें",
    advItems: "साथ रखें",
    advRisk: "सुरक्षा सूचना",
    // Seasons & climate
    seasonsKicker: "07 — ऋतुएँ",
    seasonsTitle: "कब जाएँ: एक ऋतु-रणनीति",
    seasonHead: ["ऋतु", "मौसम", "आराम", "सलाह"],
    climateKicker: "जलवायु और परिस्थितियाँ",
    climateTitle: "मौसम और पत्थर को समझना",
    climateBody:
      "दीर्घकालिक रूप से वर्ष एक ठंडी शुष्क सर्दी, लंबी गर्म गर्मी और दक्षिण-पश्चिम मानसून में बँटता है। लाल बलुआ पत्थर गर्मी सोख लेता है, इसलिए सतहें और आँगन वायु तापमान से अधिक गर्म लगते हैं। मानसून बारिश से पॉलिश किए पत्थर की सीढ़ियाँ फिसलने लगती हैं और खुले नियोजित शहर में गर्मी की धूप तेज़ होती है। एक दिन के पूर्वानुमान के बजाय इन पैटर्न के अनुसार जल, सूर्य-सुरक्षा और गति की योजना बनाएँ।",
    // Itineraries
    itineraryKicker: "08 — यात्रा-योजनाएँ",
    itineraryTitle: "यात्री और समय के अनुसार मार्ग",
    routesKicker: "सुझाए गए प्लान",
    routesTitle: "आधे दिन और पूरे दिन के आउटलाइन",
    // Responsibility
    responsibilityKicker: "09 — ज़िम्मेदारी से घूमें",
    responsibilityTitle: "विरासत, पर्यावरण और आप",
    responsibilityBody:
      "फ़तेहपुर सीकरी एक जीवित यूनेस्को विश्व धरोहर स्थल है। छोटी पसंदें इसे अगले यात्री के लिए बचाती हैं।",
    responsibilityItems: [
      [
        "ढाँचे का सम्मान करें",
        "प्रतिबंधित संरचनाओं पर न चढ़ें और पत्थर पर निशान न बनाएँ; चिह्नित पथ पर रहें।",
      ],
      [
        "कचरा साथ लाएँ",
        "अपना कचरा साथ ले जाएँ और स्थानीय निपटान निर्देशों का पालन करें।",
      ],
      [
        "पवित्र स्थान में शांति",
        "जामा मस्जिद और मकबरा सक्रिय पूजा-स्थल हैं; धीरे बोलें और विनम्र कपड़े पहनें।",
      ],
      [
        "जल और छाया",
        "यहाँ असली ख़तरा गर्मी और धूप है—अपनी गति रखें और पानी पिएँ।",
      ],
    ],
    legendTitle: "एक भविष्यवाणी पर बसा शहर",
    heroCopy:
      "फ़तेहपुर सीकरी का किला आगरा ज़िले, उत्तर प्रदेश में है—आगरा से लगभग 37 किमी। अकबर के महलों, जामा मस्जिद और बुलंद दरवाज़े को समझने के लिए स्वतंत्र गाइड। यह आगरा किले से अलग स्थल है।",
    rating: "Google Maps: 4.5/5 · 43,778 समीक्षाएँ · 23 अक्टूबर 2026 को जाँचा",
    entityLead:
      "फ़तेहपुर सीकरी उत्तर प्रदेश के आगरा ज़िले में अकबर की ऐतिहासिक मुग़ल राजधानी है। ‘फ़तेहपुर सीकरी का किला’ नाम से खोजा जाने वाला यह स्थल राजस्थान में नहीं है और आगरा का किला एक अलग स्मारक है। महल क्षेत्र, जामा मस्जिद और दरगाह की प्रवेश व्यवस्था एक जैसी न मानें।",
    feeBody:
      "उत्तर प्रदेश के आधिकारिक पर्यटन पृष्ठ पर सूर्योदय से सूर्यास्त तक प्रवेश और भारतीय/SAARC/BIMSTEC आगंतुकों के लिए ₹50, अन्य विदेशी आगंतुकों के लिए ₹610 सूचीबद्ध हैं। 23 अक्टूबर 2026 को जाँचा; टिकट लेने से पहले आधिकारिक पृष्ठ और काउंटर से मौजूदा श्रेणी, दर व अंतिम प्रवेश की पुष्टि करें।",
    feeNote:
      "Google Maps पर जाँच के समय 18:30 बंद होने का संकेत था; यह पूरा साप्ताहिक कार्यक्रम या स्मारक में अंतिम प्रवेश की गारंटी नहीं है। महल, मस्जिद, दरगाह व संग्रहालय के नियम अलग से पूछें।",
    helpItems: [
      [
        "पहुँच",
        "सीढ़ियों, रास्ते की सतह और अपने समूह की ज़रूरतों के बारे में प्रवेश पर पूछें; बाधारहित मार्ग की पुष्टि इस गाइड ने नहीं की है।",
      ],
      [
        "पार्किंग",
        "मौजूदा पार्किंग, शुल्क और परिसर तक आगे की यात्रा आगमन पर सत्यापित करें।",
      ],
      [
        "पानी और भोजन",
        "पानी और धूप से बचाव साथ रखें; पानी भरने या भोजन मिलने की गारंटी न मानें।",
      ],
      [
        "ठहरना",
        "आगरा में ठहरने और लौटने के परिवहन की व्यवस्था अपनी योजना के अनुसार जाँचें।",
      ],
      [
        "दुकानें",
        "खरीद वैकल्पिक है। किसी दुकान या गाइड से खरीदना प्रवेश की शर्त न मानें।",
      ],
      [
        "ईंधन",
        "यात्रा से पहले ईंधन या चार्जिंग की योजना बनाएँ; किसी विशेष चार्जर की उपलब्धता सत्यापित नहीं है।",
      ],
    ],
    transportIntro:
      "आधिकारिक पर्यटन पृष्ठ फ़तेहपुर सीकरी को आगरा से लगभग 37 किमी बताता है। वास्तविक मार्ग और समय यातायात तथा प्रवेश बिंदु पर निर्भर हैं।",
    transportCards: [
      [
        "हवाई मार्ग",
        "अपनी उड़ान और आगे के सड़क परिवहन को अलग से जाँचें; इस गाइड में वर्तमान उड़ान सेवाओं की पुष्टि नहीं है।",
      ],
      [
        "रेल मार्ग",
        "चुने गए स्टेशन तक ट्रेन और वहाँ से फ़तेहपुर सीकरी की यात्रा की पुष्टि आधिकारिक समय-सारणी से करें।",
      ],
      [
        "बस / सार्वजनिक परिवहन",
        "बस के प्रस्थान, वापसी और आख़िरी हिस्से की यात्रा उसी दिन स्थानीय परिवहन स्रोत से पूछें; यहाँ कोई समय-सारणी सत्यापित नहीं है।",
      ],
      [
        "टैक्सी / स्व-ड्राइव",
        "आगरा से सड़क यात्रा का मार्ग जाँचें। किराया, प्रतीक्षा, पार्किंग और लौटने का समय पहले तय करें।",
      ],
    ],
    mapRef:
      "बुलंद गेट, दादूपुरा, फ़तेहपुर सीकरी, उत्तर प्रदेश 283110, भारत · Maps पता, 23 अक्टूबर 2026",
    seasonsIntro:
      "ऋतु के अनुसार सामान्य तैयारी के सुझाव; ये मापे हुए जलवायु औसत या मौसम की गारंटी नहीं हैं।",
    seasonRows: [
      [
        "सर्दी",
        "ठंडी सुबह संभव",
        "परतदार कपड़े",
        "दिन का पूर्वानुमान जाँचें",
        "सुबह और शाम के लिए अतिरिक्त परत रखें।",
      ],
      [
        "गर्मी",
        "तेज़ धूप और गर्मी संभव",
        "पानी और छाया",
        "अपनी गति धीमी रखें",
        "आधिकारिक चेतावनी और पूर्वानुमान देखें।",
      ],
      [
        "बरसात",
        "बारिश संभव",
        "फिसलन से सावधानी",
        "यात्रा में लचीलापन",
        "बारिश के बाद रास्ते और प्रवेश की जाँच करें।",
      ],
    ],
    itineraryIntro:
      "ये लचीले सुझाव हैं, सत्यापित प्रवेश मार्ग या बाधारहित यात्रा नहीं। टिकट, खुले हिस्से और समूह की सुविधा के अनुसार इन्हें बदलें।",
    itineraries: [
      [
        "परिवार",
        "खुले हिस्सों में छोटा भ्रमण रखें, बच्चों को साथ रखें और पानी व विश्राम के लिए समय निकालें।",
      ],
      [
        "फ़ोटोग्राफ़ी और विरासत",
        "बुलंद दरवाज़ा, महल व जालियों को अपनी रुचि के अनुसार देखें। फ़ोटोग्राफ़ी की अनुमति और खुले हिस्से पहले पूछें।",
      ],
      [
        "कम चलने की योजना",
        "सीढ़ियों व दूरी की स्थानीय जानकारी लेकर छोटा मार्ग चुनें। इस गाइड ने व्हीलचेयर-सुलभ मार्ग की पुष्टि नहीं की है।",
      ],
    ],
    routes: [
      [
        "आधे दिन का सुझाव",
        "खुले महल क्षेत्र, पंच महल और दीवान-ए-आम में से अपनी गति के अनुसार चुनें। जामा मस्जिद व दरगाह का प्रवेश अलग से समझें।",
      ],
      [
        "अधिक समय होने पर",
        "दीवान-ए-ख़ास या अन्य खुले हिस्से जोड़ें, बीच में विश्राम करें। संग्रहालय का समय और टिकट अलग से सत्यापित करें।",
      ],
    ],
    legendBody:
      "अकबर और सूफ़ी संत शेख सलीम चिश्ती से जुड़ी परंपराएँ शहर की कहानी का हिस्सा हैं। यूनेस्को फ़तेहपुर सीकरी को अकबर की नियोजित राजधानी बताता है; 1585 में दरबार लाहौर चला गया। आज बचे महल, मस्जिद और सार्वजनिक भवन मुग़ल नगर योजना को समझने में मदद करते हैं।",
    footerTag: "स्वतंत्र आगंतुक सूचना गाइड",
    footerStatement:
      "यह स्वतंत्र सूचना गाइड है; इसका किसी सरकारी निकाय, आधिकारिक संस्था या संचालक से संबंध नहीं है।",
    photoRights:
      "तस्वीरों के स्रोत और लाइसेंस ऊपर दिए गए हैं; तस्वीरें वर्तमान प्रवेश या सुविधाओं का प्रमाण नहीं हैं।",
    footerResearch:
      "यात्रा सूचना: आधिकारिक पर्यटन पृष्ठ और यूनेस्को; 23 अक्टूबर 2026 को जाँच। जाने से पहले बदल सकने वाले नियम दोबारा देखें।",
  },
  en: {
    htmlLang: "en",
    siteName: "Fatehpur Sikri",
    markLabel: "Fatehpur Sikri Heritage Guide",
    eyebrow: "Independent heritage guide · Uttar Pradesh, India",
    nav: [
      "Story",
      "Plan a visit",
      "Getting there",
      "Weather",
      "Seasons",
      "Itineraries",
      "FAQ",
    ],
    heroKicker: "By Buland Darwaza",
    heroTitle: (
      <>
        Beyond the gateway,
        <br />
        <em>a planned Mughal city.</em>
      </>
    ),
    planVisit: "Plan your visit",
    learnStory: "Read the story",
    photoCredit:
      "Hero image: Buland Darwaza, Fatehpur Sikri · Wikimedia Commons",
    landmarkLabel: "World Heritage complex",
    quickFacts: [
      ["Location", "Agra District, Uttar Pradesh"],
      ["Hours", "Sunrise to sunset"],
      ["Allow", "At least half a day"],
    ],
    introNumber: "01 — Context",
    introTitle: "A city of victory that became a capital for a decade.",
    introBody:
      "Emperor Akbar founded Fatehpur Sikri on this ridge in the later 16th century. It served as the Mughal capital for about a decade and is now a UNESCO World Heritage site, recognized for its palaces, public buildings, mosques and coherent urban plan.",
    introQuote:
      "Buland Darwaza — the Lofty Gate — is the monumental entrance rising towards the southern court of Jama Masjid.",
    heritageSource: "UNESCO World Heritage List",
    storyCards: [
      [
        "1571–1573",
        "Construction and capital",
        "Under Akbar, it developed as the first planned city of the Mughals.",
      ],
      [
        "1575",
        "Buland Darwaza",
        "A monumental gateway completed to commemorate the victory of Gujarat.",
      ],
      [
        "1585",
        "Capital relocated",
        "The court moved to Lahore; the complex remained a place of imperial visits.",
      ],
    ],
    architectureTag: "Layers in red stone",
    architectureTitle:
      "Its language is not one style, but a conversation across traditions.",
    architectureBody:
      "Columns, chhatris, jharokhas, arches and pierced screens bring local craft traditions into dialogue with Persian influences. Move between Jama Masjid, Panch Mahal, Diwan-i-Am and Diwan-i-Khas to read that blended architectural grammar.",
    detailsKicker: "02 — Plan a visit",
    detailsTitle: "Useful things to know before you go",
    feeTitle: "Entry and fees",
    bestTitle: "Best time and duration",
    bestBody:
      "Morning can be calmer and kinder for shade. Late afternoon may reveal the warmth of the red sandstone. Allow at least half a day to explore the palace complex and the Jama Masjid area with context.",
    comfortTitle: "Facilities and considerate preparation",
    comfortBody:
      "Availability of toilets, water and designated assistance may vary by time and location. Bring sun protection, drinking water and comfortable shoes. Behave quietly in religious spaces and follow local instructions.",
    transportKicker: "03 — Getting there",
    transportTitle: "Towards the heritage complex from Agra or Bharatpur",
    nearbyKicker: "04 — See more nearby",
    nearbyTitle: "One day, several layers",
    nearbyCards: [
      [
        "Within the complex",
        "Give time to Jama Masjid, the Tomb of Sheikh Salim Chishti, Panch Mahal, Diwan-i-Am and Diwan-i-Khas.",
      ],
      [
        "Agra area",
        "A wider heritage day can include protected historic places such as the Taj Mahal and Agra Fort.",
      ],
      [
        "Bharatpur direction",
        "Travellers arriving via Bharatpur can combine the route with a heritage itinerary after checking road and timing conditions.",
      ],
    ],
    mapKicker: "05 — Location",
    mapTitle: "Buland Darwaza, Dadupura",
    mapBody:
      "This map is for orientation. Confirm directions, road conditions, local transit and access arrangements before your trip.",
    openMap: "Open in Google Maps",
    faqKicker: "10 — FAQ",
    faqTitle: "Questions often asked before a visit",
    faq: [
      [
        "When is Fatehpur Sikri open?",
        "The official tourism page lists sunrise-to-sunset opening. Times may vary, so an official same-day check is useful.",
      ],
      [
        "How much time should I allow?",
        "At least half a day is a comfortable allowance for exploring the palace complex and Jama Masjid area with context.",
      ],
      [
        "Why is Buland Darwaza significant?",
        "It is the vast gateway to the Jama Masjid precinct. UNESCO describes it as completed to commemorate the victory of Gujarat, at about 40 metres in height.",
      ],
      [
        "Can I visit from Agra in a day?",
        "Yes. Official Uttar Pradesh tourism material describes it as an accessible day trip from Agra. Actual journey time depends on traffic and transport.",
      ],
      [
        "Where is Fatehpur Sikri Fort located?",
        "Fatehpur Sikri Fort is located at Buland Gate, Dadupura, Fatehpur Sikri, Uttar Pradesh 283110, India — about 37 km from Agra.",
      ],
      [
        "What is Fatehpur Sikri famous for?",
        "It is a UNESCO World Heritage Site known for Buland Darwaza, the Jama Masjid, Panch Mahal and Akbar's planned Mughal capital.",
      ],
      [
        "Is Fatehpur Sikri in Rajasthan?",
        "No. Fatehpur Sikri is in Uttar Pradesh (Agra district), not Rajasthan. The confusion is common because it lies near the Rajasthan border.",
      ],
      [
        "What is the entry ticket fee?",
        "The official tourism page lists ₹50 for Indian/SAARC/BIMSTEC visitors and ₹610 for other foreign visitors, checked 23 October 2026. Verify category, current price and any exemptions before buying; palace, mosque, dargah and museum arrangements should be checked separately.",
      ],
      [
        "What is the Dargah of Sheikh Salim Chishti?",
        "It is a white marble tomb within the complex and an active Sufi shrine. Dress modestly and remove your shoes; respect the rules of the place of worship.",
      ],
      [
        "Is there a Hindi version of this guide?",
        "Yes. Use the EN / हिं button at the top of the page to read the entire guide in Hindi as well as English.",
      ],
    ],
    resourcesKicker: "Sources and responsibility",
    resourcesTitle: "Open information, independent presentation",
    resourcesBody:
      "Historical notes and practical cues are compiled from credible public sources. Always consult official channels for consequential decisions, tickets, timing, access and local regulations.",
    sources: [
      ["UNESCO", "World Heritage List and Outstanding Universal Value"],
      [
        "Official Uttar Pradesh tourism page",
        "Official tourism page: hours, admission and visitor information",
      ],
      [
        "Uttar Pradesh Tourism",
        "Journey information from Agra, site overview and official details",
      ],
      ["Wikipedia", "Independent encyclopedia — concise history and facts"],
    ],
    legal: ["Privacy", "Terms of use", "Cookie settings"],
    copy: "© 2026 Fatehpur Sikri Heritage Guide",
    skip: "Skip to main content",
    language: "हिं",
    backTop: "Back to top",
    // Weather
    weatherKicker: "06 — Weather",
    weatherTitle: "Today and the week ahead at Fatehpur Sikri",
    weatherIntro:
      "Open-Meteo modelled conditions and a seven-day forecast, checked when you open the page. Conditions at the monument may differ; consult official warnings before travel.",
    wNow: "Now",
    wForecast: "Next 7 days",
    wFeels: "Feels like",
    wHumidity: "Humidity",
    wWind: "Wind",
    wRain: "Rain",
    wUv: "UV",
    wUpdated: "Updated",
    wLoading: "Loading current conditions…",
    wError:
      "Live weather is briefly unavailable. Local conditions shift quickly—check a weather app before you leave.",
    wUmbrella:
      "Carry rain protection today; showers or a high rain chance are expected.",
    wHeat: "Heat is significant—rest in shade at midday and drink water often.",
    wUvWarn: "UV is very high—use sun protection and a hat.",
    advTitle: "How to plan your visit today",
    advOutfit: "What to wear",
    advActivity: "Things to do",
    advItems: "Bring with you",
    advRisk: "Safety notice",
    // Seasons & climate
    seasonsKicker: "07 — Seasons",
    seasonsTitle: "When to go: a seasonal strategy",
    seasonHead: ["Season", "Weather", "Comfort", "Advice"],
    climateKicker: "Climate & conditions",
    climateTitle: "Reading the weather and the stone",
    climateBody:
      "Over the long term the year falls into a cool dry winter, a long hot summer and a southwest monsoon. The red sandstone soaks up heat, so surfaces and courtyards feel warmer than the air temperature suggests. Monsoon rain can make polished stone steps slippery, and the summer sun is intense with little shade across the open planned city. Plan hydration, sun protection and pacing around these patterns rather than a single day’s forecast.",
    // Itineraries
    itineraryKicker: "08 — Itineraries",
    itineraryTitle: "Routes by traveller and by time",
    routesKicker: "Suggested plans",
    routesTitle: "Half-day and full-day outlines",
    // Responsibility
    responsibilityKicker: "09 — Visit responsibly",
    responsibilityTitle: "Heritage, environment and you",
    responsibilityBody:
      "Fatehpur Sikri is a living UNESCO World Heritage site. Small choices protect it for the next visitor.",
    responsibilityItems: [
      [
        "Respect the fabric",
        "Do not climb restricted structures or mark the stone; stay on the marked paths.",
      ],
      [
        "Carry out waste",
        "Take your litter away and follow local waste-disposal instructions.",
      ],
      [
        "Quiet in sacred space",
        "The Jama Masjid and the tomb are active places of worship; speak softly and dress modestly.",
      ],
      [
        "Hydrate & shade",
        "Heat and sun are the real hazards here—pace yourself and drink water.",
      ],
    ],
    // History / legend enrichment
    legendTitle: "A city raised on a prophecy",
    heroCopy:
      "Fatehpur Sikri Fort is in Agra district, Uttar Pradesh, about 37 km from Agra. An independent guide to Akbar’s palace city, Jama Masjid and Buland Darwaza. Agra Fort is a separate monument.",
    rating: "Google Maps: 4.5/5 · 43,778 reviews · checked 23 October 2026",
    entityLead:
      "Fatehpur Sikri is Akbar’s historic Mughal capital in Agra district, Uttar Pradesh. Often searched for as Fatehpur Sikri Fort, it is not in Rajasthan and is distinct from Agra Fort. Do not assume palace, mosque and dargah access follow the same rules.",
    feeBody:
      "The official Uttar Pradesh tourism page lists sunrise-to-sunset opening and admission of ₹50 for Indian/SAARC/BIMSTEC visitors and ₹610 for other foreign visitors. Checked 23 October 2026; confirm your category, current price and last admission with the official page and ticket counter before buying.",
    feeNote:
      "Google Maps showed a closing-time cue of 18:30 when checked. This is not a complete weekly schedule or a guaranteed monument admission deadline. Confirm palace, mosque, dargah and museum arrangements separately.",
    helpItems: [
      [
        "Access",
        "Ask at the entrance about steps, surfaces and your group’s needs; this guide has not verified a step-free route.",
      ],
      [
        "Parking",
        "Confirm current parking, charges and onward access on arrival.",
      ],
      [
        "Water and food",
        "Bring water and sun protection; do not rely on an unverified refill or food service.",
      ],
      [
        "Accommodation",
        "Check accommodation and return transport in Agra against your own itinerary.",
      ],
      [
        "Shops",
        "Purchases are optional; do not assume buying from a shop or guide is required for admission.",
      ],
      [
        "Fuel",
        "Plan fuel or charging before travel; this guide has not verified a particular charger.",
      ],
    ],
    transportIntro:
      "The official tourism page places Fatehpur Sikri about 37 km from Agra. Route length and travel time depend on traffic and your entrance.",
    transportCards: [
      [
        "By air",
        "Check your flight and onward road connection separately; current flight services are not verified here.",
      ],
      [
        "By rail",
        "Confirm trains to your chosen station with an official timetable and arrange onward travel to Fatehpur Sikri.",
      ],
      [
        "Bus / public transport",
        "Check departures, return services and the final connection with local transport sources on the day; no timetable is verified here.",
      ],
      [
        "Taxi / self-drive",
        "Check the route from Agra and agree on fare, waiting, parking and return arrangements in advance.",
      ],
    ],
    mapRef:
      "Buland Gate, Dadupura, Fatehpur Sikri, Uttar Pradesh 283110, India · Maps address checked 23 October 2026",
    seasonsIntro:
      "General seasonal preparation suggestions, rather than measured climate averages or a forecast guarantee.",
    seasonRows: [
      [
        "Winter",
        "Cool mornings possible",
        "Bring layers",
        "Check the day’s forecast",
        "Carry an extra layer for early and late visits.",
      ],
      [
        "Summer",
        "Heat and strong sun possible",
        "Water and shade",
        "Pace your visit",
        "Check official warnings and the latest forecast.",
      ],
      [
        "Rainy season",
        "Showers possible",
        "Watch for slippery surfaces",
        "Keep plans flexible",
        "Check roads and access after rain.",
      ],
    ],
    itineraryIntro:
      "These flexible suggestions are not verified entrance routes or accessible circuits. Adapt them to ticket arrangements, open areas and your group’s needs.",
    itineraries: [
      [
        "Families",
        "Choose a shorter visit through open areas, keep children close and allow time for water and rest.",
      ],
      [
        "Photography & heritage",
        "Consider Buland Darwaza, palace buildings and stone screens according to your interests. Ask about photography permission and open areas first.",
      ],
      [
        "Less walking",
        "Ask locally about distances and steps before choosing a shorter circuit. This guide has not verified a wheelchair-accessible route.",
      ],
    ],
    routes: [
      [
        "Half-day suggestion",
        "Choose among open palace areas, Panch Mahal and Diwan-i-Am at your own pace. Check separate access to Jama Masjid and the dargah.",
      ],
      [
        "With more time",
        "Consider Diwan-i-Khas or other open areas and allow for breaks. Verify museum admission and hours separately.",
      ],
    ],
    legendBody:
      "Traditions about Akbar and the Sufi saint Sheikh Salim Chishti form part of the city’s story. UNESCO identifies Fatehpur Sikri as Akbar’s planned capital; the court moved to Lahore in 1585. Surviving palaces, the mosque and public buildings offer a way to understand Mughal city planning.",
    footerTag: "Independent visitor information guide",
    footerStatement:
      "This independent information guide is not affiliated with a government body, official institution or operator.",
    photoRights:
      "Photo sources and licences are linked above; historic photographs do not establish current access or facilities.",
    footerResearch:
      "Visitor information: official tourism page and UNESCO; checked 23 October 2026. Recheck rules that can change before travel.",
  },
} as const;

function scrollTo(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionMark({ number, label }: { number: string; label: string }) {
  return (
    <p className="section-mark">
      <span>{number}</span>
      {label}
    </p>
  );
}

export default function Home({ language }: { language: Language }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = translations[language];

  const structuredData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://fatehpursikrifort.com/#website",
          name: "Fatehpur Sikri Fort Visitor Guide",
          url: "https://fatehpursikrifort.com",
          inLanguage: language,
        },
        {
          "@type": "TouristAttraction",
          "@id": "https://fatehpursikrifort.com/#attraction",
          name: "Fatehpur Sikri Fort",
          alternateName: ["Fatehpur Sikri", "फ़तेहपुर सीकरी क़िला"],
          description:
            "Comprehensive visitor guide to Fatehpur Sikri Fort in Fatehpur Sikri, Uttar Pradesh, India.",
          url: "https://fatehpursikrifort.com",
          image: ["https://fatehpursikrifort.com/social.jpg"],
          address: {
            "@type": "PostalAddress",
            streetAddress: "Buland Gate, Dadupura",
            addressLocality: "Fatehpur Sikri",
            addressRegion: "Uttar Pradesh",
            postalCode: "283110",
            addressCountry: "IN",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 27.0966511,
            longitude: 77.6662434,
          },
          hasMap: "https://maps.app.goo.gl/4fcjp1yYQ3WQsXm88",
          sameAs: [
            "https://maps.app.goo.gl/4fcjp1yYQ3WQsXm88",
            "https://www.tajmahal.gov.in/fatehpur-sikri.aspx",
          ],
        },
        {
          "@type": "FAQPage",
          mainEntity: t.faq.map(([question, answer]) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        },
      ],
    }),
    [t.faq, language]
  );

  const navIds = [
    "story",
    "visit",
    "transport",
    "weather",
    "seasons",
    "itineraries",
    "faq",
  ];
  const utilities = [Accessibility, CarFront, Utensils, Building2, Store, Fuel];
  const transportIcons = [Plane, TrainFront, Menu, CarFront];

  return (
    <div className="site-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <a className="skip-link" href="#main">
        {t.skip}
      </a>

      <header className="site-header" aria-label={t.siteName}>
        <a
          href="#top"
          className="brand"
          onClick={event => {
            event.preventDefault();
            scrollTo("top");
          }}
        >
          <img
            className="brand-image"
            src={images.brand}
            alt=""
            aria-hidden="true"
          />
          <span className="brand-wordmark">
            <strong>{t.siteName}</strong>
            <small>
              {language === "hi" ? "विरासत गाइड" : "HERITAGE GUIDE"}
            </small>
          </span>
        </a>
        <nav
          id="primary-navigation"
          className={menuOpen ? "main-nav main-nav-open" : "main-nav"}
          aria-label={
            language === "hi" ? "मुख्य नेविगेशन" : "Primary navigation"
          }
        >
          {t.nav.map((item, index) => (
            <button
              key={item}
              onClick={() => {
                scrollTo(navIds[index]);
                setMenuOpen(false);
              }}
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="language-button"
            href={language === "hi" ? "/en/" : "/"}
            hrefLang={language === "hi" ? "en" : "hi"}
            aria-label={
              language === "hi" ? "Switch to English" : "हिंदी में बदलें"
            }
          >
            <Languages size={15} />
            {t.language}
          </a>
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={language === "hi" ? "मेनू" : "Menu"}
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      <main id="main">
        <h1 className="sr-only">
          {language === "hi"
            ? "फ़तेहपुर सीकरी क़िला (फ़तेहपुर सीकरी)"
            : "Fatehpur Sikri Fort (Fatehpur Sikri)"}
        </h1>
        <p className="sr-only">
          Fatehpur Sikri Fort › Fatehpur Sikri › Uttar Pradesh › India
        </p>
        <section id="top" className="hero-section">
          <div
            className="hero-pattern"
            style={{ backgroundImage: `url(${images.archPattern})` }}
            aria-hidden="true"
          />
          <div className="hero-copy-wrap">
            <p className="eyebrow">{t.eyebrow}</p>
            <div className="hero-title">{t.heroTitle}</div>
            <p className="hero-copy">{t.heroCopy}</p>
            <div className="hero-actions">
              <button
                className="button-primary"
                onClick={() => scrollTo("visit")}
              >
                {t.planVisit}
                <MoveRight size={18} />
              </button>
              <button className="text-action" onClick={() => scrollTo("story")}>
                {t.learnStory}
                <span>↘</span>
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="arch-frame">
              <img
                src={images.buland}
                alt={
                  language === "hi"
                    ? "फ़तेहपुर सीकरी क़िला (Fatehpur Sikri Fort) — बुलंद दरवाज़ा, मुख्य दृश्य फ़तेहपुर सीकरी, भारत"
                    : "Fatehpur Sikri Fort — Buland Darwaza, main view in Fatehpur Sikri, India"
                }
              />
            </div>
            <p className="image-credit">
              Buland Darwaza ·{" "}
              <a href="https://commons.wikimedia.org/wiki/File:Buland_Darwaza_.jpg">
                Rajatkantib
              </a>{" "}
              ·{" "}
              <a href="https://creativecommons.org/licenses/by-sa/4.0/">
                CC BY-SA 4.0
              </a>{" "}
              ·{" "}
              {language === "hi"
                ? "3 फ़रवरी 2014; आकार/संपीड़न बदला, प्रदर्शन में क्रॉप"
                : "3 February 2014; resized/compressed, display crop"}
            </p>
          </div>
          <div className="hero-facts" aria-label={t.landmarkLabel}>
            <p>{t.landmarkLabel}</p>
            <div className="facts-grid">
              {t.quickFacts.map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="story" className="story-section section-padding">
          <div className="content-rail">
            <SectionMark
              number="01"
              label={t.introNumber.replace("01 — ", "")}
            />
            <div className="story-intro">
              <p className="entity-lead">{t.entityLead}</p>
              <h2>{t.introTitle}</h2>
              <div>
                <p>{t.introBody}</p>
                <a
                  href="https://whc.unesco.org/en/list/255/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.heritageSource}
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
            <blockquote>{t.introQuote}</blockquote>
            <div className="story-timeline">
              {t.storyCards.map(([date, title, body]) => (
                <article key={date}>
                  <p>{date}</p>
                  <h3>{title}</h3>
                  <span>{body}</span>
                </article>
              ))}
            </div>
            <div className="story-legend">
              <h3>{t.legendTitle}</h3>
              <p>{t.legendBody}</p>
            </div>
          </div>
        </section>

        <section
          className="architecture-section"
          style={{ backgroundImage: `url(${images.jali})` }}
        >
          <div className="architecture-copy">
            <p className="eyebrow">{t.architectureTag}</p>
            <h2>{t.architectureTitle}</h2>
            <p>{t.architectureBody}</p>
          </div>
          <figure className="stone-figure">
            <img src={images.stone} alt="" />
            <figcaption>
              {language === "hi"
                ? "रेत-पत्थर की बनावट से प्रेरित सजावटी दृश्य"
                : "Decorative visual inspired by sandstone texture"}
            </figcaption>
          </figure>
        </section>

        <section id="visit" className="visit-section section-padding">
          <div className="section-heading">
            <SectionMark
              number="02"
              label={t.detailsKicker.replace("02 — ", "")}
            />
            <h2>{t.detailsTitle}</h2>
          </div>
          <div className="visit-layout">
            <article className="feature-card fee-card">
              <div className="card-icon">
                <Ticket size={20} />
              </div>
              <h3>{t.feeTitle}</h3>
              <p>{t.feeBody}</p>
              <div className="note">
                <CircleAlert size={16} />
                {t.feeNote}
              </div>
            </article>
            <div className="visit-stack">
              <article className="plain-card">
                <Clock3 size={18} />
                <div>
                  <h3>{t.bestTitle}</h3>
                  <p>{t.bestBody}</p>
                </div>
              </article>
              <article className="plain-card">
                <Landmark size={18} />
                <div>
                  <h3>{t.comfortTitle}</h3>
                  <p>{t.comfortBody}</p>
                </div>
              </article>
            </div>
          </div>
          <div className="utility-grid">
            {t.helpItems.map(([title, body], index) => {
              const Icon = utilities[index];
              return (
                <article key={title}>
                  <Icon size={18} />
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="transport" className="transport-section section-padding">
          <div className="section-heading side-heading">
            <SectionMark
              number="03"
              label={t.transportKicker.replace("03 — ", "")}
            />
            <h2>{t.transportTitle}</h2>
            <p>{t.transportIntro}</p>
          </div>
          <div className="transport-grid">
            {t.transportCards.map(([title, body], index) => {
              const Icon = transportIcons[index];
              return (
                <article key={title}>
                  <span className="transport-index">0{index + 1}</span>
                  <Icon size={21} />
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="nearby-section section-padding">
          <div className="nearby-image">
            <img
              src={images.courtyard}
              alt={
                language === "hi"
                  ? "फ़तेहपुर सीकरी क़िले का लाल पत्थर का आँगन, फ़तेहपुर सीकरी"
                  : "Fatehpur Sikri Fort courtyard — red sandstone, Fatehpur Sikri"
              }
            />
            <p className="image-credit">
              <>
                Courtyard at Fatehpur Sikri ·{" "}
                <a href="https://commons.wikimedia.org/wiki/File:Courtyard_at_Fatehpur_Sikri_1.jpg">
                  Kamyaawasthi
                </a>{" "}
                ·{" "}
                <a href="https://creativecommons.org/licenses/by-sa/4.0/">
                  CC BY-SA 4.0
                </a>{" "}
                ·{" "}
                {language === "hi"
                  ? "26 दिसंबर 2020; आकार/संपीड़न बदला, प्रदर्शन में क्रॉप"
                  : "26 December 2020; resized/compressed, display crop"}
              </>
            </p>
          </div>
          <div className="nearby-content">
            <SectionMark
              number="04"
              label={t.nearbyKicker.replace("04 — ", "")}
            />
            <h2>{t.nearbyTitle}</h2>
            <div>
              {t.nearbyCards.map(([title, body]) => (
                <article key={title}>
                  <span>↗</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="map" className="map-section section-padding">
          <div className="map-copy">
            <SectionMark number="05" label={t.mapKicker.replace("05 — ", "")} />
            <h2>{t.mapTitle}</h2>
            <p>{t.mapBody}</p>
            <a
              className="map-link"
              href="https://maps.app.goo.gl/4fcjp1yYQ3WQsXm88"
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={18} />
              {t.openMap}
              <ExternalLink size={14} />
            </a>
            <p className="map-ref">{t.mapRef}</p>
          </div>
          <div className="map-frame">
            <iframe
              title={t.mapTitle}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </section>

        <section id="weather" className="weather-section section-padding">
          <div className="section-heading">
            <SectionMark
              number="06"
              label={t.weatherKicker.replace("06 — ", "")}
            />
            <h2>{t.weatherTitle}</h2>
            <p>{t.weatherIntro}</p>
          </div>
          <WeatherPanel
            lang={language}
            labels={{
              now: t.wNow,
              forecast: t.wForecast,
              feels: t.wFeels,
              humidity: t.wHumidity,
              wind: t.wWind,
              rain: t.wRain,
              uv: t.wUv,
              updated: t.wUpdated,
              loading: t.wLoading,
              error: t.wError,
              umbrella: t.wUmbrella,
              heat: t.wHeat,
              uvWarn: t.wUvWarn,
              advTitle: t.advTitle,
              advOutfit: t.advOutfit,
              advActivity: t.advActivity,
              advItems: t.advItems,
              advRisk: t.advRisk,
            }}
          />
        </section>

        <section id="seasons" className="seasons-section section-padding">
          <div className="section-heading">
            <SectionMark
              number="07"
              label={t.seasonsKicker.replace("07 — ", "")}
            />
            <h2>{t.seasonsTitle}</h2>
            <p>{t.seasonsIntro}</p>
          </div>
          <div className="season-table-wrap">
            <table className="season-table">
              <thead>
                <tr>
                  {t.seasonHead.map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.seasonRows.map(row => (
                  <tr key={row[0]}>
                    <th scope="row">{row[0]}</th>
                    <td>
                      {row[1]}
                      <br />
                      <small>{row[2]}</small>
                    </td>
                    <td>{row[3]}</td>
                    <td>{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="climate-block">
            <p className="eyebrow">{t.climateKicker}</p>
            <h3>{t.climateTitle}</h3>
            <p>{t.climateBody}</p>
          </div>
        </section>

        <section id="itineraries" className="itinerary-section section-padding">
          <div className="section-heading">
            <SectionMark
              number="08"
              label={t.itineraryKicker.replace("08 — ", "")}
            />
            <h2>{t.itineraryTitle}</h2>
            <p>{t.itineraryIntro}</p>
          </div>
          <div className="itinerary-grid">
            {t.itineraries.map(([title, body]) => (
              <article key={title} className="itinerary-card">
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <div className="routes-block">
            <p className="eyebrow">{t.routesKicker}</p>
            <h3>{t.routesTitle}</h3>
            <div className="routes-list">
              {t.routes.map(([title, body]) => (
                <article key={title} className="route-card">
                  <h4>{title}</h4>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="responsibility"
          className="responsibility-section section-padding"
        >
          <div className="section-heading">
            <SectionMark
              number="09"
              label={t.responsibilityKicker.replace("09 — ", "")}
            />
            <h2>{t.responsibilityTitle}</h2>
            <p>{t.responsibilityBody}</p>
          </div>
          <div className="responsibility-grid">
            {t.responsibilityItems.map(([title, body]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" className="faq-section section-padding">
          <div className="section-heading">
            <SectionMark number="10" label={t.faqKicker.replace("10 — ", "")} />
            <h2>{t.faqTitle}</h2>
          </div>
          <div className="faq-list">
            {t.faq.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary>
                  {question}
                  <ChevronDown size={20} />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="sources-section section-padding">
          <div>
            <p className="eyebrow">{t.resourcesKicker}</p>
            <h2>{t.resourcesTitle}</h2>
            <p>{t.resourcesBody}</p>
          </div>
          <div className="source-list">
            {t.sources.map(([name, description], index) => (
              <a
                key={name}
                href={
                  [
                    "https://whc.unesco.org/en/list/255/",
                    "https://www.tajmahal.gov.in/fatehpur-sikri.aspx",
                    "https://uptourism.gov.in",
                    "https://en.wikipedia.org/wiki/Fatehpur_Sikri",
                  ][index]
                }
                target="_blank"
                rel="noreferrer"
              >
                <span>0{index + 1}</span>
                <div>
                  <h3>{name}</h3>
                  <p>{description}</p>
                </div>
                <ArrowUpRight size={17} />
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <BrandMark className="footer-mark" title={t.markLabel} />
          <div>
            <p>{t.footerTag}</p>
            <h2>{t.siteName}</h2>
          </div>
        </div>
        <div className="footer-notes">
          <p>{t.footerStatement}</p>
          <p>{t.footerResearch}</p>
          <p>{t.photoRights}</p>
        </div>
        <div className="footer-bottom">
          <p>{t.copy}</p>
          <div>
            <a href={language === "hi" ? "/privacy" : "/en/privacy"}>
              {t.legal[0]}
            </a>
            <a href={language === "hi" ? "/terms" : "/en/terms"}>
              {t.legal[1]}
            </a>
            <a href={language === "hi" ? "/cookies" : "/en/cookies"}>
              {t.legal[2]}
            </a>
            <button onClick={() => scrollTo("top")}>{t.backTop} ↑</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
