// Netflix Frontend Application Controller
class NetflixApp {
  constructor() {
    this.catalog = null;
    this.activeItem = null;
    this.hls = null;
    this.streamsData = null;
    this.searchDebounce = null;

    this.initElements();
    this.initEvents();
    this.loadCatalog();
  }

  initElements() {
    // Nav
    this.navbar = document.getElementById("navbar");
    this.searchInput = document.getElementById("searchInput");
    this.refreshTrendingBtn = document.getElementById("refreshTrendingBtn");
    this.searchResultsContainer = document.getElementById("searchResultsContainer");
    this.mainContent = document.getElementById("mainContent");

    // Hero
    this.heroBackdrop = document.getElementById("heroBackdrop");
    this.heroTitle = document.getElementById("heroTitle");
    this.heroOverview = document.getElementById("heroOverview");
    this.heroBadge = document.getElementById("heroBadge");
    this.heroPlayBtn = document.getElementById("heroPlayBtn");
    this.heroInfoBtn = document.getElementById("heroInfoBtn");

    // Rows
    this.top10Row = document.getElementById("top10Row");
    this.rowsContainer = document.getElementById("rowsContainer");

    // Modal
    this.detailModal = document.getElementById("detailModal");
    this.modalBackdrop = document.getElementById("modalBackdrop");
    this.modalTitle = document.getElementById("modalTitle");
    this.modalMatch = document.getElementById("modalMatch");
    this.modalYear = document.getElementById("modalYear");
    this.modalRating = document.getElementById("modalRating");
    this.modalDuration = document.getElementById("modalDuration");
    this.modalQuality = document.getElementById("modalQuality");
    this.modalOverview = document.getElementById("modalOverview");
    this.modalCast = document.getElementById("modalCast");
    this.modalGenres = document.getElementById("modalGenres");
    this.modalEpisodesSection = document.getElementById("modalEpisodesSection");
    this.modalSeasonSelect = document.getElementById("modalSeasonSelect");
    this.modalEpisodesList = document.getElementById("modalEpisodesList");
    this.modalSimilarGrid = document.getElementById("modalSimilarGrid");
    this.modalPlayBtn = document.getElementById("modalPlayBtn");
    this.closeModalBtn = document.getElementById("closeModalBtn");

    // Video Player & Switcher
    this.videoPlayerOverlay = document.getElementById("videoPlayerOverlay");
    this.embedPlayer = document.getElementById("embedPlayer");
    this.videoElement = document.getElementById("videoElement");
    this.playerTitle = document.getElementById("playerTitle");
    this.currentServerLabel = document.getElementById("currentServerLabel");
    this.serverSelect = document.getElementById("serverSelect");
    this.playerBackBtn = document.getElementById("playerBackBtn");
    this.playPauseBtn = document.getElementById("playPauseBtn");
    this.playPauseIcon = document.getElementById("playPauseIcon");
    this.rewindBtn = document.getElementById("rewindBtn");
    this.forwardBtn = document.getElementById("forwardBtn");
    this.volumeBtn = document.getElementById("volumeBtn");
    this.volumeSlider = document.getElementById("volumeSlider");
    this.timeProgress = document.getElementById("timeProgress");
    this.timeDuration = document.getElementById("timeDuration");
    this.progressBar = document.getElementById("progressBar");
    this.subtitlesSelect = document.getElementById("subtitlesSelect");
    this.fullscreenBtn = document.getElementById("fullscreenBtn");
    this.playerControls = document.getElementById("playerControls");
    this.playerLoader = document.getElementById("playerLoader");
  }

  initEvents() {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        this.navbar.classList.add("bg-[#141414]", "shadow-2xl");
        this.navbar.classList.remove("bg-gradient-to-b");
      } else {
        this.navbar.classList.remove("bg-[#141414]", "shadow-2xl");
        this.navbar.classList.add("bg-gradient-to-b");
      }
    });

        if (this.refreshTrendingBtn) {
      this.refreshTrendingBtn.addEventListener("click", () => {
        const icon = this.refreshTrendingBtn.querySelector("i");
        if (icon) icon.classList.add("animate-spin");
        this.loadCatalog(true).finally(() => {
          setTimeout(() => { if (icon) icon.classList.remove("animate-spin"); }, 700);
        });
      });
    }

    this.searchInput.addEventListener("input", (e) => {
      clearTimeout(this.searchDebounce);
      const query = e.target.value.trim();
      this.searchDebounce = setTimeout(() => this.handleSearch(query), 300);
    });

    this.closeModalBtn.addEventListener("click", () => this.closeModal());
    this.detailModal.addEventListener("click", (e) => {
      if (e.target === this.detailModal) this.closeModal();
    });

    // Player Events
    this.playerBackBtn.addEventListener("click", () => this.closePlayer());
    this.serverSelect.addEventListener("change", (e) => this.switchServer(e.target.value));

    this.playPauseBtn.addEventListener("click", () => this.togglePlayPause());
    this.videoElement.addEventListener("click", () => this.togglePlayPause());
    this.rewindBtn.addEventListener("click", () => this.seekDelta(-10));
    this.forwardBtn.addEventListener("click", () => this.seekDelta(10));
    this.volumeBtn.addEventListener("click", () => this.toggleMute());
    this.volumeSlider.addEventListener("input", (e) => {
      this.videoElement.volume = parseFloat(e.target.value);
      this.videoElement.muted = false;
    });

    this.videoElement.addEventListener("timeupdate", () => this.updatePlayerProgress());
    this.progressBar.addEventListener("input", (e) => {
      if (!this.videoElement.duration) return;
      this.videoElement.currentTime = (parseFloat(e.target.value) / 100) * this.videoElement.duration;
    });

    this.subtitlesSelect.addEventListener("change", (e) => this.setSubtitle(e.target.value));
    this.fullscreenBtn.addEventListener("click", () => this.toggleFullscreen());

    window.addEventListener("keydown", (e) => {
      if (this.videoPlayerOverlay.classList.contains("hidden")) {
        if (e.key === "Escape") this.closeModal();
        return;
      }
      if (e.code === "Space" && !this.videoElement.classList.contains("hidden")) {
        e.preventDefault();
        this.togglePlayPause();
      } else if (e.key === "Escape") {
        this.closePlayer();
      }
    });
  }

  async loadCatalog(force = false) {
    try {
      const res = await fetch(`/api/catalog${force ? "?refresh=true" : ""}`);
      this.catalog = await res.json();
      this.renderHero(this.catalog.hero);
      this.renderTop10(this.catalog.top10);
      this.renderRows(this.catalog.rows);
    } catch (err) {
      console.error("Failed to load catalog:", err);
    }
  }

  renderHero(hero) {
    if (!hero) return;
    this.heroBackdrop.src = hero.backdrop;
    this.heroTitle.textContent = hero.title;
    this.heroOverview.textContent = hero.overview;
    this.heroBadge.textContent = `#${hero.top10 || 1} in Indonesia Today`;

    this.heroPlayBtn.onclick = () => this.openPlayer(hero);
    this.heroInfoBtn.onclick = () => this.openModal(hero.id);
  }

  renderTop10(items) {
    if (!items || !this.top10Row) return;
    this.top10Row.innerHTML = "";
    items.forEach((item, idx) => {
      const card = document.createElement("div");
      card.className = "flex-none flex items-center top10-card cursor-pointer relative group";
      card.innerHTML = `
        <div class="top10-number">${idx + 1}</div>
        <div class="w-36 md:w-44 lg:w-52 h-52 md:h-64 lg:h-72 rounded-md overflow-hidden relative shadow-lg movie-card">
          <img src="${item.poster}" alt="${item.title}" class="w-full h-full object-cover rounded-md" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-3">
            <span class="text-xs text-green-400 font-bold">${item.match}</span>
            <span class="text-xs text-gray-300">${item.duration} · ${item.rating}</span>
          </div>
        </div>
      `;
      card.onclick = () => this.openModal(item.id, item.type || "movie");
      this.top10Row.appendChild(card);
    });
  }

  renderRows(rows) {
    if (!rows || !this.rowsContainer) return;
    this.rowsContainer.innerHTML = "";

    rows.forEach(row => {
      const rowDiv = document.createElement("div");
      rowDiv.className = "relative mb-8 group";

      rowDiv.innerHTML = `
        <h2 class="text-lg md:text-xl lg:text-2xl font-bold mb-3 px-4 md:px-12 text-gray-100">${row.title}</h2>
        <div class="relative">
          <button class="absolute left-0 top-0 bottom-0 z-40 w-10 md:w-12 bg-black/60 hover:bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer prev-btn">
            <i data-lucide="chevron-left" class="w-8 h-8 text-white"></i>
          </button>
          <div class="flex items-center space-x-3 md:space-x-4 overflow-x-auto hide-scrollbar px-4 md:px-12 scroll-smooth carousel-track py-4">
            ${row.items.map(item => `
              <div class="flex-none w-36 md:w-48 lg:w-56 h-52 md:h-72 lg:h-80 rounded-md overflow-hidden relative shadow-md cursor-pointer movie-card" data-id="${item.id}" data-type="${item.type || "movie"}">
                <img src="${item.poster}" alt="${item.title}" class="w-full h-full object-cover rounded-md" loading="lazy" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 hover:opacity-100 transition duration-300 flex flex-col justify-end p-3">
                  <h4 class="font-bold text-sm line-clamp-1">${item.title}</h4>
                  <div class="flex items-center space-x-2 mt-1">
                    <span class="text-xs text-green-400 font-bold">${item.match}</span>
                    <span class="text-[10px] border border-gray-400 px-1 rounded">${item.rating}</span>
                  </div>
                  <div class="flex items-center space-x-2 mt-2">
                    <button class="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 play-quick" data-id="${item.id}" data-type="${item.type || "movie"}">
                      <i data-lucide="play" class="w-3.5 h-3.5 fill-current"></i>
                    </button>
                    <button class="w-7 h-7 rounded-full bg-[#2a2a2a] border border-gray-400 text-white flex items-center justify-center hover:border-white info-quick" data-id="${item.id}" data-type="${item.type || "movie"}">
                      <i data-lucide="chevron-down" class="w-4 h-4"></i>
                    </button>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
          <button class="absolute right-0 top-0 bottom-0 z-40 w-10 md:w-12 bg-black/60 hover:bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer next-btn">
            <i data-lucide="chevron-right" class="w-8 h-8 text-white"></i>
          </button>
        </div>
      `;

      const track = rowDiv.querySelector(".carousel-track");
      rowDiv.querySelector(".prev-btn").onclick = () => track.scrollBy({ left: -window.innerWidth * 0.7, behavior: "smooth" });
      rowDiv.querySelector(".next-btn").onclick = () => track.scrollBy({ left: window.innerWidth * 0.7, behavior: "smooth" });

      rowDiv.querySelectorAll(".movie-card").forEach(c => {
        c.onclick = (e) => {
          const id = c.getAttribute("data-id");
          if (e.target.closest(".play-quick")) {
            e.stopPropagation();
            const item = this.catalog.trending.find(x => x.id === id);
            this.openPlayer(item);
          } else {
            this.openModal(id);
          }
        };
      });

      this.rowsContainer.appendChild(rowDiv);
    });

    if (window.lucide) lucide.createIcons();
  }

  async handleSearch(query) {
    if (!query) {
      this.searchResultsContainer.classList.add("hidden");
      this.mainContent.classList.remove("hidden");
      return;
    }

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const { results } = await res.json();
      this.renderSearchResults(results, query);
    } catch (err) {
      console.error("Search error:", err);
    }
  }

  renderSearchResults(results, query) {
    this.mainContent.classList.add("hidden");
    this.searchResultsContainer.classList.remove("hidden");
    this.searchResultsContainer.innerHTML = `
      <div class="px-4 md:px-12 pt-24 pb-12">
        <h2 class="text-xl md:text-2xl font-bold mb-6 text-gray-200">
          Search Results for: <span class="text-white font-extrabold">"${query}"</span>
        </h2>
        ${results.length === 0 ? `
          <div class="py-20 text-center text-gray-400">
            <i data-lucide="film" class="w-16 h-16 mx-auto mb-4 opacity-50"></i>
            <p class="text-lg">No titles found matching your search.</p>
          </div>
        ` : `
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            ${results.map(item => `
              <div class="rounded-md overflow-hidden shadow-lg cursor-pointer movie-card relative group h-64 md:h-80" data-id="${item.id}" data-type="${item.type || "movie"}">
                <img src="${item.poster}" alt="${item.title}" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-3">
                  <span class="font-bold text-sm">${item.title}</span>
                  <span class="text-xs text-green-400 mt-1">${item.match} · ${item.year}</span>
                </div>
              </div>
            `).join("")}
          </div>
        `}
      </div>
    `;

    this.searchResultsContainer.querySelectorAll(".movie-card").forEach(card => {
      card.onclick = () => this.openModal(card.getAttribute("data-id"), card.getAttribute("data-type") || "movie");
    });

    if (window.lucide) lucide.createIcons();
  }

  async openModal(id, type = "movie") {
    try {
      const res = await fetch(`/api/detail/${id}?type=${type}`);
      const item = await res.json();
      this.activeItem = item;

      this.modalBackdrop.src = item.backdrop;
      this.modalTitle.textContent = item.title;
      this.modalMatch.textContent = item.match;
      this.modalYear.textContent = item.year;
      this.modalRating.textContent = item.rating;
      this.modalDuration.textContent = item.duration;
      this.modalQuality.textContent = item.quality || "4K Ultra HD";
      this.modalOverview.textContent = item.overview;
      this.modalCast.textContent = item.cast ? item.cast.join(", ") : "-";
      this.modalGenres.textContent = item.genres ? item.genres.join(", ") : "-";

      this.modalPlayBtn.onclick = () => {
        this.closeModal();
        this.openPlayer(item);
      };

      if (item.type === "series" && item.seasons && item.seasons.length > 0) {
        this.modalEpisodesSection.classList.remove("hidden");

        // Populate Season Dropdown
        this.modalSeasonSelect.innerHTML = item.seasons.map(s => `
          <option value="${s.seasonNumber}" class="bg-[#181818]">${s.name || 'Season ' + s.seasonNumber} (${s.episodes ? s.episodes.length : 0} Episode)</option>
        `).join("");

        const renderEpisodes = (seasonNum) => {
          const selectedSeason = item.seasons.find(s => s.seasonNumber === seasonNum) || item.seasons[0];
          this.modalEpisodesList.innerHTML = selectedSeason.episodes.map(ep => `
            <div class="flex items-center space-x-4 p-3.5 rounded-lg bg-[#242424] hover:bg-[#2f2f2f] transition cursor-pointer group border border-transparent hover:border-gray-600" onclick="app.openPlayer(app.activeItem, ${seasonNum}, ${ep.episodeNumber})">
              <span class="text-lg font-bold text-gray-400 w-6 text-center">${ep.episodeNumber}</span>
              <div class="w-28 md:w-32 h-16 md:h-20 rounded overflow-hidden relative flex-shrink-0 bg-black/50">
                <img src="${ep.thumbnail || item.backdrop}" alt="${ep.title}" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <i data-lucide="play" class="w-6 h-6 text-white fill-current"></i>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex justify-between items-center mb-1">
                  <h4 class="font-bold text-sm text-white truncate pr-2">${ep.title}</h4>
                  <span class="text-xs text-gray-400 flex-shrink-0">${ep.duration || '45m'}</span>
                </div>
                <p class="text-xs text-gray-400 line-clamp-2">${ep.overview || 'Tonton episode lengkap ini sekarang.'}</p>
              </div>
            </div>
          `).join("");
          if (window.lucide) lucide.createIcons();
        };

        // Initial render for season 1
        renderEpisodes(item.seasons[0].seasonNumber);

        // Change season event
        this.modalSeasonSelect.onchange = (e) => {
          renderEpisodes(parseInt(e.target.value));
        };
      } else {
        this.modalEpisodesSection.classList.add("hidden");
      }

      if (item.similar && item.similar.length > 0) {
        this.modalSimilarGrid.innerHTML = item.similar.map(sim => `
          <div class="rounded-md bg-[#242424] overflow-hidden cursor-pointer hover:scale-105 transition" onclick="app.openModal('${sim.id}')">
            <img src="${sim.backdrop || sim.poster}" class="w-full h-28 object-cover" />
            <div class="p-3">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs text-green-400 font-bold">${sim.match}</span>
                <span class="text-[10px] border border-gray-500 px-1 rounded">${sim.rating}</span>
              </div>
              <h5 class="text-sm font-bold line-clamp-1">${sim.title}</h5>
              <p class="text-xs text-gray-400 mt-1 line-clamp-2">${sim.overview}</p>
            </div>
          </div>
        `).join("");
      }

      this.detailModal.classList.remove("hidden");
      document.body.classList.add("overflow-hidden");
      if (window.lucide) lucide.createIcons();
    } catch (err) {
      console.error("Open modal error:", err);
    }
  }

  closeModal() {
    this.detailModal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }

  async openPlayer(item, season = 1, episode = 1) {
    if (!item) return;
    this.playerTitle.textContent = item.type === "series" ? `${item.title} - S${season}E${episode}` : item.title;
    this.videoPlayerOverlay.classList.remove("hidden");
    this.playerLoader.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");

    try {
      const res = await fetch(`/api/stream/${item.type || 'movie'}/${item.id}?season=${season}&episode=${episode}`);
      this.streamsData = await res.json();

      // Populate Server Select
      this.serverSelect.innerHTML = this.streamsData.streams.map(s => `
        <option value="${s.id}" class="bg-[#181818]">${s.name}</option>
      `).join("");

      // Default to Server HD 1 (Real Film Embed)
      this.switchServer(this.streamsData.streams[0].id);
    } catch (err) {
      console.error("Stream resolution error:", err);
      this.switchServer("hls");
    }
  }

  switchServer(serverId) {
    if (!this.streamsData) return;
    const selected = this.streamsData.streams.find(s => s.id === serverId) || this.streamsData.streams[0];
    this.currentServerLabel.textContent = selected.name;

    // Reset current players
    if (this.hls) {
      this.hls.destroy();
      this.hls = null;
    }
    this.videoElement.pause();
    this.videoElement.src = "";

    if (selected.type === "embed") {
      // 🎬 REAL FULL MOVIE STREAM EMBED
      this.videoElement.classList.add("hidden");
      this.playerControls.classList.add("hidden");
      this.embedPlayer.classList.remove("hidden");
      this.embedPlayer.src = selected.url;
      this.playerLoader.classList.add("hidden");
    } else if (selected.type === "app") {
      // Open in Stremio Desktop
      window.location.href = selected.url;
      this.playerLoader.classList.add("hidden");
    } else if (selected.type === "hls") {
      // Local HLS Video Player
      this.embedPlayer.classList.add("hidden");
      this.embedPlayer.src = "";
      this.videoElement.classList.remove("hidden");
      this.playerControls.classList.remove("hidden");
      this.initHlsPlayer(selected.url);
    }
  }

  initHlsPlayer(streamUrl) {
    this.playerLoader.classList.remove("hidden");
    if (Hls.isSupported()) {
      this.hls = new Hls({ enableWorker: true, lowLatencyMode: true });
      this.hls.loadSource(streamUrl);
      this.hls.attachMedia(this.videoElement);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.playerLoader.classList.add("hidden");
        this.videoElement.play().catch(() => {});
        this.updatePlayPauseIcon();
      });
      this.hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) this.hls.recoverMediaError();
      });
    } else if (this.videoElement.canPlayType("application/vnd.apple.mpegurl")) {
      this.videoElement.src = streamUrl;
      this.videoElement.addEventListener("loadedmetadata", () => {
        this.playerLoader.classList.add("hidden");
        this.videoElement.play().catch(() => {});
        this.updatePlayPauseIcon();
      });
    }
  }

  togglePlayPause() {
    if (this.videoElement.paused) {
      this.videoElement.play();
    } else {
      this.videoElement.pause();
    }
    this.updatePlayPauseIcon();
  }

  updatePlayPauseIcon() {
    if (this.videoElement.paused) {
      this.playPauseIcon.setAttribute("data-lucide", "play");
    } else {
      this.playPauseIcon.setAttribute("data-lucide", "pause");
    }
    if (window.lucide) lucide.createIcons();
  }

  seekDelta(seconds) {
    this.videoElement.currentTime = Math.max(0, Math.min(this.videoElement.duration || 0, this.videoElement.currentTime + seconds));
  }

  toggleMute() {
    this.videoElement.muted = !this.videoElement.muted;
    this.volumeSlider.value = this.videoElement.muted ? 0 : this.videoElement.volume;
  }

  formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }

  updatePlayerProgress() {
    if (!this.videoElement.duration) return;
    const progress = (this.videoElement.currentTime / this.videoElement.duration) * 100;
    this.progressBar.value = progress;
    this.timeProgress.textContent = this.formatTime(this.videoElement.currentTime);
    this.timeDuration.textContent = this.formatTime(this.videoElement.duration);
  }

  setSubtitle(lang) {
    const existingTracks = this.videoElement.querySelectorAll("track");
    existingTracks.forEach(t => t.remove());
    if (lang === "off") return;

    const track = document.createElement("track");
    track.kind = "subtitles";
    track.label = lang === "id" ? "Bahasa Indonesia" : "English";
    track.srclang = lang;
    track.src = `/api/subtitles/${lang}`;
    track.default = true;
    this.videoElement.appendChild(track);
    this.videoElement.textTracks[0].mode = "showing";
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      this.videoPlayerOverlay.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  closePlayer() {
    this.videoElement.pause();
    if (this.hls) {
      this.hls.destroy();
      this.hls = null;
    }
    this.videoElement.src = "";
    this.embedPlayer.src = "";
    this.embedPlayer.classList.add("hidden");
    this.videoElement.classList.add("hidden");
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    this.videoPlayerOverlay.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.app = new NetflixApp();
});




