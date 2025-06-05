import type { SessionStorage } from '@shopify/shopify-app-session-storage';
import {
  AppDistribution,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from './schema';
import { apiVersion } from "./constants";

export type ShopifyApp = ReturnType<typeof shopifyApp>;
let shopify: ShopifyApp | null = null;

export const getShopifyInstance = (env: Env, sessionStorage: SessionStorage, db: DrizzleD1Database<typeof schema>): ShopifyApp => {
  if (shopify === null) {
    shopify = shopifyApp({
      apiKey: env.SHOPIFY_API_KEY,
      apiSecretKey: env.SHOPIFY_API_SECRET || "",
      apiVersion: apiVersion,
      scopes: env.SHOPIFY_APP_SCOPES?.split(","),
      appUrl: env.SHOPIFY_APP_URL || "",
      authPathPrefix: "/auth",
      sessionStorage,
      distribution: AppDistribution.AppStore,
      future: {
        unstable_newEmbeddedAuthStrategy: true,
        removeRest: true,
      },
      useOnlineTokens: true,
      hooks: {
        async afterAuth({ session, admin }) {
        },
      },
      ...(env.SHOP_CUSTOM_DOMAIN
        ? { customShopDomains: [env.SHOP_CUSTOM_DOMAIN] }
        : {}),
    });
  }

  return shopify;
}

export default getShopifyInstance;
