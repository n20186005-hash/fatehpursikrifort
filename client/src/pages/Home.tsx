/**
 * 设计提示：赤砂石的门槛——以城门、台阶与边注建立叙事路线；真实照片承担空间证据，印地语与英语绝不混排。
 */
import brandImage from "@assets/fatehpur-brand-mark.png";
import archPatternImage from "@assets/fatehpur-hero-arch-pattern.png";
import jaliImage from "@assets/fatehpur-jali-pattern.png";
import stoneImage from "@assets/fatehpur-stone-detail.png";
import bulandImage from "@assets/buland-darwaza-wikimedia.jpg";
import courtyardImage from "@assets/fatehpur-courtyard-unsplash.jpg";
import diwanImage from "@assets/fatehpur-diwan-unsplash.jpg";
import { BrandMark } from "@/components/BrandMark";
import { WeatherPanel } from "@/components/WeatherPanel";
import { ChevronDown, CircleAlert, Clock3, ExternalLink, Languages, MapPin, Menu, MoveRight, Ticket, TrainFront, Utensils, CarFront, Plane, Landmark, Accessibility, Fuel, Store, Building2, ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";

type Language = "hi" | "en";

const images = {
  buland: bulandImage,
  courtyard: courtyardImage,
  diwan: diwanImage,
  archPattern: archPatternImage,
  jali: jaliImage,
  stone: stoneImage,
  brand: brandImage,
};

const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6326.810449348338!2d77.66366847720768!3d27.096651076537977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397393fd030fffff%3A0x75aefa4abef7bb0c!2sFatehpur%20Sikri%20Fort!5e1!3m2!1shi!2s!4v1787621608212!5m2!1shi!2s";

const translations = {
  hi: {
    htmlLang: "hi",
    siteName: "फ़तेहपुर सीकरी",
    markLabel: "फ़तेहपुर सीकरी विरासत गाइड",
    eyebrow: "स्वतंत्र विरासत गाइड · उत्तर प्रदेश, भारत",
    nav: ["कहानी", "यात्रा की योजना", "वहाँ पहुँचें", "मौसम", "ऋतुएँ", "यात्रा-योजनाएँ", "सवाल"],
    heroKicker: "बुलंद दरवाज़े के पास",
    heroTitle: <>दरवाज़े के पार,<br /><em>एक नियोजित मुग़ल शहर।</em></>,
    heroCopy: "लाल बलुआ पत्थर, खुले आँगन और समय के साथ बनी एक राजधानी। फ़तेहपुर सीकरी को समझने के लिए एक शांत, स्वतंत्र और गैर-लाभकारी मार्गदर्शिका।",
    planVisit: "यात्रा की तैयारी",
    learnStory: "कहानी पढ़ें",
    rating: "Google Maps पर 4.5/5 · 43,665 समीक्षाएँ",
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
    entityLead: "फ़तेहपुर सीकरी क़िला (Fatehpur Sikri Fort) में आपका स्वागत है, जिसे व्यापक रूप से सरलतः फ़तेहपुर सीकरी के नाम से पहचाना जाता है। यह फ़तेहपुर सीकरी, उत्तर प्रदेश, भारत के मध्य में स्थित एक यूनेस्को विश्व धरोहर परिसर है और क्षेत्र की मुग़ल विरासत को देखने आने वाले यात्रियों का एक प्रमुख केंद्र है।",
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
      ["घूमना-फिरना", "सीढ़ियाँ और असमतल पत्थर की सतहें मिलेंगी; नियोजित शहर धीमी, सावधान चाल के लिए ठीक है, हर जगह पहियों के लिए नहीं।"],
      ["पार्किंग", "प्रवेश के पास निर्धारित सार्वजनिक पार्किंग क्षेत्र का उपयोग करें और आगमन पर संकेतों का पालन करें।"],
      ["भोजन और पेय", "गेट के पास छोटी खाने-पीने की जगहें हैं; लंबे खुले आँगनों के लिए अपना पानी साथ रखें।"],
      ["पास के ठहरने", "आगरा में ठहरने के सबसे व्यापक विकल्प हैं; जल्दी शुरुआत के लिए फ़तेहपुर सीकरी के पास कुछ गेस्टहाउस हैं।"],
      ["दुकानें और ज़रूरतें", "प्रवेश के पास स्मृति-चिह्न और रोज़मर्रा की दुकानें हैं—धीरे देखें; किसी एक दुकान की सिफारिश नहीं।"],
      ["ईंधन और EV चार्जिंग", "आगरा–फ़तेहपुर सीकरी मार्ग पर ईंधन स्टेशन और बढ़ते EV चार्जर हैं; अंतिम हिस्से से पहले ईंधन भर लें।"],
    ],
    transportKicker: "03 — वहाँ पहुँचें",
    transportTitle: "आगरा या भरतपुर से, विरासत परिसर की ओर",
    transportIntro: "फ़तेहपुर सीकरी आगरा से लगभग 37 किमी और भरतपुर से लगभग 18 किमी दूर है। यह खंड केवल परिवहन के प्रकार बताता है; किसी निजी संचालक, दुकान या ठहरने की जगह की सिफारिश नहीं करता।",
    transportCards: [
      ["हवाई मार्ग", "सबसे नज़दीकी हवाई अड्डा आगरा का खेरिया (AGR) है, जहाँ सीमित घरेलू उड़ानें हैं; अधिकांश यात्री दिल्ली के इंदिरा गांधी अंतरराष्ट्रीय (DEL) हवाई अड्डे पर आते हैं और आगे सड़क या रेल से जाते हैं। बुकिंग से पहले वर्तमान मार्ग जाँचें।"],
      ["रेल मार्ग", "आगरा कैंट मुख्य रेल केंद्र है, जो दिल्ली, जयपुर और मुंबई से अच्छी तरह जुड़ा है। आगरा से आगे स्थानीय बस, शेयर टैक्सी या ऐप-आधारित कैब से जाएँ।"],
      ["बस / सार्वजनिक परिवहन", "UPSRTC और निजी बसें आगरा → फ़तेहपुर सीकरी चलती हैं; बस स्टैंड से आख़िरी हिस्सा स्थानीय शेयर ऑटो और टेंपो तय करते हैं। समय-सारणी उसी दिन जाँचें।"],
      ["टैक्सी / स्व-ड्राइव", "आगरा (≈37 किमी) या भरतपुर (≈18 किमी) से कैब या निजी कार दिन-यात्रा के लिए सबसे लचीला विकल्प है। मीटर/ऐप कैब न हो तो किराया और लौटने का समय पहले तय करें।"],
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
    mapRef: "प्लस कोड 3MW8+MF · फ़तेहपुर सीकरी, उत्तर प्रदेश, भारत · +91 522 406 1369",
    openMap: "Google Maps में खोलें",
    faqKicker: "10 — सामान्य प्रश्न",
    faqTitle: "यात्रा से पहले अक्सर पूछे जाने वाले प्रश्न",
    faq: [
      ["फ़तेहपुर सीकरी कब खुलती है?", "भारतीय पुरातत्व सर्वेक्षण इसे सूर्योदय से सूर्यास्त तक खुला बताता है। समय बदल सकता है, इसलिए उसी दिन आधिकारिक जाँच उपयोगी है।"],
      ["मुझे यहाँ कितना समय देना चाहिए?", "महल परिसर और जामा मस्जिद क्षेत्र को समझकर देखने के लिए कम-से-कम आधे दिन की योजना सुविधाजनक रहती है।"],
      ["बुलंद दरवाज़ा किसलिए प्रसिद्ध है?", "यह जामा मस्जिद परिसर का विशाल प्रवेश-द्वार है। यूनेस्को के अनुसार यह गुजरात विजय की स्मृति में पूरा किया गया था और इसकी ऊँचाई लगभग 40 मीटर है।"],
      ["क्या आगरा से दिन-यात्रा संभव है?", "हाँ, आधिकारिक उत्तर प्रदेश पर्यटन सामग्री इसे आगरा से सुलभ दिन-यात्रा के रूप में बताती है। वास्तविक यात्रा समय यातायात और वाहन पर निर्भर करेगा।"],
      ["फ़तेहपुर सीकरी क़िला कहाँ स्थित है?", "फ़तेहपुर सीकरी क़िला बुलंद गेट, दादूपुरा, फ़तेहपुर सीकरी, उत्तर प्रदेश 283110, भारत में स्थित है — आगरा से लगभग 37 किमी।"],
      ["फ़तेहपुर सीकरी किस लिए प्रसिद्ध है?", "यह यूनेस्को विश्व धरोहर स्थल है, जो बुलंद दरवाज़े, जामा मस्जिद, पंच महल और अकबर की नियोजित मुग़ल राजधानी के लिए जाना जाता है।"],
      ["क्या फ़तेहपुर सीकरी राजस्थान में है?", "नहीं। फ़तेहपुर सीकरी उत्तर प्रदेश (आगरा ज़िला) में है, राजस्थान में नहीं। यह भ्रम अक्सर होता है क्योंकि यह राजस्थान की सीमा के पास है।"],
      ["फ़तेहपुर सीकरी की एंट्री टिकट फ़ीस क्या है?", "भारतीय पुरातत्व सर्वेक्षण (ASI) के स्मारकों में आमतौर पर भारतीय नागरिकों के लिए कम और विदेशी पर्यटकों के लिए अधिक शुल्क होता है; 15 वर्ष से कम आयु के बच्चों का प्रवेश निःशुल्क बताया गया है। वर्तमान दर यात्रा से पहले आधिकारिक स्रोत से जाँचें।"],
      ["शेख सलीम चिश्ती का दरगाह (Dargah) क्या है?", "यह परिसर के भीतर सफ़ेद संगमरमर का मकबरा है, जो एक सक्रिय सूफ़ी दरगाह है। यहाँ विनम्र कपड़े पहनें और जूते उतारें; पूजा-स्थल के नियमों का सम्मान करें।"],
      ["क्या इस गाइड का हिंदी संस्करण है?", "हाँ। पृष्ठ के शीर्ष पर 'EN' / 'हिं' बटन से पूरी गाइड हिंदी और अंग्रेज़ी दोनों में पढ़ें।"],
    ],
    resourcesKicker: "स्रोत और उत्तरदायित्व",
    resourcesTitle: "खुली जानकारी, स्वतंत्र प्रस्तुति",
    resourcesBody: "इतिहास और व्यावहारिक संकेत विश्वसनीय सार्वजनिक स्रोतों के आधार पर संकलित किए गए हैं। महत्वपूर्ण निर्णयों, टिकट, समय, पहुँच और स्थानीय नियमों के लिए हमेशा आधिकारिक चैनल देखें।",
    sources: [
      ["यूनेस्को", "विश्व धरोहर सूची और असाधारण सार्वभौमिक मूल्य"],
      ["भारतीय पुरातत्व सर्वेक्षण", "फ़तेहपुर सीकरी: समय, प्रवेश और संग्रहालय सूचना"],
      ["उत्तर प्रदेश पर्यटन", "आगरा से यात्रा, स्थल-विवरण और आधिकारिक जानकारी"],
      ["विकिपीडिया", "स्वतंत्र विश्वकोश — संक्षिप्त इतिहास और तथ्य"],
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

    // Weather
    weatherKicker: "06 — मौसम",
    weatherTitle: "फ़तेहपुर सीकरी में आज और आने वाला सप्ताह",
    weatherIntro: "परिसर के लिए वर्तमान स्थिति और सात दिन का पूर्वानुमान, कुछ मिनट में ताज़ा होता है, ताकि आप कपड़े, छाया और बारिश के बचाव का चयन कर सकें।",
    wNow: "अभी",
    wForecast: "आने वाले 7 दिन",
    wFeels: "ऐसा लगता है",
    wHumidity: "आर्द्रता",
    wWind: "हवा",
    wRain: "बारिश",
    wUv: "यूवी",
    wUpdated: "अपडेट",
    wLoading: "वर्तमान स्थिति लोड हो रही है…",
    wError: "लाइव मौसम अस्थायी रूप से उपलब्ध नहीं है। स्थानीय मौसम जल्दी बदलता है—निकलने से पहले मौसम ऐप देखें।",
    wUmbrella: "आज बारिश का बचाव साथ रखें; छिटपट बारिश या अधिक बारिश की संभावना है।",
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
    seasonsIntro: "फ़तेहपुर सीकरी की गर्म अर्ध-शुष्क जलवायु है और तीन स्पष्ट ऋतुएँ हैं। नीचे सारांश दीर्घकालिक जलवायु-सामान्यों पर आधारित है, जो योजना बनाने में मदद करता है।",
    seasonHead: ["ऋतु", "मौसम", "आराम", "सलाह"],
    seasonRows: [
      ["शीतकाल (नवं–फ़रवरी)", "ठंडा, शुष्क", "12–25°C दिन, धूप, कम आर्द्रता", "सबसे सुखद; खुले आँगनों के लिए आदर्श", "सबसे अच्छी खिड़की; सुबह और देर शाम सुखद।"],
      ["ग्रीष्म (मार्च–जून)", "गर्म, शुष्क", "अक्सर 35–44°C, धूल", "दोपहर में कठिन; जल्दी शुरुआत ज़रूरी", "खुलने पर पहुँचें, छाया में रहें, पानी और टोपी साथ रखें।"],
      ["मानसून (जुलाई–सितं)", "गर्म, आर्द्र, छिटपट", "30–36°C, हरा पर फिसलना पत्थर", "भीड़ कम, नाटकीय आसमान", "बारिश के बाद पत्थर फिसलना हो जाता है; भारी बारिश के बाद पहुँच सत्यापित करें।"],
    ],
    climateKicker: "जलवायु और परिस्थितियाँ",
    climateTitle: "मौसम और पत्थर को समझना",
    climateBody: "दीर्घकालिक रूप से वर्ष एक ठंडी शुष्क सर्दी, लंबी गर्म गर्मी और दक्षिण-पश्चिम मानसून में बँटता है। लाल बलुआ पत्थर गर्मी सोख लेता है, इसलिए सतहें और आँगन वायु तापमान से अधिक गर्म लगते हैं। मानसून बारिश से पॉलिश किए पत्थर की सीढ़ियाँ फिसलने लगती हैं और खुले नियोजित शहर में गर्मी की धूप तेज़ होती है। एक दिन के पूर्वानुमान के बजाय इन पैटर्न के अनुसार जल, सूर्य-सुरक्षा और गति की योजना बनाएँ।",

    // Itineraries
    itineraryKicker: "08 — यात्रा-योजनाएँ",
    itineraryTitle: "यात्री और समय के अनुसार मार्ग",
    itineraryIntro: "अपने समूह और उपलब्ध समय के अनुसार मार्ग चुनें। इनमें किसी गाइड की ज़रूरत नहीं और सभी सार्वजनिक परिसर के भीतर हैं।",
    itineraries: [
      ["बच्चों के साथ परिवार", "छोटा, शांत मार्ग: बुलंद दरवाज़े से प्रवेश करें, जामा मस्जिद के आँगन में ठहरें, बच्चों को दीवान-ए-आम के पास खुले स्थान में घूमने दें, फिर छाया में आराम कर लौटें। बार-बार पानी के साथ लगभग आधा दिन रखें।"],
      ["फ़ोटोग्राफ़ी और विरासत", "बाल-रोशनी में पत्थर पर नरम साइड-लाइट के लिए पहली रोशनी में पहुँचें; बुलंद दरवाज़ा, महल क्षेत्र के जाली पर्दे और पंच महल की सममिति को प्राथमिकता दें, और आँगन से सुनहरी घड़ी की तस्वीरों के लिए लौटें। बदलती रोशनी को पूरा दिन लगता है।"],
      ["कम-प्रयास और सुलभ", "निर्धारित पार्किंग और समतल मार्ग का उपयोग करें, जामा मस्जिद के प्रांगण और समतल आँगन को प्राथमिकता दें, बैठकर आराम करें और सबसे खड़ी सीढ़ियों से बचें। एक शांत, छोटा मार्ग आरामदायक रखता है।"],
    ],
    routesKicker: "सुझाए गए प्लान",
    routesTitle: "आधे दिन और पूरे दिन के आउटलाइन",
    routes: [
      ["आधा दिन (3–4 घंटे)", "बुलंद दरवाज़ा → जामा मस्जिद → शेख सलीम चिश्ती का मकबरा → दीवान-ए-आम → पंच महल → आँगन से बाहर। खुलने पर या देर शाम सबसे अच्छा।"],
      ["पूरा दिन (6–7 घंटे)", "महल क्षेत्र, दीवान-ए-ख़ास, रानी के क्वार्टर और पुरातात्विक संग्रहालय जोड़ें, दोपहर में लंबा छाया-ब्रेक लें। आगरा की अन्य जगहों को अलग दिन रखें।"],
    ],

    // Responsibility
    responsibilityKicker: "09 — ज़िम्मेदारी से घूमें",
    responsibilityTitle: "विरासत, पर्यावरण और आप",
    responsibilityBody: "फ़तेहपुर सीकरी एक जीवित यूनेस्को विश्व धरोहर स्थल है। छोटी पसंदें इसे अगले यात्री के लिए बचाती हैं।",
    responsibilityItems: [
      ["ढाँचे का सम्मान करें", "प्रतिबंधित संरचनाओं पर न चढ़ें और पत्थर पर निशान न बनाएँ; चिह्नित पथ पर रहें।"],
      ["कचरा साथ लाएँ", "खुले परिसर में डिब्बे सीमित हैं—अपना कचरा साथ ले जाएँ।"],
      ["पवित्र स्थान में शांति", "जामा मस्जिद और मकबरा सक्रिय पूजा-स्थल हैं; धीरे बोलें और विनम्र कपड़े पहनें।"],
      ["जल और छाया", "यहाँ असली ख़तरा गर्मी और धूप है—अपनी गति रखें और पानी पिएँ।"],
    ],

    legendTitle: "एक भविष्यवाणी पर बसा शहर",
    legendBody: "प्रचलित परंपरा के अनुसार सम्राट अकबर सिकरी की पहाड़ी पर सूफ़ी संत शेख सलीम चिश्ती का आशीर्वाद लेने आए और एक पुत्र का जन्म भविष्यवाणी के अनुसार हुआ। कृतज्ञता में अकबर ने लगभग 1571 में यहाँ एक राजधानी बसाई और अपने गुजरात अभियान के बाद इसका नाम फ़तेहपुर सीकरी—“विजय का शहर”—रखा। लगभग एक दशक तक यह मुग़ल साम्राज्य की राजधानी रही, लाल बलुआ पत्थर से समृद्ध रूप से बनी, फिर 1585 के आसपास दरबार लाहौर और बाद में आगरा चला गया। शहर कभी नष्ट नहीं हुआ; इसे बस छोड़ दिया गया, जिससे इसकी नियोजित गलियाँ, प्रवेश-द्वार और महल आज भी पूरी तरह सुरक्षित हैं।",
  },
  en: {
    htmlLang: "en",
    siteName: "Fatehpur Sikri",
    markLabel: "Fatehpur Sikri Heritage Guide",
    eyebrow: "Independent heritage guide · Uttar Pradesh, India",
    nav: ["Story", "Plan a visit", "Getting there", "Weather", "Seasons", "Itineraries", "FAQ"],
    heroKicker: "By Buland Darwaza",
    heroTitle: <>Beyond the gateway,<br /><em>a planned Mughal city.</em></>,
    heroCopy: "Red sandstone, generous courtyards and a capital shaped by time. A calm, independent, nonprofit guide to understanding Fatehpur Sikri.",
    planVisit: "Plan your visit",
    learnStory: "Read the story",
    rating: "4.5/5 on Google Maps · 43,665 reviews",
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
    entityLead: "Welcome to Fatehpur Sikri Fort, widely recognized simply as Fatehpur Sikri. Located in the heart of Fatehpur Sikri, Uttar Pradesh, India, this UNESCO World Heritage complex is a primary hub for travelers exploring the region's Mughal heritage.",
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
      ["Getting around", "Expect steps and uneven stone surfaces; the planned city suits slow, mindful walking more than wheels in places."],
      ["Parking", "Use the designated public parking areas near the entry and follow on-site signage on arrival."],
      ["Food & drink", "Small eateries and tea stalls sit near the gate; carry your own water for the long, open courtyards."],
      ["Stays nearby", "Agra has the widest range of lodgings; a few guesthouses sit closer to Fatehpur Sikri for early starts."],
      ["Shops & essentials", "Souvenir and convenience stalls gather near the entrance—browse calmly; no single outlet is endorsed."],
      ["Fuel & EV charging", "Fuel stations and a growing number of EV chargers line the Agra–Fatehpur Sikri road; top up before the final stretch."],
    ],
    transportKicker: "03 — Getting there",
    transportTitle: "Towards the heritage complex from Agra or Bharatpur",
    transportIntro: "Fatehpur Sikri is about 37 km from Agra and 18 km from Bharatpur. This section describes transport types only; it does not recommend specific private operators, shops or accommodation.",
    transportCards: [
      ["By air", "The nearest airport is Agra’s Kheria (AGR), with limited domestic flights; most travellers fly into Delhi’s Indira Gandhi International (DEL) and continue by road or rail. Confirm current routes before booking."],
      ["By rail", "Agra Cantt is the main rail hub, well linked to Delhi, Jaipur and Mumbai. From Agra, continue by local bus, shared taxi or app-based cab to the complex."],
      ["By bus / public transit", "UPSRTC and private buses run Agra → Fatehpur Sikri; local shared autos and tempos cover the last stretch from the bus stand. Check timetables the same day."],
      ["Taxi / self-drive", "A cab or private car from Agra (≈37 km) or Bharatpur (≈18 km) is the most flexible option for a day trip. Agree the fare and return time in advance if not using a metered or app cab."],
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
    mapRef: "Plus Code 3MW8+MF · Fatehpur Sikri, Uttar Pradesh, India · +91 522 406 1369",
    openMap: "Open in Google Maps",
    faqKicker: "10 — FAQ",
    faqTitle: "Questions often asked before a visit",
    faq: [
      ["When is Fatehpur Sikri open?", "The Archaeological Survey of India lists it as open from sunrise to sunset. Times may vary, so an official same-day check is useful."],
      ["How much time should I allow?", "At least half a day is a comfortable allowance for exploring the palace complex and Jama Masjid area with context."],
      ["Why is Buland Darwaza significant?", "It is the vast gateway to the Jama Masjid precinct. UNESCO describes it as completed to commemorate the victory of Gujarat, at about 40 metres in height."],
      ["Can I visit from Agra in a day?", "Yes. Official Uttar Pradesh tourism material describes it as an accessible day trip from Agra. Actual journey time depends on traffic and transport."],
      ["Where is Fatehpur Sikri Fort located?", "Fatehpur Sikri Fort is located at Buland Gate, Dadupura, Fatehpur Sikri, Uttar Pradesh 283110, India — about 37 km from Agra."],
      ["What is Fatehpur Sikri famous for?", "It is a UNESCO World Heritage Site known for Buland Darwaza, the Jama Masjid, Panch Mahal and Akbar's planned Mughal capital."],
      ["Is Fatehpur Sikri in Rajasthan?", "No. Fatehpur Sikri is in Uttar Pradesh (Agra district), not Rajasthan. The confusion is common because it lies near the Rajasthan border."],
      ["What is the entry ticket fee?", "ASI monuments usually charge a lower fee for Indian citizens and a higher fee for foreign nationals; entry for children under 15 is listed as free. Verify the current rate with an official source before travel."],
      ["What is the Dargah of Sheikh Salim Chishti?", "It is a white marble tomb within the complex and an active Sufi shrine. Dress modestly and remove your shoes; respect the rules of the place of worship."],
      ["Is there a Hindi version of this guide?", "Yes. Use the EN / हिं button at the top of the page to read the entire guide in Hindi as well as English."],
    ],
    resourcesKicker: "Sources and responsibility",
    resourcesTitle: "Open information, independent presentation",
    resourcesBody: "Historical notes and practical cues are compiled from credible public sources. Always consult official channels for consequential decisions, tickets, timing, access and local regulations.",
    sources: [
      ["UNESCO", "World Heritage List and Outstanding Universal Value"],
      ["Archaeological Survey of India", "Fatehpur Sikri: hours, admission and museum information"],
      ["Uttar Pradesh Tourism", "Journey information from Agra, site overview and official details"],
      ["Wikipedia", "Independent encyclopedia — concise history and facts"],
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

    // Weather
    weatherKicker: "06 — Weather",
    weatherTitle: "Today and the week ahead at Fatehpur Sikri",
    weatherIntro: "Live conditions and a seven-day outlook for the complex, refreshed every few minutes, to help you choose clothing, shade and rain protection.",
    wNow: "Now",
    wForecast: "Next 7 days",
    wFeels: "Feels like",
    wHumidity: "Humidity",
    wWind: "Wind",
    wRain: "Rain",
    wUv: "UV",
    wUpdated: "Updated",
    wLoading: "Loading current conditions…",
    wError: "Live weather is briefly unavailable. Local conditions shift quickly—check a weather app before you leave.",
    wUmbrella: "Carry rain protection today; showers or a high rain chance are expected.",
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
    seasonsIntro: "Fatehpur Sikri has a hot semi-arid climate with three clear seasons. The summary below draws on long-term climate normals to help you plan.",
    seasonHead: ["Season", "Weather", "Comfort", "Advice"],
    seasonRows: [
      ["Winter (Nov–Feb)", "Cool, dry", "12–25°C days, sunny, low humidity", "Most comfortable; ideal for the open courtyards", "Best overall window; mornings and late afternoons are pleasant."],
      ["Summer (Mar–Jun)", "Hot, dry", "Often 35–44°C, dusty", "Demanding at midday; early starts essential", "Arrive at opening, keep to shade, carry water and a hat."],
      ["Monsoon (Jul–Sep)", "Warm, humid, showers", "30–36°C, green but slick stone", "Fewer crowds, dramatic skies", "Stone gets slippery after rain; verify access after heavy showers."],
    ],
    climateKicker: "Climate & conditions",
    climateTitle: "Reading the weather and the stone",
    climateBody: "Over the long term the year falls into a cool dry winter, a long hot summer and a southwest monsoon. The red sandstone soaks up heat, so surfaces and courtyards feel warmer than the air temperature suggests. Monsoon rain can make polished stone steps slippery, and the summer sun is intense with little shade across the open planned city. Plan hydration, sun protection and pacing around these patterns rather than a single day’s forecast.",

    // Itineraries
    itineraryKicker: "08 — Itineraries",
    itineraryTitle: "Routes by traveller and by time",
    itineraryIntro: "Pick a route that matches your group and your available time. None requires a guide, and all stay within the public complex.",
    itineraries: [
      ["Families with children", "A shorter, calmer loop: enter at Buland Darwaza, pause at the Jama Masjid courtyard, let children explore the open space near Diwan-i-Am, then rest in shade before returning. Keep it to about half a day with frequent water breaks."],
      ["Photography & heritage", "Arrive at first light for soft side-light on the sandstone; prioritise Buland Darwaza, the jali screens of the palace zone and Panch Mahal’s symmetry, and return for golden-hour shots from the courtyard. A full day captures the changing light."],
      ["Low-effort & accessible", "Use the designated parking and flatter approach, favour the Jama Masjid forecourt and level courtyards, take seated breaks and avoid the steepest staircases. A calm, shorter circuit keeps it comfortable."],
    ],
    routesKicker: "Suggested plans",
    routesTitle: "Half-day and full-day outlines",
    routes: [
      ["Half-day (3–4 hrs)", "Buland Darwaza → Jama Masjid → Tomb of Sheikh Salim Chishti → Diwan-i-Am → Panch Mahal → exit via the courtyard. Best at opening or late afternoon."],
      ["Full-day (6–7 hrs)", "Add the palace zones, Diwan-i-Khas, the queen’s quarters and the archaeological museum, with a long midday shade break. Pair with Agra’s other sites on a separate day."],
    ],

    // Responsibility
    responsibilityKicker: "09 — Visit responsibly",
    responsibilityTitle: "Heritage, environment and you",
    responsibilityBody: "Fatehpur Sikri is a living UNESCO World Heritage site. Small choices protect it for the next visitor.",
    responsibilityItems: [
      ["Respect the fabric", "Do not climb restricted structures or mark the stone; stay on the marked paths."],
      ["Carry out waste", "Bins are limited across the open complex—take your litter with you."],
      ["Quiet in sacred space", "The Jama Masjid and the tomb are active places of worship; speak softly and dress modestly."],
      ["Hydrate & shade", "Heat and sun are the real hazards here—pace yourself and drink water."],
    ],

    // History / legend enrichment
    legendTitle: "A city raised on a prophecy",
    legendBody: "Widely told tradition holds that Emperor Akbar came to the ridge of Sikri seeking the blessings of the Sufi saint Sheikh Salim Chishti, and a son was born as foretold. In gratitude Akbar founded a capital here around 1571, naming it Fatehpur Sikri—the “City of Victory”—after his Gujarat campaign. For roughly a decade it was the Mughal Empire’s capital, built richly in red sandstone, before the court moved to Lahore around 1585 and later to Agra. The city was never destroyed; it was simply left, which is why its planned streets, gateways and palaces survive so completely today.",
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
    document.title = language === "hi" ? "फ़तेहपुर सीकरी क़िला (Fatehpur Sikri Fort) — पर्यटन गाइड" : "Fatehpur Sikri Fort Guide — Timings, Ticket, History & Location";
  }, [language, t.htmlLang]);

  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://fatehpursikrifort.com/#website",
        name: "Fatehpur Sikri Fort Fatehpur Sikri Travel Guide",
        url: "https://fatehpursikrifort.com",
        inLanguage: language,
      },
      {
        "@type": "TouristAttraction",
        "@id": "https://fatehpursikrifort.com/#attraction",
        name: "Fatehpur Sikri Fort",
        alternateName: ["Fatehpur Sikri", "Buland Darwaza", "फ़तेहपुर सीकरी क़िला"],
        description: "Comprehensive visitor guide to Fatehpur Sikri Fort in Fatehpur Sikri, Uttar Pradesh, India.",
        url: "https://fatehpursikrifort.com",
        image: ["https://fatehpursikrifort.com/og-cover.jpg"],
        address: { "@type": "PostalAddress", streetAddress: "Buland Gate, Dadupura", addressLocality: "Fatehpur Sikri", addressRegion: "Uttar Pradesh", postalCode: "283110", addressCountry: "IN" },
        geo: { "@type": "GeoCoordinates", latitude: 27.0966511, longitude: 77.6636685 },
        telephone: "+915224061369",
        openingHours: "Open from sunrise to sunset",
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.5", reviewCount: "43665" },
        hasMap: "https://maps.app.goo.gl/4fcjp1yYQ3WQsXm88",
        sameAs: [
          "https://maps.app.goo.gl/4fcjp1yYQ3WQsXm88",
          "https://www.tajmahal.gov.in/fatehpur-sikri.aspx",
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: t.faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
      },
    ],
  }), [t.faq]);

  const navIds = ["story", "visit", "transport", "weather", "seasons", "itineraries", "faq"];
  const utilities = [Accessibility, CarFront, Utensils, Building2, Store, Fuel];
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
        <h1 className="sr-only">{language === "hi" ? "फ़तेहपुर सीकरी क़िला (फ़तेहपुर सीकरी)" : "Fatehpur Sikri Fort (Fatehpur Sikri)"}</h1>
        <p className="sr-only">Fatehpur Sikri Fort › Fatehpur Sikri › Uttar Pradesh › India</p>
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
              <img src={images.buland} alt={language === "hi" ? "फ़तेहपुर सीकरी क़िला (Fatehpur Sikri Fort) — बुलंद दरवाज़ा, मुख्य दृश्य फ़तेहपुर सीकरी, भारत" : "Fatehpur Sikri Fort — Buland Darwaza, main view in Fatehpur Sikri, India"} />
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
              <p className="entity-lead">{t.entityLead}</p>
              <h2>{t.introTitle}</h2>
              <div><p>{t.introBody}</p><a href="https://whc.unesco.org/en/list/255/" target="_blank" rel="noreferrer">{t.heritageSource}<ArrowUpRight size={15} /></a></div>
            </div>
            <blockquote>{t.introQuote}</blockquote>
            <div className="story-timeline">{t.storyCards.map(([date, title, body]) => <article key={date}><p>{date}</p><h3>{title}</h3><span>{body}</span></article>)}</div>
            <div className="story-legend"><h3>{t.legendTitle}</h3><p>{t.legendBody}</p></div>
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
          <div className="nearby-image"><img src={images.courtyard} alt={language === "hi" ? "फ़तेहपुर सीकरी क़िले का लाल पत्थर का आँगन, फ़तेहपुर सीकरी" : "Fatehpur Sikri Fort courtyard — red sandstone, Fatehpur Sikri"} /><p className="image-credit">{language === "hi" ? "चित्र: वास्तविक फ़ोटोग्राफ़ · Unsplash" : "Photo: real photography · Unsplash"}</p></div>
          <div className="nearby-content"><SectionMark number="04" label={t.nearbyKicker.replace("04 — ", "")} /><h2>{t.nearbyTitle}</h2><div>{t.nearbyCards.map(([title, body]) => <article key={title}><span>↗</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></div>
        </section>

        <section id="map" className="map-section section-padding">
          <div className="map-copy"><SectionMark number="05" label={t.mapKicker.replace("05 — ", "")} /><h2>{t.mapTitle}</h2><p>{t.mapBody}</p><a className="map-link" href="https://maps.app.goo.gl/4fcjp1yYQ3WQsXm88" target="_blank" rel="noreferrer"><MapPin size={18} />{t.openMap}<ExternalLink size={14} /></a><p className="map-ref">{t.mapRef}</p></div>
          <div className="map-frame"><iframe title={t.mapTitle} src={mapSrc} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
        </section>

        <section id="weather" className="weather-section section-padding">
          <div className="section-heading"><SectionMark number="06" label={t.weatherKicker.replace("06 — ", "")} /><h2>{t.weatherTitle}</h2><p>{t.weatherIntro}</p></div>
          <WeatherPanel lang={language} labels={{ now: t.wNow, forecast: t.wForecast, feels: t.wFeels, humidity: t.wHumidity, wind: t.wWind, rain: t.wRain, uv: t.wUv, updated: t.wUpdated, loading: t.wLoading, error: t.wError, umbrella: t.wUmbrella, heat: t.wHeat, uvWarn: t.wUvWarn, advTitle: t.advTitle, advOutfit: t.advOutfit, advActivity: t.advActivity, advItems: t.advItems, advRisk: t.advRisk }} />
        </section>

        <section id="seasons" className="seasons-section section-padding">
          <div className="section-heading"><SectionMark number="07" label={t.seasonsKicker.replace("07 — ", "")} /><h2>{t.seasonsTitle}</h2><p>{t.seasonsIntro}</p></div>
          <div className="season-table-wrap">
            <table className="season-table">
              <thead><tr>{t.seasonHead.map((h) => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>
                {t.seasonRows.map((row) => (
                  <tr key={row[0]}>
                    <th scope="row">{row[0]}</th>
                    <td>{row[1]}<br /><small>{row[2]}</small></td>
                    <td>{row[3]}</td>
                    <td>{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="climate-block"><p className="eyebrow">{t.climateKicker}</p><h3>{t.climateTitle}</h3><p>{t.climateBody}</p></div>
        </section>

        <section id="itineraries" className="itinerary-section section-padding">
          <div className="section-heading"><SectionMark number="08" label={t.itineraryKicker.replace("08 — ", "")} /><h2>{t.itineraryTitle}</h2><p>{t.itineraryIntro}</p></div>
          <div className="itinerary-grid">{t.itineraries.map(([title, body]) => <article key={title} className="itinerary-card"><h3>{title}</h3><p>{body}</p></article>)}</div>
          <div className="routes-block">
            <p className="eyebrow">{t.routesKicker}</p>
            <h3>{t.routesTitle}</h3>
            <div className="routes-list">{t.routes.map(([title, body]) => <article key={title} className="route-card"><h4>{title}</h4><p>{body}</p></article>)}</div>
          </div>
        </section>

        <section id="responsibility" className="responsibility-section section-padding">
          <div className="section-heading"><SectionMark number="09" label={t.responsibilityKicker.replace("09 — ", "")} /><h2>{t.responsibilityTitle}</h2><p>{t.responsibilityBody}</p></div>
          <div className="responsibility-grid">{t.responsibilityItems.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
        </section>

        <section id="faq" className="faq-section section-padding">
          <div className="section-heading"><SectionMark number="10" label={t.faqKicker.replace("10 — ", "")} /><h2>{t.faqTitle}</h2></div>
          <div className="faq-list">{t.faq.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<ChevronDown size={20} /></summary><p>{answer}</p></details>)}</div>
        </section>

        <section className="sources-section section-padding">
          <div><p className="eyebrow">{t.resourcesKicker}</p><h2>{t.resourcesTitle}</h2><p>{t.resourcesBody}</p></div>
          <div className="source-list">{t.sources.map(([name, description], index) => <a key={name} href={["https://whc.unesco.org/en/list/255/", "https://asi.nic.in/pages/WorldHeritageFatehpurSikri", "https://uptourism.gov.in", "https://en.wikipedia.org/wiki/Fatehpur_Sikri"][index]} target="_blank" rel="noreferrer"><span>0{index + 1}</span><div><h3>{name}</h3><p>{description}</p></div><ArrowUpRight size={17} /></a>)}</div>
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
