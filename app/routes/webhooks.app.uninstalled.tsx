import type { Route } from "./+types/webhooks.app.uninstalled";

export const action = async ({ context, request }: Route.ActionArgs) => {
  const { shop, session, topic } =
    await context.shopify.authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);

  // Webhook requests can trigger multiple times and after an app has already been uninstalled.
  // If this webhook already ran, the session may have been deleted previously.
  if (session) {
    const sessions = await context.sessionStorage.findSessionsByShop(shop);
    const sessionIds = sessions.map((s) => s.id);
    if (sessionIds.length) {
      await context.sessionStorage.deleteSessions(sessionIds);
    }
  }

  return new Response();
};
