import { useState, useEffect } from "react";

/**
 * React hook that resolves the user's country using the browser
 * Geolocation API and OpenStreetMap's Nominatim reverse geocoding.
 *
 * The hook requests the user's current position once on mount. It
 * returns a `status` describing the lifecycle and permission result
 * (one of `idle`, `loading`, `granted`, `denied`, `error`). If the
 * browser provides coordinates the hook performs an HTTP request to
 * Nominatim to obtain a country name and ISO country code.
 *
 * Important side effects and constraints:
 * - Calling this hook will trigger the browser's location permission
 *   prompt the first time it runs (unless permission was previously
 *   granted/denied). The caller should expect asynchronous resolution
 *   and not rely on immediate values.
 * - Network or geolocation failures set `status` to `error` or
 *   `denied` respectively.
 * - The hook uses the global `fetch` and `navigator.geolocation` APIs
 *   and will be a no-op in environments where those are not available.
 *
 * @returns {{
 *   country: string|null,      // full country name (English) or null
 *   countryCode: string|null,  // ISO 3166-1 alpha-2 code (upper case) or null
 *   flag: string|null,         // emoji flag computed from `countryCode` or null
 *   status: 'idle'|'loading'|'granted'|'denied'|'error'
 * }} An object describing the resolved country and the request status.
 *
 * @example
 * const { country, countryCode, flag, status } = useGeolocation();
 */
export default function useGeolocation() {
  const [country, setCountry] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | granted | denied | error

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`,
            { headers: { "Accept-Language": "en" } },
          );
          const data = await res.json();
          const code = data.address?.country_code?.toUpperCase();
          const name = data.address?.country;
          setCountryCode(code ?? null);
          setCountry(name ?? null);
          setStatus("granted");
        } catch {
          setStatus("error");
        }
      },
      () => setStatus("denied"),
    );
  }, []);

  const flag = countryCode
    ? String.fromCodePoint(
        ...[...countryCode].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65),
      )
    : null;

  return { country, countryCode, flag, status };
}
