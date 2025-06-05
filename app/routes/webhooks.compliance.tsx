import type { Route } from "./+types/webhooks.compliance";

export const action = async ({ context, request }: Route.ActionArgs) => {
  const { shop, topic } = await context.shopify.authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);

  switch (topic) {
    case "SHOP_REDACT":
      return new Response(null, { status: 200 });
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    default:
      return new Response("OK", { status: 200 });
  }
};
