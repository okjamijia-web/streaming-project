const tmdb = require("./tmdb");

class StremioService {
  constructor() {
    this.demoStream = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
  }

  async resolveStreams(type, id, season = 1, episode = 1) {
    const item = await tmdb.getDetail(id, type);
    const imdbId = (item && item.imdbId) || (id.startsWith("tt") ? id : "tt15398776");
    const tmdbId = item ? item.tmdbId : null;
    const title = item ? item.title : "Title";

    // 1. VidLink Provider
    // Note: For TV series, VidLink requires numeric tmdbId. If not numeric, fallback cleanly to MultiEmbed.
    let vidlinkUrl;
    if (type === "series") {
      if (tmdbId && !isNaN(tmdbId)) {
        vidlinkUrl = `https://vidlink.pro/tv/${tmdbId}/${season}/${episode}`;
      } else {
        vidlinkUrl = `https://multiembed.mov/?video_id=${imdbId}&s=${season}&e=${episode}`;
      }
    } else {
      const targetMovieId = tmdbId || imdbId;
      vidlinkUrl = `https://vidlink.pro/movie/${targetMovieId}`;
    }

    // 2. MultiEmbed Provider (VIP Fast Mirror)
    const multiembedUrl = type === "series"
      ? `https://multiembed.mov/?video_id=${imdbId}&s=${season}&e=${episode}`
      : `https://multiembed.mov/?video_id=${imdbId}`;

    // 3. AutoEmbed Provider (High Quality Mirror)
    const autoembedUrl = type === "series"
      ? `https://autoembed.co/tv/imdb/${imdbId}-${season}-${episode}`
      : `https://autoembed.co/movie/imdb/${imdbId}`;

    // 4. Stremio App Deep Link
    const stremioDeepLink = `stremio:///detail/${type}/${imdbId}`;

    return {
      id: id,
      type: type,
      title: title,
      tmdbId: tmdbId,
      imdbId: imdbId,
      season: season,
      episode: episode,
      streams: [
        {
          id: "vidlink",
          name: "Server HD 1 (VidLink Full HD)",
          type: "embed",
          url: vidlinkUrl,
          description: "Film & Series Asli 1080p/4K dengan Subtitle"
        },
        {
          id: "multiembed",
          name: "Server HD 2 (MultiEmbed VIP)",
          type: "embed",
          url: multiembedUrl,
          description: "Server Cadangan Cepat Bebas Buffering"
        },
        {
          id: "autoembed",
          name: "Server HD 3 (AutoEmbed Ultra)",
          type: "embed",
          url: autoembedUrl,
          description: "Server Tambahan Kualitas Tinggi"
        },
        {
          id: "stremio",
          name: "Buka di Aplikasi Stremio (Torrentio Stream)",
          type: "app",
          url: stremioDeepLink,
          description: "Nonton langsung via Stremio Desktop"
        },
        {
          id: "hls",
          name: "Demo HLS Player (Uji Coba Kontrol)",
          type: "hls",
          url: this.demoStream,
          description: "Player Uji Coba Internal",
          subtitles: [
            { lang: "id", label: "Bahasa Indonesia", url: "/api/subtitles/id" },
            { lang: "en", label: "English [CC]", url: "/api/subtitles/en" }
          ]
        }
      ]
    };
  }

  getVttSubtitle(lang) {
    if (lang === "id") {
      return `WEBVTT

1
00:00:02.000 --> 00:00:06.000
Halo! Selamat datang di Website Streaming Netflix + Stremio.
`;
    }

    return `WEBVTT

1
00:00:02.000 --> 00:00:06.000
Hello! Welcome to the Netflix + Stremio Streaming Platform.
`;
  }
}

module.exports = new StremioService();
