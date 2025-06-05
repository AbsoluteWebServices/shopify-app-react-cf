import type { Route } from "./+types/_index";
import { redirect } from "react-router";

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return new Response("OK", {
    status: 200,
    headers: {
      "Content-Type": "text/html",
    },
  });
};
