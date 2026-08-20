// Runtime Google Analytics 4 loader.
//
// Reads VITE_GA4_ID at build time (Vite auto-exposes VITE_* env vars). If the
// value is missing or still the placeholder we no-op, so local dev without a
// real ID stays silent instead of pinging a bogus property.

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __ga4Loaded?: boolean;
  }
}

const PLACEHOLDER = "G-XXXXXXXXXX";

export function installGa4(): void {
  const id = (import.meta.env.VITE_GA4_ID as string | undefined) ?? PLACEHOLDER;
  if (!id || id === PLACEHOLDER || window.__ga4Loaded) return;
  window.__ga4Loaded = true;

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  const gtag: (...args: unknown[]) => void = (...args) => {
    window.dataLayer!.push(args);
  };
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", id, { send_page_view: true });
}

export function trackStoryView(storyId: string): void {
  if (!window.gtag) return;
  window.gtag("event", "story_view", { story_id: storyId });
}
