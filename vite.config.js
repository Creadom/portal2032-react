import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/portal2032-react/",
  server: {
    headers: {
      "Content-Security-Policy":
        "default-src 'self'; frame-src 'self' https://wizzardledgent.github.io; frame-ancestors 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' https://fonts.googleapis.com 'unsafe-inline'; font-src https://fonts.gstatic.com; img-src 'self' data: https://dev-portal-2-d.pantheonsite.io; connect-src 'self' https://dev-portal-2-d.pantheonsite.io;",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "X-Frame-Options": "DENY",
      "Permissions-Policy": "geolocation=(self)",
      "Strict-Transport-Security":
        "max-age=31536000; includeSubDomains; preload",
    },
  },
});
