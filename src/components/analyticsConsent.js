import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { analyticsConfigured, consent, setConsent } from "../lib/analytics";
export function AnalyticsPreferences() {
  return analyticsConfigured ? (
    <button
      className="text-button"
      onClick={() => window.dispatchEvent(new Event("bb-open-consent"))}
    >
      Analytics preferences
    </button>
  ) : null;
}
export default function AnalyticsConsent() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!analyticsConfigured) return;
    setOpen(!consent());
    const show = () => setOpen(true);
    window.addEventListener("bb-open-consent", show);
    return () => window.removeEventListener("bb-open-consent", show);
  }, []);
  if (!open) return null;
  return (
    <section className="consent-panel" aria-label="Analytics preferences">
      <strong>Help make these notes better</strong>
      <p>
        Optional analytics measure visits and article engagement. They load only
        if you allow them. <Link to="/privacy/">Privacy details</Link>
      </p>
      <div className="button-row">
        <button
          className="button secondary"
          onClick={() => {
            setConsent("declined");
            setOpen(false);
          }}
        >
          No thanks
        </button>
        <button
          className="button"
          onClick={() => {
            setConsent("accepted");
            setOpen(false);
          }}
        >
          Allow analytics
        </button>
      </div>
    </section>
  );
}
