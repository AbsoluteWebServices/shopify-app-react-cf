# Shopify App Template – React Router 7 + Cloudflare Workers

This template helps you build a modern [Shopify app](https://shopify.dev/docs/apps/getting-started) using [React Router v7](https://reactrouter.com/en/main) and deploy it on [Cloudflare Workers](https://developers.cloudflare.com/workers/). It leverages Shopify's app libraries, Polaris for UI, and Cloudflare's edge platform for fast, scalable hosting.

## Quick Start

### Prerequisites

Before you begin, ensure you have:

1. **Node.js**: [Download and install](https://nodejs.org/en/download/) (v18.20+, v20.10+, or newer).
2. **Shopify Partner Account**: [Sign up here](https://partners.shopify.com/signup).
3. **Test Store**: Create a [development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) for testing.

### Setup

Install dependencies with pnpm:

```sh
pnpm install
```

### Local Development

Start the development server:

```sh
pnpm run dev
```

This will launch the app locally, using the Shopify CLI for authentication, tunneling, and environment management.

### Project Structure

- `/app` – React Router app entry, routes, and UI components.
- `/src` – Server-side logic, Shopify API integration, and types.
- `/workers` – Cloudflare Worker entry point.
- `wrangler.jsonc` – Cloudflare Worker configuration.
- **Cloudflare KV** – Used for session storage (see `wrangler.jsonc` for configuration).

### Authenticating and Querying Shopify

Use the `context.shopify` object to authenticate and query Shopify APIs. Example:

```js
export async function loader({ request, context }) {
  const { admin } = await context.shopify.authenticate.admin(request);

  const response = await admin.graphql(`
    {
      products(first: 25) {
        nodes {
          title
          description
        }
      }
    }`);

  const {
    data: {
      products: { nodes },
    },
  } = await response.json();

  return nodes;
}
```

## Deployment

### Build

To build the app for production:

```sh
pnpm run build
```

### Deploy to Cloudflare Workers

After building, deploy with Wrangler:

```sh
pnpm run deploy:cf
```

Configuration for environments, KV namespaces, and D1 databases is managed in `wrangler.jsonc`.

## Tech Stack

- **React Router v7** – Routing and navigation
- **Cloudflare Workers** – Edge serverless hosting
- **Shopify App Libraries** – Authentication, session, and API helpers
- **Polaris** – Shopify's React UI framework
- **Drizzle ORM** – Database access (with D1/SQLite by default)
- **Cloudflare KV** – Session storage
- **TypeScript** – Type safety

## Resources

- [React Router Docs](https://reactrouter.com/en/main)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Shopify App Development](https://shopify.dev/docs/apps/getting-started)
- [Shopify App Libraries](https://shopify.dev/docs/api/shopify-app-remix)
- [Polaris Design System](https://polaris.shopify.com/)

## Troubleshooting

- **Database errors**: Ensure D1/SQLite is set up and migrations are run.
- **Session errors**: Ensure Cloudflare KV is configured and bound as shown in `wrangler.jsonc`.
- **Authentication issues**: Use the Shopify CLI for local development and ensure environment variables are set.
- **Cloudflare deployment**: Check `wrangler.jsonc` for correct bindings and environment settings.

## Notes

- This template is not based on Remix or Node.js server. All routing and server logic is handled by React Router and Cloudflare Workers.
- For advanced Shopify features (webhooks, session storage, etc.), refer to the official [Shopify app libraries documentation](https://shopify.dev/docs/api/shopify-app-remix).
