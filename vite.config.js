import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "pwa/woofy-apple-touch-icon-v2.png",
        "apple-touch-icon.png",
        "apple-touch-icon-precomposed.png",
      ],

      // Precache images too, so Buddy, the logo and paws load offline
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,webmanifest}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      },

      manifest: {
        name: "WOOFY",
        short_name: "WOOFY",

        description: "A cute pet-care companion.",

        theme_color: "#FBF7F2",
        background_color: "#FBF7F2",

        display: "standalone",

        start_url: "/",
        scope: "/",

        orientation: "portrait",

        icons: [
          {
            src: "/pwa/woofy-icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa/woofy-icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/pwa/woofy-icon-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
