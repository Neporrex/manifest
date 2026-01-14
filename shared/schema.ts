import { pgTable, text, integer, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  discordId: text("discord_id").notNull().unique(),
  username: text("username").notNull(),
  avatar: text("avatar"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  discordId: true,
  username: true,
  avatar: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

// Depot cache to avoid scraping every time
export const depots = pgTable("depots", {
  id: serial("id").primaryKey(),
  appId: text("app_id").notNull(),
  data: text("data").notNull(), // JSON string of depot data
});

export const insertDepotSchema = createInsertSchema(depots).pick({
  appId: true,
  data: true,
});
