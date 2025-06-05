import type { Route } from "./+types/webhooks.app.subscriptions";

export const action = async ({ context, request }: Route.ActionArgs) => {
  const { admin, shop, session, topic } =
    await context.shopify.authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);

  if (!admin || !session) {
    // The admin context isn't returned if the webhook fired after a shop was uninstalled.
    throw new Response();
  }

  switch (topic) {
    case "APP_SUBSCRIPTIONS_UPDATE":
      // await checkUsageAndCreateCharge(shop, admin.graphql, context.db);

      break;
  }

  return new Response();
};
