import type { Route } from "./+types/auth.$";

export const loader = async ({ context, request }: Route.LoaderArgs) => {
  await context.shopify.authenticate.admin(request);

  return null;
};
