import { useEffect, useState } from "react";
import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Droplets,
  Wind,
  Thermometer,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";
import {
  wmo,
  weekday,
  buildAdvice,
  type IconKey,
  type WeatherPayload,
} from "@/lib/weather";

const ICONS: Record<IconKey, LucideIcon> = {
  sunny: Sun,
  partly: CloudSun,
  cloudy: Cloud,
  fog: CloudFog,
  drizzle: CloudDrizzle,
  rain: CloudRain,
  snow: CloudSnow,
  thunder: CloudLightning,
};

export interface WeatherLabels {
  now: string;
  forecast: string;
  feels: string;
  humidity: string;
  wind: string;
  rain: string;
  uv: string;
  updated: string;
  loading: string;
  error: string;
  umbrella: string;
  heat: string;
  uvWarn: string;
  advTitle: string;
  advOutfit: string;
  advActivity: string;
  advItems: string;
  advRisk: string;
}

export function WeatherPanel({
  lang,
  labels,
}: {
  lang: "hi" | "en";
  labels: WeatherLabels;
}) {
  const [data, setData] = useState<WeatherPayload | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setData(null);
    setError(false);
    fetch(`/weather?lang=${lang}`)
      .then(r => {
        if (!r.ok) throw new Error("weather");
        return r.json();
      })
      .then(d => {
        if (!active) return;
        if (
          !d ||
          d.error ||
          !d.current ||
          !Number.isFinite(d.current.temp) ||
          !Array.isArray(d.daily) ||
          !d.daily.length
        )
          setError(true);
        else setData(d as WeatherPayload);
      })
      .catch(() => {
        if (active) setError(true);
      });
    return () => {
      active = false;
    };
  }, [lang]);

  if (error) {
    return <p className="weather-error">{labels.error}</p>;
  }

  if (!data) {
    return <p className="weather-loading">{labels.loading}</p>;
  }

  const cur = data.current;
  const curInfo = wmo(cur.code);
  const CurIcon = ICONS[curInfo.icon];
  const updated = new Date(data.updated).toLocaleTimeString(
    lang === "hi" ? "hi-IN" : "en-IN",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
  const advice = buildAdvice(data, lang);

  return (
    <div className="weather-panel">
      <div className="weather-current">
        <CurIcon
          size={56}
          className="weather-current-icon"
          aria-hidden="true"
        />
        <div className="weather-current-main">
          <p className="weather-temp">{Math.round(cur.temp)}°C</p>
          <p className="weather-current-label">
            {cur.isDay ? curInfo[lang] : lang === "hi" ? "रात" : "Night"} ·{" "}
            {curInfo[lang]}
          </p>
        </div>
        <dl className="weather-meta">
          <div>
            <Dt
              icon={Thermometer}
              label={labels.feels}
              value={`${Math.round(cur.feels)}°C`}
            />
          </div>
          <div>
            <Dt
              icon={Droplets}
              label={labels.humidity}
              value={`${Math.round(cur.humidity)}%`}
            />
          </div>
          <div>
            <Dt
              icon={Wind}
              label={labels.wind}
              value={`${Math.round(cur.wind)} km/h`}
            />
          </div>
        </dl>
      </div>

      {advice.risk.length > 0 && (
        <div className="weather-risk" role="alert">
          <p className="weather-risk-title">
            <AlertTriangle size={16} aria-hidden="true" />
            {labels.advRisk}
          </p>
          <ul>
            {advice.risk.map(r => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      )}

      {(advice.outfit.length > 0 ||
        advice.activity.length > 0 ||
        advice.items.length > 0) && (
        <div className="weather-advice">
          <p className="weather-advice-title">{labels.advTitle}</p>
          <div className="advice-cols">
            {advice.outfit.length > 0 && (
              <div className="advice-col">
                <h4>{labels.advOutfit}</h4>
                <ul>
                  {advice.outfit.map(s => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {advice.activity.length > 0 && (
              <div className="advice-col">
                <h4>{labels.advActivity}</h4>
                <ul>
                  {advice.activity.map(s => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {advice.items.length > 0 && (
              <div className="advice-col">
                <h4>{labels.advItems}</h4>
                <div className="advice-chips">
                  {advice.items.map(s => (
                    <span key={s} className="advice-chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <h3 className="weather-forecast-title">{labels.forecast}</h3>
      <div className="weather-days">
        {data.daily.map(day => {
          const info = wmo(day.code);
          const DayIcon = ICONS[info.icon];
          return (
            <div className="weather-day" key={day.date}>
              <p className="weather-day-name">{weekday(day.date, lang)}</p>
              <DayIcon size={26} aria-hidden="true" />
              <p className="weather-day-cond">{info[lang]}</p>
              <p className="weather-day-temp">
                <span className="tmax">{Math.round(day.tmax)}°</span>
                <span className="tmin">{Math.round(day.tmin)}°</span>
              </p>
              <p className="weather-day-rain">
                {day.precipProb}%{" "}
                <span className="rain-unit">{labels.rain}</span>
              </p>
            </div>
          );
        })}
      </div>

      <p className="weather-updated">
        {labels.updated} {updated} ·{" "}
        <a href="https://open-meteo.com/">Open-Meteo</a> ·{" "}
        <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
      </p>
    </div>
  );
}

function Dt({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="weather-meta-row">
      <Icon size={15} aria-hidden="true" />
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
