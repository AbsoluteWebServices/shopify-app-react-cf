import { useState } from "react";
import type { Route } from "./+types/auth.login";
import { Form } from "react-router";
import {
  AppProvider as PolarisAppProvider,
  Button,
  Card,
  FormLayout,
  Page,
  Text,
  TextField,
} from "@shopify/polaris";
import polarisTranslations from "@shopify/polaris/locales/en.json";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import type { LoginError } from "@shopify/shopify-app-remix/server";
import { LoginErrorType } from "@shopify/shopify-app-remix/server";

interface LoginErrorMessage {
  shop?: string;
}

function loginErrorMessage(loginErrors: LoginError): LoginErrorMessage {
  if (loginErrors?.shop === LoginErrorType.MissingShop) {
    return { shop: "Please enter your shop domain to log in" };
  } else if (loginErrors?.shop === LoginErrorType.InvalidShop) {
    return { shop: "Please enter a valid shop domain to log in" };
  }

  return {};
}

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const errors = loginErrorMessage(await context.shopify.login(request));

  return { errors, polarisTranslations };
};

export const action = async ({ request, context }: Route.ActionArgs) => {
  const errors = loginErrorMessage(await context.shopify.login(request));

  return {
    errors,
  };
};

export default function Auth({ loaderData, actionData }: Route.ComponentProps) {
  const [shop, setShop] = useState("");
  const { errors } = actionData || loaderData;

  return (
    <PolarisAppProvider i18n={loaderData.polarisTranslations}>
      <Page>
        <Card>
          <Form method="post">
            <FormLayout>
              <Text variant="headingMd" as="h2">
                Log in
              </Text>
              <TextField
                type="text"
                name="shop"
                label="Shop domain"
                helpText="example.myshopify.com"
                value={shop}
                onChange={setShop}
                autoComplete="on"
                error={errors.shop}
              />
              <Button submit>Log in</Button>
            </FormLayout>
          </Form>
        </Card>
      </Page>
    </PolarisAppProvider>
  );
}
