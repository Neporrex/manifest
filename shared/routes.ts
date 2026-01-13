import { z } from 'zod';
import { insertUserSchema } from './schema';

export const api = {
  auth: {
    discord: {
      method: 'GET' as const,
      path: '/auth/discord',
      responses: {},
    },
    callback: {
      method: 'GET' as const,
      path: '/auth/discord/callback',
      responses: {},
    },
    logout: {
      method: 'POST' as const,
      path: '/auth/logout',
      responses: {
        200: z.object({ message: z.string() }),
      },
    },
    me: {
      method: 'GET' as const,
      path: '/api/user',
      responses: {
        200: insertUserSchema.extend({ id: z.number() }).nullable(),
      },
    },
  },
  steam: {
    depots: {
      method: 'GET' as const,
      path: '/api/depots/:appid',
      responses: {
        200: z.array(z.object({
          id: z.string(),
          name: z.string(),
        })),
        404: z.object({ message: z.string() }),
      },
    },
    generate: {
      method: 'POST' as const,
      path: '/api/generate',
      input: z.object({
        appId: z.string(),
        depotId: z.string(),
        manifestId: z.string().optional(),
      }),
      responses: {
        200: z.any(), // Returns a buffer (ZIP file)
        400: z.object({ message: z.string() }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
