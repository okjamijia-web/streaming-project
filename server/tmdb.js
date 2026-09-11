const fallbackData = {
  trending: [
    {
      id: "mov-1",
      tmdbId: 872585,
      imdbId: "tt15398776",
      title: "Oppenheimer",
      type: "movie",
      match: "99% Match",
      year: "2023",
      rating: "18+",
      duration: "3h 0m",
      quality: "4K Ultra HD",
      genres: ["Biography", "Drama", "History"],
      overview: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
      cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
      backdrop: "https://image.tmdb.org/t/p/original/fm6K9vY92v8EQqPAr291Y9Gmncw.jpg",
      poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
      logo: "OPPENHEIMER",
      top10: 1
    }
  ],
  categories: []
};

class TmdbService {
  constructor() {
    this.fallback = fallbackData;
    this.cinemetaBase = "https://v3-cinemeta.strem.io";
    this.catalogCache = null;
    this.lastCatalogFetch = 0;
  }

  async getCatalog(forceRefresh = false) {
    const now = Date.now();
    // Cache for 3 minutes so it's blazing fast, but always refreshes frequently
    if (!forceRefresh && this.catalogCache && (now - this.lastCatalogFetch < 3 * 60 * 1000)) {
      // Pick random hero from top 5 trending items for dynamic home screen feel
      const heroPool = this.catalogCache.topTrending || [this.catalogCache.hero];
      const randomHero = heroPool[Math.floor(Math.random() * heroPool.length)] || this.catalogCache.hero;
      return {
        ...this.catalogCache,
        hero: randomHero
      };
    }

    try {
      // Fetch live real-time trending feeds from Cinemeta
      const [topMoviesRes, topSeriesRes, actionRes, animationRes, scifiRes, actionSeriesRes, dramaSeriesRes] = await Promise.allSettled([
        fetch(`${this.cinemetaBase}/catalog/movie/top.json`).then(r => r.json()),
        fetch(`${this.cinemetaBase}/catalog/series/top.json`).then(r => r.json()),
        fetch(`${this.cinemetaBase}/catalog/movie/top/genre=Action.json`).then(r => r.json()),
        fetch(`${this.cinemetaBase}/catalog/movie/top/genre=Animation.json`).then(r => r.json()),
        fetch(`${this.cinemetaBase}/catalog/movie/top/genre=Sci-Fi.json`).then(r => r.json()),
        fetch(`${this.cinemetaBase}/catalog/series/top/genre=Action.json`).then(r => r.json()),
        fetch(`${this.cinemetaBase}/catalog/series/top/genre=Drama.json`).then(r => r.json())
      ]);

      const formatMeta = (m, type = "movie") => ({
        id: m.id,
        imdbId: m.id,
        tmdbId: m.moviedb_id || null,
        title: m.name,
        type: m.type || type,
        match: m.imdbRating ? `${Math.round(parseFloat(m.imdbRating) * 10)}% Match` : `${Math.floor(Math.random() * 6) + 94}% Match`,
        year: m.releaseInfo || m.year || "2024",
        rating: type === "series" ? "16+" : "13+",
        duration: type === "series" ? "Series" : "Movie",
        quality: "4K Ultra HD",
        overview: m.description || `Saksikan tayangan ${m.name} secara langsung dalam kualitas Full HD dan 4K.`,
        poster: m.poster || "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        backdrop: m.background || m.poster
      });

      const topMovies = (topMoviesRes.status === "fulfilled" && topMoviesRes.value && topMoviesRes.value.metas)
        ? topMoviesRes.value.metas.map(m => formatMeta(m, "movie"))
        : this.fallback.trending;

      const topSeries = (topSeriesRes.status === "fulfilled" && topSeriesRes.value && topSeriesRes.value.metas)
        ? topSeriesRes.value.metas.map(m => formatMeta(m, "series"))
        : [];

      const actionMovies = (actionRes.status === "fulfilled" && actionRes.value && actionRes.value.metas)
        ? actionRes.value.metas.map(m => formatMeta(m, "movie"))
        : [];

      const animationMovies = (animationRes.status === "fulfilled" && animationRes.value && animationRes.value.metas)
        ? animationRes.value.metas.map(m => formatMeta(m, "movie"))
        : [];

      const scifiMovies = (scifiRes.status === "fulfilled" && scifiRes.value && scifiRes.value.metas)
        ? scifiRes.value.metas.map(m => formatMeta(m, "movie"))
        : [];

      const actionSeries = (actionSeriesRes.status === "fulfilled" && actionSeriesRes.value && actionSeriesRes.value.metas)
        ? actionSeriesRes.value.metas.map(m => formatMeta(m, "series"))
        : [];

      const dramaSeries = (dramaSeriesRes.status === "fulfilled" && dramaSeriesRes.value && dramaSeriesRes.value.metas)
        ? dramaSeriesRes.value.metas.map(m => formatMeta(m, "series"))
        : [];

      // Top 10 lists
      const top10 = topMovies.slice(0, 10).map((item, idx) => ({ ...item, top10: idx + 1 }));
      const seriesTop10 = topSeries.slice(0, 10).map((item, idx) => ({ ...item, top10: idx + 1 }));
      const moviesTop10 = topMovies.slice(0, 10).map((item, idx) => ({ ...item, top10: idx + 1 }));

      // Fetch detail for top 3 items to get high-res backdrops and full overviews
      const heroPool = [];
      for (const item of top10.slice(0, 3)) {
        try {
          const detail = await this.getDetail(item.id, item.type);
          if (detail) heroPool.push(detail);
        } catch (e) {}
      }
      if (heroPool.length === 0) heroPool.push(top10[0]);
      const heroItem = heroPool[Math.floor(Math.random() * heroPool.length)];

      // Series Hero
      let seriesHero = topSeries[0] || heroItem;
      try {
        if (topSeries[0]) {
          const sDetail = await this.getDetail(topSeries[0].id, "series");
          if (sDetail) seriesHero = sDetail;
        }
      } catch (e) {}

      // Movies Hero
      let movieHero = heroItem;

      const rows = [
        { id: "trending-movies", title: "🔥 Trending Movies Hari Ini", items: topMovies.slice(0, 15) },
        { id: "popular-series", title: "📺 Serial TV Terpopuler & Baru", items: topSeries.slice(0, 15) },
        { id: "action-blockbusters", title: "💥 Action & Petualangan Pilihan", items: actionMovies.slice(0, 15) },
        { id: "drama-series", title: "🎭 Drama & Misteri Unggulan", items: dramaSeries.slice(0, 15) },
        { id: "scifi-hits", title: "🚀 Sci-Fi & Fantasi Spektakuler", items: scifiMovies.slice(0, 15) },
        { id: "animation-anime", title: "🍿 Animasi & Anime", items: animationMovies.slice(0, 15) }
      ].filter(r => r.items.length > 0);

      // Pre-packaged category views for instant tab switching
      const categories = {
        home: {
          hero: heroItem,
          heroTypeBadge: heroItem.type === "series" ? "Netflix Series" : "Netflix Film",
          top10: top10,
          top10Title: "Top 10 Tayangan Hari Ini di Indonesia",
          rows: rows
        },
        series: {
          hero: seriesHero,
          heroTypeBadge: "Netflix Series",
          top10: seriesTop10,
          top10Title: "Top 10 Serial TV Hari Ini di Indonesia",
          rows: [
            { id: "trending-series", title: "📺 Serial TV Terpopuler Hari Ini", items: topSeries.slice(0, 15) },
            { id: "action-series", title: "💥 Serial Aksi & Ketegangan Tinggi", items: actionSeries.slice(0, 15) },
            { id: "drama-series", title: "🎭 Serial Drama, Romansa & Misteri", items: dramaSeries.slice(0, 15) },
            { id: "binge-series", title: "🍿 Serial Pilihan Terbaik untuk Binge-Watching", items: topSeries.slice(10, 25) }
          ].filter(r => r.items.length > 0)
        },
        movies: {
          hero: movieHero,
          heroTypeBadge: "Netflix Film",
          top10: moviesTop10,
          top10Title: "Top 10 Film Hari Ini di Indonesia",
          rows: [
            { id: "trending-movies", title: "🔥 Film Box Office Terpopuler", items: topMovies.slice(0, 15) },
            { id: "action-movies", title: "💥 Film Laga & Aksi Spektakuler", items: actionMovies.slice(0, 15) },
            { id: "scifi-movies", title: "🚀 Petualangan Fiksi Ilmiah & Fantasi", items: scifiMovies.slice(0, 15) },
            { id: "animation-movies", title: "🍿 Film Animasi & Cerita Keluarga", items: animationMovies.slice(0, 15) }
          ].filter(r => r.items.length > 0)
        },
        popular: {
          hero: heroItem,
          heroTypeBadge: "Top Trending Global",
          top10: top10,
          top10Title: "Top 10 Paling Banyak Ditonton Minggu Ini",
          rows: [
            { id: "popular-now", title: "🔥 Paling Ramai Dibicarakan Saat Ini", items: [...topMovies.slice(0, 8), ...topSeries.slice(0, 8)] },
            { id: "fresh-movies", title: "✨ Rilis Baru Pilihan di Netflix", items: topMovies.slice(5, 20) },
            { id: "fresh-series", title: "🌟 Serial TV Terbaru yang Wajib Ditonton", items: topSeries.slice(5, 20) }
          ].filter(r => r.items.length > 0)
        }
      };

      this.catalogCache = {
        hero: heroItem,
        top10: top10,
        topTrending: heroPool,
        rows: rows,
        categories: categories,
        lastUpdated: new Date().toISOString()
      };
      this.lastCatalogFetch = now;

      return this.catalogCache;
    } catch (err) {
      console.error("Live catalog fetch failed, fallback:", err.message);
      return this.fallback;
    }
  }

  async getDetail(id, type = "movie") {
    // Check fallback
    const found = this.fallback.trending.find(item => item.id === id || item.imdbId === id);
    if (found) {
      const similar = this.fallback.trending.filter(item => item.id !== found.id).slice(0, 6);
      return { ...found, similar };
    }

    // Auto-detect type from cached catalog if available
    let determinedType = type;
    if (this.catalogCache && this.catalogCache.rows) {
      for (const r of this.catalogCache.rows) {
        const match = r.items.find(it => it.id === id);
        if (match && match.type) {
          determinedType = match.type;
          break;
        }
      }
    }

    // Fetch live metadata from Cinemeta
    try {
      let res = await fetch(`${this.cinemetaBase}/meta/${determinedType}/${id}.json`);
      let data = await res.json();
      
      // If result is empty, or if movie resulted in an old short or mismatch (e.g. Reacher having a 1984 film "1812"), check series
      const altType = determinedType === "movie" ? "series" : "movie";
      if (!data || !data.meta || (determinedType === "movie" && data.meta.name === "1812")) {
        const altRes = await fetch(`${this.cinemetaBase}/meta/${altType}/${id}.json`);
        const altData = await altRes.json();
        if (altData && altData.meta && (altData.meta.videos || !data?.meta)) {
          data = altData;
          determinedType = altType;
        }
      }

      if (data && data.meta) {
        const m = data.meta;
        return {
          id: m.id,
          imdbId: m.id,
          tmdbId: m.moviedb_id || null,
          title: m.name,
          type: m.type || type,
          match: m.imdbRating ? `${Math.round(parseFloat(m.imdbRating) * 10)}% Match` : "95% Match",
          year: m.releaseInfo || m.year || "2024",
          rating: m.certification || (m.type === "series" ? "16+" : "13+"),
          duration: m.runtime || (m.type === "series" ? "TV Series" : "Movie"),
          quality: "4K Ultra HD",
          genres: m.genres || ["Drama", "Action"],
          overview: m.description || "No synopsis available.",
          cast: m.cast || [],
          backdrop: m.background || m.poster,
          poster: m.poster,
          seasons: m.videos ? this.formatCinemetaEpisodes(m.videos) : [],
          similar: (this.catalogCache && this.catalogCache.top10) ? this.catalogCache.top10.slice(0, 6) : this.fallback.trending
        };
      }
    } catch (err) {
      console.error("Cinemeta detail fetch error:", err.message);
    }

    return null;
  }

  formatCinemetaEpisodes(videos) {
    if (!Array.isArray(videos) || videos.length === 0) return [];
    const seasonMap = new Map();
    videos.forEach(v => {
      const s = v.season || 1;
      if (!seasonMap.has(s)) seasonMap.set(s, []);
      seasonMap.get(s).push({
        episodeNumber: v.episode || 1,
        title: v.title || `Episode ${v.episode}`,
        duration: "45m",
        overview: v.overview || `Season ${s} Episode ${v.episode}`,
        thumbnail: v.thumbnail || ""
      });
    });

    const seasons = [];
    seasonMap.forEach((eps, seasonNum) => {
      seasons.push({
        seasonNumber: seasonNum,
        name: `Season ${seasonNum}`,
        episodes: eps.sort((a, b) => a.episodeNumber - b.episodeNumber)
      });
    });
    return seasons.sort((a, b) => a.seasonNumber - b.seasonNumber);
  }

  async search(query) {
    if (!query) return [];
    const q = query.toLowerCase().trim();

    try {
      const [moviesRes, seriesRes] = await Promise.allSettled([
        fetch(`${this.cinemetaBase}/catalog/movie/top/search=${encodeURIComponent(query)}.json`).then(r => r.json()),
        fetch(`${this.cinemetaBase}/catalog/series/top/search=${encodeURIComponent(query)}.json`).then(r => r.json())
      ]);

      const globalItems = [];

      if (moviesRes.status === "fulfilled" && moviesRes.value && moviesRes.value.metas) {
        moviesRes.value.metas.slice(0, 15).forEach(m => {
          globalItems.push({
            id: m.id,
            imdbId: m.id,
            title: m.name,
            type: "movie",
            match: m.imdbRating ? `${Math.round(parseFloat(m.imdbRating) * 10)}% Match` : "95% Match",
            year: m.releaseInfo || m.year || "",
            poster: m.poster
          });
        });
      }

      if (seriesRes.status === "fulfilled" && seriesRes.value && seriesRes.value.metas) {
        seriesRes.value.metas.slice(0, 15).forEach(m => {
          globalItems.push({
            id: m.id,
            imdbId: m.id,
            title: m.name,
            type: "series",
            match: m.imdbRating ? `${Math.round(parseFloat(m.imdbRating) * 10)}% Match` : "95% Match",
            year: m.releaseInfo || m.year || "",
            poster: m.poster
          });
        });
      }

      const seen = new Set();
      const combined = [];

      globalItems.forEach(item => {
        if (!seen.has(item.title.toLowerCase()) && item.poster) {
          seen.add(item.title.toLowerCase());
          combined.push(item);
        }
      });

      return combined;
    } catch (err) {
      console.error("Search error:", err.message);
      return [];
    }
  }
}

module.exports = new TmdbService();


