const tmdb = require("./tmdb");

class StremioService {
  constructor() {
    this.demoStream = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
  }

  async resolveStreams(type, id, season = 1, episode = 1) {
    const item = await tmdb.getDetail(id, type);
    const imdbId = (item && item.imdbId) || (id.startsWith("tt") ? id : "tt15398776");
    const tmdbId = item ? item.tmdbId : (!isNaN(id) ? id : null);
    const title = item ? item.title : "Title";

    // Identifier priority for providers (TMDB numeric ID is best for modern ad-free hosts)
    const targetId = tmdbId || imdbId;

    // 1. Server HD 1: EmbedWave (Zero-Ads / No Popunders by Design)
    // Supports clean sandbox and direct adaptive streaming
    let embedwaveUrl;
    if (type === "series") {
      embedwaveUrl = tmdbId 
        ? `https://embedwave.cc/embed/tv/${tmdbId}/${season}/${episode}`
        : `https://embedwave.cc/embed/tv/${imdbId}/${season}/${episode}`;
    } else {
      embedwaveUrl = tmdbId 
        ? `https://embedwave.cc/embed/movie/${tmdbId}`
        : `https://embedwave.cc/embed/movie/${imdbId}`;
    }

    // 2. Server HD 2: Videasy Player (Modern clean multi-source player with subs)
    let videasyUrl;
    if (type === "series") {
      videasyUrl = `https://player.videasy.net/tv/${targetId}/${season}/${episode}`;
    } else {
      videasyUrl = `https://player.videasy.net/movie/${targetId}`;
    }

    // 3. Server HD 3: VidLink Full HD (Ad-free customized interface flags)
    let vidlinkUrl;
    if (type === "series") {
      if (tmdbId && !isNaN(tmdbId)) {
        vidlinkUrl = `https://vidlink.pro/tv/${tmdbId}/${season}/${episode}?primaryColor=E50914&secondaryColor=141414&iconColor=ffffff&title=false&poster=true`;
      } else {
        vidlinkUrl = `https://player.videasy.net/tv/${imdbId}/${season}/${episode}`;
      }
    } else {
      vidlinkUrl = `https://vidlink.pro/movie/${targetId}?primaryColor=E50914&secondaryColor=141414&iconColor=ffffff&title=false&poster=true`;
    }

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
          id: "embedwave",
          name: "Server HD 1 (Ultra HD Bebas Iklan)",
          type: "embed",
          url: embedwaveUrl,
          description: "Server Cepat Tanpa Pop-up & Subtitle Lengkap"
        },
        {
          id: "videasy",
          name: "Server HD 2 (Videasy Multi-Server)",
          type: "embed",
          url: videasyUrl,
          description: "Server Cadangan Kualitas Jernih 1080p/4K"
        },
        {
          id: "vidlink",
          name: "Server HD 3 (VidLink Full HD)",
          type: "embed",
          url: vidlinkUrl,
          description: "Server Alternatif Full HD"
        },
        {
          id: "stremio",
          name: "Buka di Aplikasi Stremio (Torrentio Stream)",
          type: "app",
          url: stremioDeepLink,
          description: "Nonton langsung via Stremio Desktop / Smart TV"
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
Halo! Selamat datang di Website Streaming YukNonton.
`;
    }

    return `WEBVTT

1
00:00:02.000 --> 00:00:06.000
Hello! Welcome to the YukNonton Streaming Platform.
`;
  }
}

module.exports = new StremioService();
