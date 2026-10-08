# AnimeVerse

Production-oriented mobile-first PWA shell for a legal anime streaming companion.

## Run
Serve this directory over HTTPS (or localhost) with any static server. Example:

`python3 -m http.server 8080`

Open `http://localhost:8080`.

## Legal source architecture
The shipped data is fictional demo content. The video player uses a CC0/public sample video only to make the player interaction testable. Add authorized provider adapters behind a server-side API boundary. Do not place provider secrets in the client.

Adapter contract:
- `searchAnime(query)`
- `getAnimeDetails(id)`
- `getEpisodes(id)`
- `getStreamingSources(episodeId)`
- `getSubtitles(episodeId)`

Validate/sanitize all provider responses. Never execute arbitrary extension code in the browser.

## PWA / Android
Includes manifest, service worker, install prompt, standalone display mode, responsive mobile UI, landscape-capable video player, and local preferences. It can be wrapped later with Trusted Web Activity or Capacitor without changing the UI layer.

## Subtitle support
The player UI supports Myanmar / English / Original selection and stores the preference. A production adapter can expose authorized UTF-8 SRT/VTT tracks. User-provided legal subtitle files should be parsed client-side with strict text sanitization.
