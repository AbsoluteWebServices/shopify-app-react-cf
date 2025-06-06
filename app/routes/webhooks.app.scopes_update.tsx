import type { Route } from "./+types/webhooks.app.scopes_update";

export const action = async ({ context, request }: Route.ActionArgs) => {
  const { admin, payload, session, topic, shop } =
    await context.shopify.authenticate.webhook(request);
  console.log(`Received ${topic} webhook for ${shop}`);

  if (!admin || !session) {
    // The admin context isn't returned if the webhook fired after a shop was uninstalled.
    throw new Response();
  }

  switch (topic) {
    case "APP_SCOPES_UPDATE":
      const current = payload.current as string[];
      session.scope = current.join(",");
      await context.sessionStorage.storeSession(session);
      break;
  }

  return new Response();
};
