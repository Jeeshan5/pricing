import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fs from "fs";
import { selectVersion } from "./routing.js";

const app = express();
const PORT = 5000;

// Enable CORS for your frontend
app.use(cors({ origin: "http://localhost:5174", credentials: true }));
app.use(cookieParser());

// Endpoint to serve pricing data
app.get("/pricing", (req, res) => {
  try {
    // Determine which version to serve
    const version = selectVersion(req, res);

    if (!version) {
      console.error("❌ selectVersion did not return a version");
      return res.status(500).json({ error: "No version selected" });
    }

    const pricingFile = `./data/${version}.json`;

    // Check if file exists
    if (!fs.existsSync(pricingFile)) {
      console.error(`❌ Missing file: ${pricingFile}`);
      return res.status(500).json({ error: `Pricing file not found: ${version}` });
    }

    // Read and parse JSON
    let pricingData;
    try {
      pricingData = JSON.parse(fs.readFileSync(pricingFile, "utf-8"));
    } catch (err) {
      console.error(`❌ Failed to parse ${pricingFile}:`, err);
      return res.status(500).json({ error: "Failed to parse pricing file" });
    }

    console.log(`Request from ${req.ip} → Served ${version}`);
    res.json(pricingData); // Send JSON to frontend

  } catch (err) {
    console.error("❌ Error serving pricing:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Health check endpoint (optional)
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
