import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "../shared/schema";
import path from "path";

// Use a SQLite database file instead of DATABASE_URL
const dbPath = process.env.DATABASE_URL || path.join("/tmp", "app.db");

// Ensure the data directory exists (only if not using /tmp)
import fs from "fs";
if (!dbPath.startsWith("/tmp")) {
  const dbDir = path.dirname(dbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
}

const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });
