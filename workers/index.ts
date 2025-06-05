import { createRequestHandler } from "react-router";
import { getShopifyInstance } from "../src/shopify.server";
import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import { KVSessionStorage } from '@shopify/shopify-app-session-storage-kv';
import * as schema from "../src/schema";


declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
    db: DrizzleD1Database<typeof schema>;
    sessionStorage: KVSessionStorage;
    shopify: ReturnType<typeof getShopifyInstance>;
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

export default {
  async fetch(request, env, ctx) {
    const requestUrl = new URL(request.url);

    if (!env.SHOPIFY_APP_URL) {
      // @ts-ignore
      env.SHOPIFY_APP_URL = `https://${requestUrl.hostname}`;
    }

    const db = drizzle(env.DB, { schema });
    const sessionStorage = new KVSessionStorage(env.SESSIONS);
    const shopify = getShopifyInstance(env, sessionStorage, db);

    return requestHandler(request, {
      cloudflare: { env, ctx },
      db,
      sessionStorage,
      shopify,
    });
  },
} satisfies ExportedHandler<Env>;
