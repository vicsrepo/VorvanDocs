import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Handle ES modules __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve the WebAssembly files
  app.get("/wasm/:file", (req, res) => {
    const filePath = path.join(rootDir, "public", "wasm", req.params.file);
    if (fs.existsSync(filePath)) {
      // Set appropriate MIME type for WebAssembly files
      if (req.params.file.endsWith(".wasm")) {
        res.setHeader("Content-Type", "application/wasm");
      } else if (req.params.file.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
      res.sendFile(filePath);
    } else {
      res.status(404).send("File not found");
    }
  });

  // Serve markdown files from the pages directory
  app.get("/pages/:file", (req, res) => {
    const filePath = path.join(rootDir, "public", "pages", req.params.file);
    if (fs.existsSync(filePath)) {
      res.setHeader("Content-Type", "text/markdown");
      res.sendFile(filePath);
    } else {
      res.status(404).send("File not found");
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
