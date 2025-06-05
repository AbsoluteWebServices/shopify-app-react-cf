import type { Route } from "./+types/app";
import { Link, Outlet, useNavigation } from "react-router";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { Spinner } from "@shopify/polaris";

import styles from "./app.module.css";

export const links: Route.LinksFunction = () => [
  {
    rel: "preconnect",
    href: "https://cdn.shopify.com",
  },
  {
    rel: "stylesheet",
    href: "https://cdn.shopify.com/static/fonts/inter/v4/styles.css",
  },
  { rel: "stylesheet", href: polarisStyles },
];

export const meta: Route.MetaFunction = ({ data }) => [
  {
    name: "shopify-api-key",
    content: data?.apiKey,
  },
];

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  await context.shopify.authenticate.admin(request);

  return { apiKey: context.cloudflare.env.SHOPIFY_API_KEY || "" };
};

export default function App({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const { apiKey } = loaderData;

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <ui-nav-menu>
        <Link to="/app" rel="home">
          Home
        </Link>
      </ui-nav-menu>
      {navigation.state === "loading" ? (
        <div className={styles.loaderContainer}>
          <Spinner accessibilityLabel="Loading..." size="large" />
        </div>
      ) : (
        <Outlet />
      )}
    </AppProvider>
  );
}
