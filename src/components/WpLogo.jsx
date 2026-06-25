import { useState, useEffect } from "react";
import { getMediaBySlug } from "../api/wordpress";

/**
 * Component that loads and displays the site's logo from WordPress
 * media (slug="logo").
 *
 * On mount it requests the media item with slug `logo` via
 * `getMediaBySlug`. If the media is found, the component renders an
 * `img` with the returned `source_url`. Any network or lookup errors
 * are silently ignored and the component renders nothing.
 *
 * @returns {JSX.Element|null} An `img` element with the logo or `null`
 *   when the logo is not available.
 */
export default function WpLogo() {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    getMediaBySlug("logo")
      .then((media) => media && setSrc(media.source_url))
      .catch(() => {});
  }, []);

  if (!src) return null;
  return <img src={src} alt="Portal 2032 Logo" className="wp-logo" />;
}
