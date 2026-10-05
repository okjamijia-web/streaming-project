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


const platformSeeds = {
  netflix: [
    { id: "tt4574334", type: "series", title: "Stranger Things", platform: "Netflix", poster: "https://images.metahub.space/poster/medium/tt4574334/img.jpg" },
    { id: "tt13443472", type: "series", title: "Wednesday", platform: "Netflix", poster: "https://images.metahub.space/poster/medium/tt13443472/img.jpg" },
    { id: "tt10919420", type: "series", title: "Squid Game", platform: "Netflix", poster: "https://images.metahub.space/poster/medium/tt10919420/img.jpg" },
    { id: "tt11737520", type: "series", title: "One Piece", platform: "Netflix", poster: "https://images.metahub.space/poster/medium/tt11737520/img.jpg" },
    { id: "tt8740790", type: "series", title: "Bridgerton", platform: "Netflix", poster: "https://images.metahub.space/poster/medium/tt8740790/img.jpg" },
    { id: "tt13016388", type: "series", title: "3 Body Problem", platform: "Netflix", poster: "https://images.metahub.space/poster/medium/tt13016388/img.jpg" },
    { id: "tt9018736", type: "series", title: "Avatar: The Last Airbender", platform: "Netflix", poster: "https://images.metahub.space/poster/medium/tt9018736/img.jpg" },
    { id: "tt11301886", type: "movie", title: "Rebel Ridge", platform: "Netflix", poster: "https://images.metahub.space/poster/medium/tt11301886/img.jpg" },
    { id: "tt12263384", type: "movie", title: "Extraction II", platform: "Netflix", poster: "https://images.metahub.space/poster/medium/tt12263384/img.jpg" },
    { id: "tt11564570", type: "movie", title: "Glass Onion: A Knives Out Mystery", platform: "Netflix", poster: "https://images.metahub.space/poster/medium/tt11564570/img.jpg" },
    { id: "tt7991608", type: "movie", title: "Red Notice", platform: "Netflix", poster: "https://images.metahub.space/poster/medium/tt7991608/img.jpg" },
    { id: "tt12747748", type: "movie", title: "Leave the World Behind", platform: "Netflix", poster: "https://images.metahub.space/poster/medium/tt12747748/img.jpg" }
  ],
  disney: [
    { id: "tt8111088", type: "series", title: "The Mandalorian", platform: "Disney+", poster: "https://images.metahub.space/poster/medium/tt8111088/img.jpg" },
    { id: "tt9140554", type: "series", title: "Loki", platform: "Disney+", poster: "https://images.metahub.space/poster/medium/tt9140554/img.jpg" },
    { id: "tt2788310", type: "series", title: "Shōgun", platform: "Disney+", poster: "https://images.metahub.space/poster/medium/tt2788310/img.jpg" },
    { id: "tt14452776", type: "series", title: "The Bear", platform: "Disney+", poster: "https://images.metahub.space/poster/medium/tt14452776/img.jpg" },
    { id: "tt6263850", type: "movie", title: "Deadpool & Wolverine", platform: "Disney+", poster: "https://images.metahub.space/poster/medium/tt6263850/img.jpg" },
    { id: "tt22022452", type: "movie", title: "Inside Out 2", platform: "Disney+", poster: "https://images.metahub.space/poster/medium/tt22022452/img.jpg" },
    { id: "tt3521164", type: "movie", title: "Moana", platform: "Disney+", poster: "https://images.metahub.space/poster/medium/tt3521164/img.jpg" },
    { id: "tt4154796", type: "movie", title: "Avengers: Endgame", platform: "Disney+", poster: "https://images.metahub.space/poster/medium/tt4154796/img.jpg" },
    { id: "tt6791350", type: "movie", title: "Guardians of the Galaxy Vol. 3", platform: "Disney+", poster: "https://images.metahub.space/poster/medium/tt6791350/img.jpg" },
    { id: "tt1630029", type: "movie", title: "Avatar: The Way of Water", platform: "Disney+", poster: "https://images.metahub.space/poster/medium/tt1630029/img.jpg" },
    { id: "tt12324366", type: "series", title: "Percy Jackson and the Olympians", platform: "Disney+", poster: "https://images.metahub.space/poster/medium/tt12324366/img.jpg" },
    { id: "tt9253284", type: "series", title: "Andor", platform: "Disney+", poster: "https://images.metahub.space/poster/medium/tt9253284/img.jpg" }
  ],
  prime: [
    { id: "tt1190634", type: "series", title: "The Boys", platform: "Prime Video", poster: "https://images.metahub.space/poster/medium/tt1190634/img.jpg" },
    { id: "tt12637874", type: "series", title: "Fallout", platform: "Prime Video", poster: "https://images.metahub.space/poster/medium/tt12637874/img.jpg" },
    { id: "tt7631058", type: "series", title: "The Lord of the Rings: The Rings of Power", platform: "Prime Video", poster: "https://images.metahub.space/poster/medium/tt7631058/img.jpg" },
    { id: "tt9288030", type: "series", title: "Reacher", platform: "Prime Video", poster: "https://images.metahub.space/poster/medium/tt9288030/img.jpg" },
    { id: "tt6741278", type: "series", title: "Invincible", platform: "Prime Video", poster: "https://images.metahub.space/poster/medium/tt6741278/img.jpg" },
    { id: "tt13110632", type: "series", title: "Gen V", platform: "Prime Video", poster: "https://images.metahub.space/poster/medium/tt13110632/img.jpg" },
    { id: "tt3359350", type: "movie", title: "Road House", platform: "Prime Video", poster: "https://images.metahub.space/poster/medium/tt3359350/img.jpg" },
    { id: "tt9466144", type: "movie", title: "The Idea of You", platform: "Prime Video", poster: "https://images.metahub.space/poster/medium/tt9466144/img.jpg" },
    { id: "tt15314262", type: "movie", title: "The Beekeeper", platform: "Prime Video", poster: "https://images.metahub.space/poster/medium/tt15314262/img.jpg" },
    { id: "tt17351924", type: "movie", title: "Saltburn", platform: "Prime Video", poster: "https://images.metahub.space/poster/medium/tt17351924/img.jpg" },
    { id: "tt16419074", type: "movie", title: "AIR", platform: "Prime Video", poster: "https://images.metahub.space/poster/medium/tt16419074/img.jpg" },
    { id: "tt10230602", type: "series", title: "Citadel", platform: "Prime Video", poster: "https://images.metahub.space/poster/medium/tt10230602/img.jpg" }
  ],
  apple_hbo: [
    { id: "tt11198330", type: "series", title: "House of the Dragon", platform: "HBO Max", poster: "https://images.metahub.space/poster/medium/tt11198330/img.jpg" },
    { id: "tt3581920", type: "series", title: "The Last of Us", platform: "HBO Max", poster: "https://images.metahub.space/poster/medium/tt3581920/img.jpg" },
    { id: "tt15474916", type: "series", title: "The Penguin", platform: "HBO Max", poster: "https://images.metahub.space/poster/medium/tt15474916/img.jpg" },
    { id: "tt11280740", type: "series", title: "Severance", platform: "Apple TV+", poster: "https://images.metahub.space/poster/medium/tt11280740/img.jpg" },
    { id: "tt10986410", type: "series", title: "Ted Lasso", platform: "Apple TV+", poster: "https://images.metahub.space/poster/medium/tt10986410/img.jpg" },
    { id: "tt14688458", type: "series", title: "Silo", platform: "Apple TV+", poster: "https://images.metahub.space/poster/medium/tt14688458/img.jpg" },
    { id: "tt15239678", type: "movie", title: "Dune: Part Two", platform: "HBO Max", poster: "https://images.metahub.space/poster/medium/tt15239678/img.jpg" },
    { id: "tt1877830", type: "movie", title: "The Batman", platform: "HBO Max", poster: "https://images.metahub.space/poster/medium/tt1877830/img.jpg" },
    { id: "tt1517268", type: "movie", title: "Barbie", platform: "HBO Max", poster: "https://images.metahub.space/poster/medium/tt1517268/img.jpg" },
    { id: "tt5537002", type: "movie", title: "Killers of the Flower Moon", platform: "Apple TV+", poster: "https://images.metahub.space/poster/medium/tt5537002/img.jpg" },
    { id: "tt13287846", type: "movie", title: "Napoleon", platform: "Apple TV+", poster: "https://images.metahub.space/poster/medium/tt13287846/img.jpg" },
    { id: "tt10751238", type: "series", title: "Slow Horses", platform: "Apple TV+", poster: "https://images.metahub.space/poster/medium/tt10751238/img.jpg" }
  ]
};

const platformSeedMap = {};
Object.values(platformSeeds).flat().forEach(item => {
  platformSeedMap[item.id] = item;
});

class TmdbService {
  constructor() {
    this.fallback = fallbackData;
    this.cinemetaBase = "https://v3-cinemeta.strem.io";
    this.catalogCache = null;
    this.lastCatalogFetch = 0;
    this.platformCache = null;
    this.lastPlatformFetch = 0;
  }

  
  async getPlatformCatalogs() {
    if (this.platformCache && (Date.now() - this.lastPlatformFetch < 6 * 3600 * 1000)) {
      return this.platformCache;
    }

    const fetchList = async (seedList) => {
      const promises = seedList.map(async (seed) => {
        try {
          const res = await fetch(`${this.cinemetaBase}/meta/${seed.type}/${seed.id}.json`).then(r => r.json());
          if (res && res.meta) {
            const m = res.meta;
            return {
              id: m.id || seed.id,
              imdbId: m.id || seed.id,
              tmdbId: m.moviedb_id || null,
              title: m.name || seed.title,
              type: m.type || seed.type,
              platform: seed.platform,
              match: m.imdbRating ? `${Math.round(parseFloat(m.imdbRating) * 10)}% Match` : "98% Match",
              year: m.releaseInfo || m.year || "2024",
              rating: seed.type === "series" ? "16+" : "13+",
              duration: seed.type === "series" ? "Series" : "Movie",
              quality: "4K Ultra HD",
              overview: m.description || `Saksikan tayangan ${seed.title} eksklusif di ${seed.platform}.`,
              poster: m.poster || seed.poster,
              backdrop: m.background || m.poster || seed.poster
            };
          }
        } catch (e) {}
        return {
          id: seed.id,
          imdbId: seed.id,
          tmdbId: null,
          title: seed.title,
          type: seed.type,
          platform: seed.platform,
          match: "98% Match",
          year: "2024",
          rating: seed.type === "series" ? "16+" : "13+",
          duration: seed.type === "series" ? "Series" : "Movie",
          quality: "4K Ultra HD",
          overview: `Saksikan tayangan ${seed.title} eksklusif di ${seed.platform}.`,
          poster: seed.poster,
          backdrop: seed.poster
        };
      });
      return Promise.all(promises);
    };

    try {
      const [netflix, disney, prime, apple_hbo] = await Promise.all([
        fetchList(platformSeeds.netflix),
        fetchList(platformSeeds.disney),
        fetchList(platformSeeds.prime),
        fetchList(platformSeeds.apple_hbo)
      ]);

      this.platformCache = { netflix, disney, prime, apple_hbo };
      this.lastPlatformFetch = Date.now();
      return this.platformCache;
    } catch (e) {
      return {
        netflix: platformSeeds.netflix,
        disney: platformSeeds.disney,
        prime: platformSeeds.prime,
        apple_hbo: platformSeeds.apple_hbo
      };
    }
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

      // Fetch platform-specific catalogs
      const platformData = await this.getPlatformCatalogs();

      const rows = [
        { id: "trending-movies", title: "🔥 Trending Movies Hari Ini", items: topMovies.slice(0, 15) },
        { id: "popular-series", title: "📺 Serial TV Terpopuler & Baru", items: topSeries.slice(0, 15) },
        { id: "netflix-row", title: "🔴 Populer di Netflix", items: platformData.netflix },
        { id: "disney-row", title: "🔵 Koleksi Terbaik Disney+", items: platformData.disney },
        { id: "prime-row", title: "🟡 Pilihan Unggulan Prime Video", items: platformData.prime },
        { id: "apple-hbo-row", title: "⚫ Hits di Apple TV+ & HBO Max", items: platformData.apple_hbo },
        { id: "action-blockbusters", title: "💥 Action & Petualangan Pilihan", items: actionMovies.slice(0, 15) },
        { id: "drama-series", title: "🎭 Drama & Misteri Unggulan", items: dramaSeries.slice(0, 15) },
        { id: "scifi-hits", title: "🚀 Sci-Fi & Fantasi Spektakuler", items: scifiMovies.slice(0, 15) },
        { id: "animation-anime", title: "🍿 Animasi & Anime", items: animationMovies.slice(0, 15) }
      ].filter(r => r.items && r.items.length > 0);

      // Pre-packaged category views for instant tab switching
      const categories = {
        home: {
          hero: heroItem,
          heroTypeBadge: heroItem.type === "series" ? "YukNonton Series" : "YukNonton Film",
          top10: top10,
          top10Title: "Top 10 Tayangan Hari Ini di Indonesia",
          rows: rows
        },
        series: {
          hero: seriesHero,
          heroTypeBadge: "YukNonton Series",
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
          heroTypeBadge: "YukNonton Film",
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
            { id: "fresh-movies", title: "✨ Rilis Baru Pilihan di YukNonton", items: topMovies.slice(5, 20) },
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

  async getGenreCatalog(genreName) {
    if (!this.genreCache) this.genreCache = {};
    const now = Date.now();
    const cacheKey = (genreName || "Action").toLowerCase();
    if (this.genreCache[cacheKey] && (now - this.genreCache[cacheKey].timestamp < 3600000)) {
      return this.genreCache[cacheKey].data;
    }

    const cinemetaGenre = genreName === "Science Fiction" ? "Sci-Fi" : genreName;

    try {
      const [moviesRes, seriesRes] = await Promise.allSettled([
        fetch(`${this.cinemetaBase}/catalog/movie/top/genre=${encodeURIComponent(cinemetaGenre)}.json`).then(r => r.json()),
        fetch(`${this.cinemetaBase}/catalog/series/top/genre=${encodeURIComponent(cinemetaGenre)}.json`).then(r => r.json())
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
        overview: m.description || `Saksikan tayangan ${m.name} kategori ${genreName} dalam kualitas Full HD dan 4K.`,
        poster: m.poster || "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        backdrop: m.background || m.poster
      });

      const movies = (moviesRes.status === "fulfilled" && moviesRes.value && moviesRes.value.metas)
        ? moviesRes.value.metas.map(m => formatMeta(m, "movie"))
        : [];

      const series = (seriesRes.status === "fulfilled" && seriesRes.value && seriesRes.value.metas)
        ? seriesRes.value.metas.map(m => formatMeta(m, "series"))
        : [];

      const combined = [...movies, ...series].sort(() => 0.5 - Math.random());
      const top10 = (movies.length > 0 ? movies : series).slice(0, 10).map((item, idx) => ({ ...item, top10: idx + 1 }));

      let heroItem = movies[0] || series[0] || this.fallback.trending[0];
      try {
        if (heroItem) {
          const detail = await this.getDetail(heroItem.id, heroItem.type);
          if (detail) heroItem = detail;
        }
      } catch (e) {}

      const rows = [
        { id: `${cacheKey}-trending`, title: `🔥 Populer & Sedang Tren di ${genreName}`, items: combined.slice(0, 15) },
        { id: `${cacheKey}-movies`, title: `🎬 Film ${genreName} Pilihan Terbaik`, items: movies.slice(0, 15) },
        { id: `${cacheKey}-series`, title: `📺 Serial TV ${genreName} Penuh Ketegangan`, items: series.slice(0, 15) },
        { id: `${cacheKey}-more`, title: `🍿 Rekomendasi ${genreName} Lainnya`, items: combined.slice(15, 30) }
      ].filter(r => r.items.length > 0);

      const result = {
        genre: genreName,
        hero: heroItem,
        heroTypeBadge: `Kategori: ${genreName}`,
        top10: top10,
        top10Title: `Top 10 ${genreName} Hari Ini di Indonesia`,
        rows: rows
      };

      this.genreCache[cacheKey] = {
        timestamp: now,
        data: result
      };

      return result;
    } catch (err) {
      console.error(`Failed to fetch genre ${genreName}:`, err.message);
      return {
        genre: genreName,
        hero: this.fallback.trending[0],
        heroTypeBadge: `Kategori: ${genreName}`,
        top10: this.fallback.trending,
        top10Title: `Top 10 ${genreName} Hari Ini`,
        rows: [
          { id: `${cacheKey}-trending`, title: `Koleksi ${genreName}`, items: this.fallback.trending }
        ]
      };
    }
  }

  async getDetail(id, type = "movie") {
    // Check fallback
    const found = this.fallback.trending.find(item => item.id === id || item.imdbId === id);
    if (found) {
      const similar = this.fallback.trending.filter(item => item.id !== found.id).slice(0, 6);
      const matchedPlatform = platformSeedMap[id] ? platformSeedMap[id].platform : null;
      return { ...found, platform: matchedPlatform, similar };
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
        const matchedPlatform = platformSeedMap[m.id] ? platformSeedMap[m.id].platform : null;
        return {
          id: m.id,
          imdbId: m.id,
          tmdbId: m.moviedb_id || null,
          title: m.name,
          type: m.type || type,
          platform: matchedPlatform,
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


