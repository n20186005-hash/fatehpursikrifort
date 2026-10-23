/**
 * 设计提示：赤砂石的门槛——法律内容也保持如档案页般的留白、细边线与清晰的双语阅读层级。
 */
import { BrandMark } from "@/components/BrandMark";
import { ArrowLeft, Check, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { analyticsChoice, saveAnalytics } from "@/lib/analytics";

type LegalKind = "privacy" | "terms" | "cookies";
type Language = "hi" | "en";

const legalCopy = {
  hi: {
    language: "EN",
    back: "मुख्य गाइड पर लौटें",
    site: "फ़तेहपुर सीकरी",
    updated: "अंतिम अद्यतन: 23 अक्टूबर 2026",
    privacy: {
      title: "गोपनीयता नीति",
      intro:
        "यह स्वतंत्र सूचना परियोजना न्यूनतम आवश्यक जानकारी के सिद्धांत पर कार्य करती है।",
      sections: [
        [
          "हम कौन-सी जानकारी एकत्र कर सकते हैं",
          "ब्राउज़िंग डेटा जैसे IP पता, ब्राउज़र प्रकार और देखे गए पृष्ठ; कुकी और समान तकनीक; तथा विश्लेषण पसंद के लिए ब्राउज़र स्टोरेज। इस साइट पर संपर्क फ़ॉर्म, खाता या बुकिंग सुविधा नहीं है।",
        ],
        [
          "जानकारी का उपयोग",
          "वेबसाइट सामग्री और अनुभव सुधारने, उपयोग के रुझान समझने, गाइड चलाने और लागू दायित्वों का पालन करने के लिए।",
        ],
        [
          "तृतीय-पक्ष सेवाएँ",
          "पृष्ठ लोड होने पर Google Maps और Google Fonts, Google से जुड़ते हैं। मौसम डेटा इस साइट के सर्वर के माध्यम से Open-Meteo से आता है। वैकल्पिक Google Analytics केवल सत्यापित अनुमति के बाद लोड होता है; यह सेटिंग अन्य संसाधनों या होस्टिंग अनुरोध लॉग को नियंत्रित नहीं करती। सेवाओं की अपनी नीतियाँ हैं।",
        ],
        [
          "आपके अधिकार",
          "लागू कानूनों के अधीन आप अपने निजी डेटा तक पहुँच, सुधार या मिटाने का अनुरोध, प्रसंस्करण पर आपत्ति और नियामक प्राधिकरण में शिकायत कर सकते हैं।",
        ],
      ],
    },
    terms: {
      title: "सेवा शर्तें",
      intro: "इस गाइड का उपयोग करके आप इन शर्तों को स्वीकार करते हैं।",
      sections: [
        [
          "सामग्री का उपयोग",
          "सारी सामग्री सामान्य सूचना के लिए है। यह साइट किसी पर्यटन स्थल, सरकारी संस्था या वाणिज्यिक संचालक से संबद्ध नहीं है।",
        ],
        [
          "जानकारी की सटीकता",
          "हम उपयोगी और सावधानी से जाँची गई जानकारी प्रस्तुत करने का प्रयास करते हैं, पर पूर्णता या निरंतर सटीकता की गारंटी नहीं दे सकते। यात्रा से पहले महत्वपूर्ण बातों को आधिकारिक स्रोत से सत्यापित करें।",
        ],
        [
          "बौद्धिक संपदा",
          "साइट का डिज़ाइन और मौलिक सामग्री संरक्षित है। तस्वीरों के अधिकार मूल फोटोग्राफरों के पास हैं; Google Maps डेटा का उपयोग उसके नियमों के अधीन है।",
        ],
        [
          "दायित्व की सीमा",
          "यह साइट “जैसी है” आधार पर दी गई है। यहाँ की जानकारी पर यात्रा या अन्य निर्णय लेने से होने वाले नुकसान के लिए यह परियोजना उत्तरदायी नहीं है।",
        ],
      ],
    },
    cookies: {
      title: "कुकी सेटिंग",
      intro:
        "Google Analytics वैकल्पिक है। अस्वीकार इस पृष्ठ पर तुरंत लागू होता है, भले ही सहेजना विफल हो। भाषा URL से चुनी जाती है; भाषा पसंद सहेजी नहीं जाती। पहले से बनी Google कुकी ब्राउज़र में हटाने तक रह सकती हैं।",
      essential: "आवश्यक कुकी",
      analytics: "विश्लेषण कुकी",
      preference: "पसंद कुकी",
      required: "हमेशा सक्रिय",
      analyticsDesc:
        "Google Analytics को आपकी अनुमति के बाद ही उपयोग-संबंधी माप इकट्ठा करने दें।",
      preferenceDesc:
        "भाषा जैसी चुनी गई साइट पसंद को आपके ब्राउज़र में याद रखें।",
      save: "पसंद सहेजें",
      decline: "सभी गैर-आवश्यक अस्वीकार करें",
      saved: "आपकी कुकी पसंद सहेज ली गई है।",
    },
  },
  en: {
    language: "हिं",
    back: "Return to the guide",
    site: "Fatehpur Sikri",
    updated: "Last updated: 23 October 2026",
    privacy: {
      title: "Privacy policy",
      intro:
        "This independent information project follows a principle of collecting only the minimum information needed to operate the site.",
      sections: [
        [
          "Information we may collect",
          "Browsing data such as IP address, browser type and pages viewed; cookies and similar technologies; and browser storage for analytics choices. This site has no contact form, accounts or booking service.",
        ],
        [
          "How information is used",
          "To improve site content and experience, understand usage patterns, operate the guide and meet applicable obligations.",
        ],
        [
          "Third-party services",
          "Google Maps embeds and Google Fonts connect to Google when pages load. The weather endpoint requests Open-Meteo through this site’s server. Optional Google Analytics loads only after a confirmed grant; the setting controls Google Analytics, not these other resources or hosting request logs. These providers apply their own policies.",
        ],
        [
          "Your rights",
          "Subject to applicable law, you may request access, correction or deletion of personal data, object to processing and complain to a supervisory authority.",
        ],
      ],
    },
    terms: {
      title: "Terms of use",
      intro: "By using this guide, you agree to these terms.",
      sections: [
        [
          "Use of content",
          "All content is for general information. This site is not affiliated with any attraction, government institution or commercial operator.",
        ],
        [
          "Accuracy of information",
          "We try to provide useful, carefully checked information, but cannot guarantee completeness or continuous accuracy. Verify consequential details with official sources before travel.",
        ],
        [
          "Intellectual property",
          "The site design and original content are protected. Image rights remain with original photographers; Google Maps data is used subject to its own terms.",
        ],
        [
          "Limitation of liability",
          "This site is offered on an “as is” basis. The project is not responsible for loss arising from travel or other decisions made using this information.",
        ],
      ],
    },
    cookies: {
      title: "Cookie settings",
      intro:
        "Google Analytics is optional. Rejecting it takes effect immediately in this page, including when saving fails. Language is selected by the page URL; no language preference is stored. Previously set Google cookies may remain in your browser until you clear them.",
      essential: "Essential cookies",
      analytics: "Analytics cookies",
      preference: "Preference cookies",
      required: "Always active",
      analyticsDesc:
        "Allow Google Analytics to collect usage measurements only after you give permission.",
      preferenceDesc:
        "Remember a selected site preference, such as language, in this browser.",
      save: "Save preferences",
      decline: "Reject all non-essential",
      saved: "Your cookie choices have been saved.",
    },
  },
} as const;

export default function LegalPage({
  kind,
  language,
}: {
  kind: LegalKind;
  language: Language;
}) {
  const [analytics, setAnalytics] = useState(false);
  const [feedback, setFeedback] = useState("");
  const t = legalCopy[language];
  const page = t[kind];
  const prefix = language === "en" ? "/en" : "";
  useEffect(() => {
    setAnalytics(analyticsChoice());
  }, []);
  function saveChoices(allowAnalytics = analytics) {
    const result = saveAnalytics(allowAnalytics);
    setAnalytics(result.granted);
    setFeedback(
      result.saved
        ? t.cookies.saved
        : language === "en"
          ? `Analytics is off ${result.tabOnly ? "for this page" : "in this tab"}. Your choice could not be fully saved.${result.otherTabsMayRemain ? " Stored permission may remain usable by other tabs, including permission from this failed attempt." : " Shared permission is off; tab storage could not be confirmed."}`
          : `विश्लेषण ${result.tabOnly ? "इस पृष्ठ पर" : "इस टैब में"} बंद है। पसंद पूरी तरह सहेजी नहीं गई।${result.otherTabsMayRemain ? " पहले की या इस विफल प्रयास की अनुमति अन्य टैब में उपयोग हो सकती है।" : " साझा अनुमति बंद है; टैब स्टोरेज की पुष्टि नहीं हुई।"}`
    );
  }
  return (
    <main className="legal-page">
      <header className="legal-header">
        <a href={prefix + "/"} className="legal-brand">
          <BrandMark className="legal-mark" />
          <span>{t.site}</span>
        </a>
        <a
          className="language-button legal-language"
          href={(language === "hi" ? "/en" : "") + "/" + kind}
          hrefLang={language === "hi" ? "en" : "hi"}
        >
          {t.language}
        </a>
      </header>
      <section className="legal-hero">
        <a href={prefix + "/"} className="back-link">
          <ArrowLeft size={16} />
          {t.back}
        </a>
        <p>{t.updated}</p>
        <h1>{page.title}</h1>
        <div className="legal-intro">
          <ShieldCheck size={22} />
          <span>{page.intro}</span>
        </div>
      </section>
      {kind === "cookies" ? (
        <section className="cookie-panel">
          <CookieRow
            title={t.cookies.analytics}
            description={t.cookies.analyticsDesc}
            checked={analytics}
            onChange={next => {
              setAnalytics(next);
              setFeedback("");
            }}
          />
          <div className="cookie-actions">
            <button className="button-primary" onClick={() => saveChoices()}>
              {t.cookies.save}
              <Check size={17} />
            </button>
            <button className="text-action" onClick={() => saveChoices(false)}>
              {t.cookies.decline}
            </button>
          </div>
          {feedback && (
            <p className="saved-message" role="status">
              {feedback}
            </p>
          )}
        </section>
      ) : (
        <section className="legal-content">
          {"sections" in page &&
            page.sections.map(([title, body], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <div>
                  <h2>{title}</h2>
                  <p>{body}</p>
                </div>
              </article>
            ))}
        </section>
      )}
      <footer className="legal-footer">
        <a href={prefix + "/privacy"}>{t.privacy.title}</a>
        <a href={prefix + "/terms"}>{t.terms.title}</a>
        <a href={prefix + "/cookies"}>{t.cookies.title}</a>
      </footer>
    </main>
  );
}

function CookieRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <div className="cookie-row">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <button
        className={checked ? "switch switch-on" : "switch"}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        aria-label={title}
        aria-pressed={checked}
      >
        <span />
      </button>
    </div>
  );
}
