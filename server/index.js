const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const tmdb = require("./tmdb");
const stremio = require("./stremio");

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

const VALID_TYPES = new Set(["movie", "series"]);
const VALID_ID = /^[\w-]{1,32}$/;

app.param("id", (req, res, next, id) => VALID_ID.test(id) ? next() : res.status(400).json({ error: "Invalid id" }));
app.param("type", (req, res, next, type) => VALID_TYPES.has(type) ? next() : res.status(400).json({ error: "Invalid type" }));

const fail = (res, msg, err) => {
  console.error(`${msg}:`, err.message);
  res.status(500).json({ error: msg });
};

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../public")));

// API: Catalog & Rows
app.get("/api/catalog", async (req, res) => {
  try {
    const forceRefresh = req.query.refresh === "true";
    const data = await tmdb.getCatalog(forceRefresh);
    res.json(data);
  } catch (err) {
    fail(res, "Failed to fetch catalog", err);
  }
});

// API: Genre / Category Catalog
app.get("/api/genre/:genre", async (req, res) => {
  try {
    const data = await tmdb.getGenreCatalog(req.params.genre);
    res.json(data);
  } catch (err) {
    fail(res, "Failed to fetch genre catalog", err);
  }
});

// API: Detail Film / Serial
app.get("/api/detail/:id", async (req, res) => {
  try {
    const type = VALID_TYPES.has(req.query.type) ? req.query.type : "movie";
    const item = await tmdb.getDetail(req.params.id, type);
    if (!item) return res.status(404).json({ error: "Title not found" });
    res.json(item);
  } catch (err) {
    fail(res, "Failed to fetch details", err);
  }
});

// API: Search
app.get("/api/search", async (req, res) => {
  try {
    const results = await tmdb.search(req.query.q);
    res.json({ results });
  } catch (err) {
    fail(res, "Search failed", err);
  }
});

// API: Stremio Streams Resolver
app.get("/api/stream/:type/:id", async (req, res) => {
  try {
    const season = parseInt(req.query.season) || 1;
    const episode = parseInt(req.query.episode) || 1;
    const streams = await stremio.resolveStreams(req.params.type, req.params.id, season, episode);
    res.json(streams);
  } catch (err) {
    fail(res, "Failed to resolve stream", err);
  }
});

// API: Subtitles (WebVTT)
app.get("/api/subtitles/:lang", (req, res) => {
  res.setHeader("Content-Type", "text/vtt; charset=utf-8");
  res.send(stremio.getVttSubtitle(req.params.lang === "id" ? "id" : "en"));
});

// SPA Fallback
app.use((req, res) => {
  const indexPath = path.join(__dirname, "../public/index.html");
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  res.status(404).json({ error: "Endpoint not found" });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🎬 YUKNONTON UI + STREMIO BACKEND SERVER IS RUNNING!`);
    console.log(`🌐 Web URL: http://localhost:${PORT}`);
    console.log(`=======================================================`);
  });
}

module.exports = app;





