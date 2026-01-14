import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "../shared/routes";
import type { User } from "../shared/schema";
import { z } from "zod";
import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import session from "express-session";
import axios from "axios";
import * as cheerio from "cheerio";
import JSZip from "jszip";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Session Setup
  app.use(session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
  }));

  // Passport Setup
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  const clientID = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;

  // Determine the base URL for callbacks
  const getBaseUrl = () => {
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    if (process.env.REPLIT_DEV_DOMAIN) {
      return `https://${process.env.REPLIT_DEV_DOMAIN}`;
    }
    return 'http://localhost:5000';
  };

  const callbackURL = `${getBaseUrl()}/auth/discord/callback`;

  if (clientID && clientSecret) {
    passport.use(new DiscordStrategy({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['identify']
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await storage.getUserByDiscordId(profile.id);
        if (!user) {
          user = await storage.createUser({
            discordId: profile.id,
            username: profile.username,
            avatar: profile.avatar,
          });
        } else {
            // Update details on login
            user = await storage.updateUser(user.id, {
                username: profile.username,
                avatar: profile.avatar
            });
        }
        return done(null, user);
      } catch (err) {
        return done(err as Error, undefined);
      }
    }));
  } else {
    console.warn("Discord credentials not provided. Auth will fail.");
  }

  // Auth Routes
  app.get(api.auth.discord.path, passport.authenticate('discord'));

  app.get(api.auth.callback.path, 
    passport.authenticate('discord', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.post(api.auth.logout.path, (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.json({ message: "Logged out" });
    });
  });

  app.get(api.auth.me.path, (req, res) => {
    try {
      if (req.isAuthenticated()) {
        res.json(req.user);
      } else {
        res.json(null);
      }
    } catch (error) {
      console.error('Error in /api/user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Steam Routes
  app.get(api.steam.depots.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");
    const { appid } = req.params;

    if (!appid || isNaN(parseInt(appid))) {
      return res.status(400).json({ message: "Invalid app ID" });
    }

    try {
      const { data } = await axios.get(`https://steamdb.info/app/${appid}/depots/`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      const $ = cheerio.load(data);
      const depots: { id: string, name: string }[] = [];

      // SteamDB typically uses a table with depot information
      // Look for depot rows in the table
      $('table tbody tr').each((i, el) => {
        const $row = $(el);
        const id = $row.find('td:nth-child(1)').text().trim();
        const name = $row.find('td:nth-child(2)').text().trim();
        const type = $row.find('td:nth-child(3)').text().trim();

        // Only include actual depots (not DLC or other content)
        if (id && !isNaN(parseInt(id)) && type && type.toLowerCase().includes('depot')) {
          depots.push({ id, name: name || `Depot ${id}` });
        }
      });

      // If no depots found with the above method, try alternative selectors
      if (depots.length === 0) {
        $('.depot-row, .table-depots tr, [data-depot-id]').each((i, el) => {
          const $el = $(el);
          const id = $el.attr('data-depot-id') || $el.find('[data-depot-id]').attr('data-depot-id') || $el.find('td:first-child').text().trim();
          const name = $el.find('.depot-name, td:nth-child(2)').text().trim() || $el.attr('data-depot-name');

          if (id && !isNaN(parseInt(id))) {
            depots.push({ id, name: name || `Depot ${id}` });
          }
        });
      }

      res.json(depots);
    } catch (err) {
      console.error('Error fetching depots:', err);
      res.status(500).json({ message: "Failed to fetch depots" });
    }
  });

  app.post(api.steam.generate.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");

    const { appId, depotId, manifestId } = req.body;

    // Validate required fields
    if (!appId || !depotId) {
      return res.status(400).json({ message: "appId and depotId are required" });
    }

    if (isNaN(parseInt(appId)) || isNaN(parseInt(depotId))) {
      return res.status(400).json({ message: "appId and depotId must be valid numbers" });
    }

    try {
      // Generate Lua Content
      const manifestGid = manifestId || "8888888888888888888"; // Default fake manifest ID

      const luaContent = `-- Generated by Steam Manifest Generator
appid = ${appId}
depots = {
    [${depotId}] = {
        ["manifest"] = "${manifestGid}",
        ["key"] = "0000000000000000000000000000000000000000000000000000000000000000",
        ["target"] = "default",
    },
}
`;

      // Generate fake manifest content
      const manifestContent = `Fake Manifest Content for App ${appId} - Depot ${depotId}
Manifest ID: ${manifestGid}
Generated at: ${new Date().toISOString()}

This is a placeholder manifest file for testing purposes.
In a real implementation, this would contain the actual Steam manifest data.`;

      const zip = new JSZip();
      zip.file(`${appId}.lua`, luaContent);
      zip.file(`${appId}_${depotId}.manifest`, manifestContent);

      const content = await zip.generateAsync({ type: "nodebuffer" });

      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', `attachment; filename=manifest_${appId}_${depotId}.zip`);
      res.send(content);
    } catch (err) {
      console.error('Error generating manifest:', err);
      res.status(500).json({ message: "Failed to generate manifest" });
    }
  });

  // Chat Route with user ID check
  app.post('/api/chat', (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ error: 'Unauthorized' });
    
    const { userId, message } = req.body;
    
    if (userId !== (req.user as User).id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Process chat message
    res.json({ response: `Echo: ${message}` });
  });

  return httpServer;
}
