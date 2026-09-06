import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";

/**
 * Vercel serves page routes from their .html files via `cleanUrls` in
 * vercel.json. The dev server does not, so without this those links 404
 * locally and work in production — the worst way round to find a broken link.
 */
const PAGES = ["about", "civilizations", "map", "globe", "explore", "quiz"];

function cleanUrls(): Plugin {
  return {
    name: "clean-urls",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url) {
          const [path, query = ""] = req.url.split("?");
          const page = PAGES.find((p) => path === `/${p}` || path === `/${p}/`);
          if (page) req.url = `/${page}.html` + (query ? `?${query}` : "");
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [cleanUrls()],
  /* Relative base, so the build works from a file:// open or any subdirectory
     as well as from a server root. /about still resolves because vercel.json
     sets trailingSlash:false — "/about" has no directory of its own. */
  base: "./",
  build: {
    target: "es2022",
    /* /map ships ~800 KB of country outlines (146 KB gzipped) in its own
       chunk. That is the page's whole point and it never reaches the other
       two, so the warning is noise here. */
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      input: {
        main: "index.html",
        about: "about.html",
        civilizations: "civilizations.html",
        map: "map.html",
        quiz: "quiz.html",
        globe: "globe.html",
        explore: "explore.html",
      },
    },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
