export type IconKey =
  | "sunny"
  | "partly"
  | "cloudy"
  | "fog"
  | "drizzle"
  | "rain"
  | "snow"
  | "thunder";

export interface WmoInfo {
  en: string;
  hi: string;
  icon: IconKey;
}

/** WMO weather interpretation codes → bilingual label + icon hint. */
export const WMO: Record<number, WmoInfo> = {
  0: { en: "Clear sky", hi: "साफ़ आसमान", icon: "sunny" },
  1: { en: "Mainly clear", hi: "मुख्यतः साफ़", icon: "partly" },
  2: { en: "Partly cloudy", hi: "आंशिक बादल", icon: "partly" },
  3: { en: "Overcast", hi: "बादल छाए", icon: "cloudy" },
  45: { en: "Fog", hi: "कोहरा", icon: "fog" },
  48: { en: "Rime fog", hi: "पाला कोहरा", icon: "fog" },
  51: { en: "Light drizzle", hi: "हल्की बूँदाबाँदी", icon: "drizzle" },
  53: { en: "Drizzle", hi: "बूँदाबाँदी", icon: "drizzle" },
  55: { en: "Dense drizzle", hi: "घनी बूँदाबाँदी", icon: "drizzle" },
  56: { en: "Freezing drizzle", hi: "जमती बूँदाबाँदी", icon: "drizzle" },
  57: { en: "Freezing drizzle", hi: "जमती बूँदाबाँदी", icon: "drizzle" },
  61: { en: "Light rain", hi: "हल्की बारिश", icon: "rain" },
  63: { en: "Rain", hi: "बारिश", icon: "rain" },
  65: { en: "Heavy rain", hi: "भारी बारिश", icon: "rain" },
  66: { en: "Freezing rain", hi: "जमती बारिश", icon: "rain" },
  67: { en: "Freezing rain", hi: "जमती बारिश", icon: "rain" },
  71: { en: "Light snow", hi: "हल्की बर्फ़", icon: "snow" },
  73: { en: "Snow", hi: "बर्फ़", icon: "snow" },
  75: { en: "Heavy snow", hi: "भारी बर्फ़", icon: "snow" },
  77: { en: "Snow grains", hi: "बर्फ़ के कण", icon: "snow" },
  80: { en: "Rain showers", hi: "छिटपट बारिश", icon: "rain" },
  81: { en: "Rain showers", hi: "छिटपट बारिश", icon: "rain" },
  82: { en: "Violent showers", hi: "तेज़ छिटपट बारिश", icon: "rain" },
  85: { en: "Snow showers", hi: "बर्फ़ की छिटपट", icon: "snow" },
  86: { en: "Snow showers", hi: "बर्फ़ की छिटपट", icon: "snow" },
  95: { en: "Thunderstorm", hi: "आंधी-तूफ़ान", icon: "thunder" },
  96: { en: "Thunderstorm, hail", hi: "आंधी-तूफ़ान, ओला", icon: "thunder" },
  99: { en: "Thunderstorm, hail", hi: "आंधी-तूफ़ान, ओला", icon: "thunder" },
};

export function wmo(code: number): WmoInfo {
  return WMO[code] ?? WMO[3];
}

export interface CurrentWeather {
  temp: number;
  feels: number;
  humidity: number;
  precip: number;
  code: number;
  wind: number;
  isDay: boolean;
}

export interface DayWeather {
  date: string;
  code: number;
  tmax: number;
  tmin: number;
  precipProb: number;
  wind: number;
  uv: number;
}

export interface WeatherPayload {
  updated: string;
  lang: "en" | "hi";
  current: CurrentWeather;
  daily: DayWeather[];
}

export function weekday(date: string, lang: "en" | "hi"): string {
  const d = new Date(`${date}T00:00:00`);
  return d.toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
    weekday: "short",
  });
}

/** km/h → Beaufort level (used for wind-based advice). */
export function beaufort(kmh: number): number {
  if (kmh < 1) return 0;
  if (kmh < 6) return 1;
  if (kmh < 12) return 2;
  if (kmh < 20) return 3;
  if (kmh < 29) return 4;
  if (kmh < 39) return 5;
  if (kmh < 50) return 6;
  if (kmh < 62) return 7;
  if (kmh < 75) return 8;
  if (kmh < 89) return 9;
  if (kmh < 103) return 10;
  return 11;
}

export interface Advice {
  outfit: string[];
  activity: string[];
  items: string[];
  risk: string[];
}

/**
 * Turn raw weather into tourist-facing, executable advice.
 * Each list is only shown when its conditions are met (conditional UI).
 * `risk` is derived from genuinely hazardous conditions (no official alert
 * feed for this region) and is surfaced as the top red block only when present.
 */
export function buildAdvice(p: WeatherPayload, lang: "en" | "hi"): Advice {
  const cur = p.current;
  const d0 = p.daily[0];
  const tmax = d0?.tmax ?? cur.temp;
  const tmin = d0?.tmin ?? cur.temp;
  const precipProb = d0?.precipProb ?? 0;
  const windMax = Math.max(cur.wind, d0?.wind ?? 0);
  const uv = d0?.uv ?? 0;
  const code = cur.code;

  const isLightRain = [51, 53, 55, 56, 57, 61, 80, 81].includes(code);
  const isHeavyRain = [65, 66, 67, 82].includes(code);
  const isThunder = code >= 95;
  const isFog = code === 45 || code === 48;
  const isClear = code === 0 || code === 1;
  const isCloudy = code === 3;
  const isRain =
    isLightRain ||
    isHeavyRain ||
    (code >= 61 && code <= 67) ||
    (code >= 80 && code <= 82);

  const T = (en: string, hi: string) => (lang === "en" ? en : hi);
  const outfit: string[] = [];
  const activity: string[] = [];
  const items: string[] = [];
  const risk: string[] = [];

  // --- Rain / precipitation ---
  if (isThunder) {
    risk.push(
      T(
        "Thunderstorm conditions—check official warnings and postpone exposed sightseeing. This forecast is not an official alert.",
        "आँधी-तूफ़ान के हालात—आधिकारिक चेतावनी देखें और खुले स्थान की यात्रा टालें। यह पूर्वानुमान आधिकारिक चेतावनी नहीं है।"
      )
    );
  }
  if (isHeavyRain) {
    risk.push(
      T(
        "Heavy rain expected—avoid low-lying spots; carry a raincoat rather than a long umbrella (wind lifts it).",
        "भारी बारिश—निचले स्थानों से बचें; लंबे छाते के बजाय रेनकोट रखें (हवा उठा देती है)।"
      )
    );
    activity.push(
      T(
        "Heavy rain—prefer covered pavilions; outdoor plans should flex.",
        "भारी बारिश—ढके मंडप चुनें; बाहरी योजना लचीली रखें।"
      )
    );
  } else if (isLightRain) {
    outfit.push(
      T(
        "Light rain—surfaces get slippery; wear shoes with grip.",
        "हल्की बारिश—सतहें फिसलनी हो जाती हैं; पकड़ वाले जूते पहनें।"
      )
    );
    activity.push(
      T(
        "Light rain—outdoor comfort is lower; keep moving between covered spots.",
        "हल्की बारिश—बाहर आराम कम; ढके स्थानों के बीच चलें।"
      )
    );
    items.push(T("compact umbrella", "छोटा छाता"));
  }
  if (precipProb >= 60 && !isRain) {
    outfit.push(
      T(
        "High rain chance—bring rain protection; paths may turn wet.",
        "बारिश की संभावना अधिक—बारिश का बचाव रखें; रास्ते गीले हो सकते हैं।"
      )
    );
    activity.push(
      T(
        "Likely rain—favour covered areas; keep outdoor plans flexible.",
        "बारिश संभावित—ढके स्थान प्राथमिक; बाहरी योजना लचीली रखें।"
      )
    );
    items.push(T("umbrella / raincoat", "छाता / रेनकोट"));
  } else if (precipProb >= 30 && !isRain) {
    items.push(T("umbrella, just in case", "शायद के लिए छाता"));
  }

  // --- Heat ---
  if (tmax >= 42) {
    risk.push(
      T(
        "Extreme heat—avoid midday outdoors; rest in shade and drink water often.",
        "अत्यधिक गर्मी—दोपहर की बाहरी यात्रा टालें; छाया में आराम करें और बार-बार पानी पिएँ।"
      )
    );
    outfit.push(
      T(
        "Very hot—light, loose, breathable clothing.",
        "बहुत गर्मी—हल्के, ढीले, साँस लेने वाले कपड़े।"
      )
    );
    activity.push(
      T(
        "Shorten outdoor time; go at opening or late afternoon.",
        "बाहरी समय घटाएँ; खुलने या देर शाम जाएँ।"
      )
    );
    items.push(T("water, sun hat", "पानी, सूर्य टोपी"));
  } else if (tmax >= 32) {
    outfit.push(
      T("Warm—light, breathable clothing.", "गर्म—हल्के, साँस लेने वाले कपड़े।")
    );
    activity.push(
      T(
        "Hot—avoid midday, shorten outdoor time, rest in shade.",
        "गर्म—दोपहर टालें, बाहरी समय घटाएँ, छाया में आराम करें।"
      )
    );
    items.push(T("water, sun hat", "पानी, सूर्य टोपी"));
  }

  // --- UV ---
  if (uv >= 5) {
    items.push(
      T("sunscreen, sunglasses, hat", "सनस्क्रीन, धूप का चश्मा, टोपी")
    );
    activity.push(
      T(
        "UV is strong—seek shade at midday and reapply sunscreen.",
        "यूवी प्रबल—दोपहर छाया लें और सनस्क्रीन लगाएँ।"
      )
    );
  }

  // --- Wind ---
  const windLevel = beaufort(windMax);
  if (windLevel >= 7) {
    risk.push(
      T(
        "Strong wind—secure hats and scarves; stay clear of high edges and loose structures.",
        "तेज़ हवा—टोपी और दुपट्टा सँभालें; ऊँचे किनारों व ढीली संरचनाओं से दूर रहें।"
      )
    );
  } else if (windLevel >= 5) {
    outfit.push(
      T(
        "Breezy—secure hats/scarves; avoid very loose clothing.",
        "हवा—टोपी/दुपट्टा सँभालें; बहुत ढीले कपड़े न पहनें।"
      )
    );
    items.push(T("a cap that won't blow off", "उड़ने वाली नहीं टोपी"));
  }

  // --- Cold / diurnal swing ---
  if (tmax <= 10) {
    outfit.push(
      T("Cold—warm jacket and scarf.", "ठंड—गर्म जैकेट और स्कार्फ़।")
    );
    items.push(T("warm layers", "गर्म कपड़े"));
  } else if (tmax - tmin > 8) {
    outfit.push(
      T(
        "Big day-night swing—carry a layer you can add or remove.",
        "दिन-रात का अंतर बड़ा—एक अतिरिक्त कपड़ा रखें।"
      )
    );
  }

  // --- Fog ---
  if (isFog) {
    risk.push(
      T(
        "Dense fog—visibility is low; poor for views and photos; mask if dusty.",
        "घना कोहरा—दृश्यता कम; दृश्य व फ़ोटो ख़राब; धूल हो तो मास्क।"
      )
    );
  }

  // --- Clear / cloudy positives ---
  if (!isRain && tmax < 32 && windLevel < 5) {
    if (isClear) {
      activity.push(
        T(
          "Clear skies—great for outdoor exploring and photos.",
          "साफ़ आसमान—बाहर घूमने और फ़ोटो के लिए बढ़िया।"
        )
      );
    } else if (isCloudy) {
      activity.push(
        T(
          "Soft light—comfortable for long outdoor walks and photography.",
          "कोमल रोशनी—लंबी बाहरी सैर और फ़ोटो के लिए आरामदायक।"
        )
      );
    }
  }

  const ded = (a: string[]) => Array.from(new Set(a));
  return {
    outfit: ded(outfit),
    activity: ded(activity),
    items: ded(items),
    risk: ded(risk),
  };
}
