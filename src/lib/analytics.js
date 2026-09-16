import site from "../../config";
export const measurementId =
  process.env.GATSBY_GA_MEASUREMENT_ID ?? site.gaMeasurementId ?? "";
export const analyticsConfigured = /^G-[A-Z0-9]+$/.test(measurementId);
let loaded = false;
let lastPath = null;
let memoryConsent = null;
export function consent() {
  if (typeof window === "undefined") return null;
  try {
    return memoryConsent ?? localStorage.getItem("bb-analytics");
  } catch {
    return memoryConsent;
  }
}
export function track(name, properties = {}) {
  if (!loaded || consent() !== "accepted" || typeof window.gtag !== "function")
    return;
  window.gtag("event", name, { ...properties, send_to: measurementId });
  return true;
}
export function trackPage(path = window.location.pathname) {
  if (!loaded || consent() !== "accepted" || path === lastPath) return;
  const previous = lastPath;
  lastPath = path;
  window.gtag("set", {
    page_location: window.location.origin + path,
    page_title: document.title,
    page_referrer: previous
      ? window.location.origin + previous
      : document.referrer
        ? new URL(document.referrer).origin
        : "",
  });
  track("page_view", {
    page_location: window.location.origin + path,
    page_title: document.title,
  });
}
export function startAnalytics() {
  if (
    typeof window === "undefined" ||
    !analyticsConfigured ||
    consent() !== "accepted" ||
    process.env.NODE_ENV !== "production" ||
    window.location.hostname !== new URL(site.siteUrl).hostname
  )
    return;
  window[`ga-disable-${measurementId}`] = false;
  if (loaded) return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: window.location.origin + window.location.pathname,
    page_referrer: document.referrer ? new URL(document.referrer).origin : "",
  });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}
export function setConsent(value) {
  memoryConsent = value;
  try {
    localStorage.setItem("bb-analytics", value);
  } catch {
    /* Storage can be disabled. */
  }
  lastPath = null;
  if (value === "accepted") {
    startAnalytics();
    trackPage();
  } else {
    window[`ga-disable-${measurementId}`] = true;
    // Expire Analytics cookies at host and parent-domain scope.
    const hostParts = window.location.hostname.split(".");
    document.cookie.split(";").forEach((entry) => {
      const name = entry.trim().split("=")[0];
      if (!/^_ga(?:_|$)|^_gid$/.test(name)) return;
      document.cookie = `${name}=; Max-Age=0; path=/`;
      for (let i = 0; i < hostParts.length - 1; i++)
        document.cookie = `${name}=; Max-Age=0; path=/; domain=.${hostParts.slice(i).join(".")}`;
    });
  }
  window.dispatchEvent(new Event("bb-consent-change"));
}
