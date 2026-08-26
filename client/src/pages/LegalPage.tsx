/**
 * 设计提示：赤砂石的门槛——法律内容也保持如档案页般的留白、细边线与清晰的双语阅读层级。
 */
import { BrandMark } from "@/components/BrandMark";
import { ArrowLeft, Check, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

type LegalKind = "privacy" | "terms" | "cookies";
type Language = "hi" | "en";

const legalCopy = {
  hi: {
    language: "EN", back: "मुख्य गाइड पर लौटें", site: "फ़तेहपुर सीकरी", updated: "अंतिम अद्यतन: अगस्त 2026",
    privacy: { title: "गोपनीयता नीति", intro: "यह स्वतंत्र, गैर-लाभकारी सूचना परियोजना न्यूनतम आवश्यक जानकारी के सिद्धांत पर कार्य करती है।", sections: [["हम कौन-सी जानकारी एकत्र कर सकते हैं", "ब्राउज़िंग डेटा जैसे IP पता, ब्राउज़र प्रकार और देखे गए पृष्ठ; कुकी और समान तकनीक; तथा संपर्क के दौरान स्वेच्छा से दी गई जानकारी।"], ["जानकारी का उपयोग", "वेबसाइट सामग्री और अनुभव सुधारने, उपयोग के रुझान समझने, अनुरोधों का उत्तर देने और कानूनी दायित्वों का पालन करने के लिए।"], ["तृतीय-पक्ष सेवाएँ", "स्थान के लिए Google Maps और, केवल आपकी सहमति के बाद, Google Analytics का उपयोग हो सकता है। इन सेवाओं की अपनी गोपनीयता नीतियाँ हैं।"], ["आपके अधिकार", "लागू कानूनों के अधीन आप अपने निजी डेटा तक पहुँच, सुधार या मिटाने का अनुरोध, प्रसंस्करण पर आपत्ति और नियामक प्राधिकरण में शिकायत कर सकते हैं।"]] },
    terms: { title: "सेवा शर्तें", intro: "इस गाइड का उपयोग करके आप इन शर्तों को स्वीकार करते हैं।", sections: [["सामग्री का उपयोग", "सारी सामग्री सामान्य सूचना के लिए है। यह साइट किसी पर्यटन स्थल, सरकारी संस्था या वाणिज्यिक संचालक से संबद्ध नहीं है।"], ["जानकारी की सटीकता", "हम उपयोगी और सावधानी से जाँची गई जानकारी प्रस्तुत करने का प्रयास करते हैं, पर पूर्णता या निरंतर सटीकता की गारंटी नहीं दे सकते। यात्रा से पहले महत्वपूर्ण बातों को आधिकारिक स्रोत से सत्यापित करें।"], ["बौद्धिक संपदा", "साइट का डिज़ाइन और मौलिक सामग्री संरक्षित है। तस्वीरों के अधिकार मूल फोटोग्राफरों के पास हैं; Google Maps डेटा का उपयोग उसके नियमों के अधीन है।"], ["दायित्व की सीमा", "यह साइट “जैसी है” आधार पर दी गई है। यहाँ की जानकारी पर यात्रा या अन्य निर्णय लेने से होने वाले नुकसान के लिए यह परियोजना उत्तरदायी नहीं है।"]] },
    cookies: { title: "कुकी सेटिंग", intro: "आप अपनी गोपनीयता पसंद बदल सकते हैं। आवश्यक कुकी साइट के कामकाज के लिए जरूरी हैं; विश्लेषण कुकी केवल आपकी सहमति पर सक्रिय होती हैं।", essential: "आवश्यक कुकी", analytics: "विश्लेषण कुकी", preference: "पसंद कुकी", required: "हमेशा सक्रिय", analyticsDesc: "Google Analytics को आपकी अनुमति के बाद ही अनाम उपयोग-संबंधी संकेत इकट्ठा करने दें।", preferenceDesc: "भाषा जैसी चुनी गई साइट पसंद को आपके ब्राउज़र में याद रखें।", save: "पसंद सहेजें", decline: "सभी गैर-आवश्यक अस्वीकार करें", saved: "आपकी कुकी पसंद सहेज ली गई है।" },
  },
  en: {
    language: "हिं", back: "Return to the guide", site: "Fatehpur Sikri", updated: "Last updated: August 2026",
    privacy: { title: "Privacy policy", intro: "This independent, nonprofit information project follows a principle of collecting only the minimum information needed to operate the site.", sections: [["Information we may collect", "Browsing data such as IP address, browser type and pages viewed; cookies and similar technologies; and information you voluntarily provide when contacting us."], ["How information is used", "To improve site content and experience, understand usage patterns, respond to requests and meet legal obligations."], ["Third-party services", "Google Maps may be used for location, and Google Analytics only after your consent. These services maintain their own privacy policies."], ["Your rights", "Subject to applicable law, you may request access, correction or deletion of personal data, object to processing and complain to a supervisory authority."]] },
    terms: { title: "Terms of use", intro: "By using this guide, you agree to these terms.", sections: [["Use of content", "All content is for general information. This site is not affiliated with any attraction, government institution or commercial operator."], ["Accuracy of information", "We try to provide useful, carefully checked information, but cannot guarantee completeness or continuous accuracy. Verify consequential details with official sources before travel."], ["Intellectual property", "The site design and original content are protected. Image rights remain with original photographers; Google Maps data is used subject to its own terms."], ["Limitation of liability", "This site is offered on an “as is” basis. The project is not responsible for loss arising from travel or other decisions made using this information."]] },
    cookies: { title: "Cookie settings", intro: "You can change your privacy choices. Essential cookies are needed for the site to function; analytics cookies activate only with your consent.", essential: "Essential cookies", analytics: "Analytics cookies", preference: "Preference cookies", required: "Always active", analyticsDesc: "Allow Google Analytics to collect anonymous usage signals only after you give permission.", preferenceDesc: "Remember a selected site preference, such as language, in this browser.", save: "Save preferences", decline: "Reject all non-essential", saved: "Your cookie choices have been saved." },
  },
} as const;

export default function LegalPage({ kind }: { kind: LegalKind }) {
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem("fs-language") as Language) || "hi");
  const [analytics, setAnalytics] = useState(localStorage.getItem("fs-cookie-analytics") === "granted");
  const [preference, setPreference] = useState(localStorage.getItem("fs-cookie-preference") !== "denied");
  const [saved, setSaved] = useState(false);
  const t = legalCopy[language];
  const page = t[kind];

  useEffect(() => { document.documentElement.lang = language; }, [language]);

  function saveChoices(allowAnalytics = analytics, allowPreference = preference) {
    localStorage.setItem("fs-cookie-analytics", allowAnalytics ? "granted" : "denied");
    localStorage.setItem("fs-cookie-preference", allowPreference ? "granted" : "denied");
    setAnalytics(allowAnalytics); setPreference(allowPreference); setSaved(true);
  }

  return <main className="legal-page"><header className="legal-header"><Link href="/" className="legal-brand"><BrandMark className="legal-mark" /><span>{t.site}</span></Link><button className="language-button legal-language" onClick={() => setLanguage(language === "hi" ? "en" : "hi")}>{t.language}</button></header><section className="legal-hero"><Link href="/" className="back-link"><ArrowLeft size={16} />{t.back}</Link><p>{t.updated}</p><h1>{page.title}</h1><div className="legal-intro"><ShieldCheck size={22} /><span>{page.intro}</span></div></section>{kind === "cookies" ? <section className="cookie-panel"><CookieRow title={t.cookies.essential} description={t.cookies.required} checked disabled onChange={() => undefined} /><CookieRow title={t.cookies.analytics} description={t.cookies.analyticsDesc} checked={analytics} onChange={setAnalytics} /><CookieRow title={t.cookies.preference} description={t.cookies.preferenceDesc} checked={preference} onChange={setPreference} /><div className="cookie-actions"><button className="button-primary" onClick={() => saveChoices()}>{t.cookies.save}<Check size={17} /></button><button className="text-action" onClick={() => saveChoices(false, false)}>{t.cookies.decline}</button></div>{saved && <p className="saved-message">{t.cookies.saved}</p>}</section> : <section className="legal-content">{"sections" in page && page.sections.map(([title, body], index) => <article key={title}><span>0{index + 1}</span><div><h2>{title}</h2><p>{body}</p></div></article>)}</section>}<footer className="legal-footer"><Link href="/privacy">{t.privacy.title}</Link><Link href="/terms">{t.terms.title}</Link><Link href="/cookies">{t.cookies.title}</Link></footer></main>;
}

function CookieRow({ title, description, checked, disabled, onChange }: { title: string; description: string; checked: boolean; disabled?: boolean; onChange: (next: boolean) => void }) {
  return <div className="cookie-row"><div><h2>{title}</h2><p>{description}</p></div><button className={checked ? "switch switch-on" : "switch"} disabled={disabled} onClick={() => onChange(!checked)} aria-pressed={checked}><span /></button></div>;
}
