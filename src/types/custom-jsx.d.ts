import { UIModalAttributes, UINavMenuAttributes, UISaveBarAttributes, UITitleBarAttributes } from "@shopify/app-bridge-types";

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "ui-nav-menu": React.DetailedHTMLProps<UINavMenuAttributes, HTMLElement>;
      "ui-modal": React.DetailedHTMLProps<UIModalAttributes, HTMLElement>;
      "ui-save-bar": React.DetailedHTMLProps<UISaveBarAttributes, HTMLElement>;
      "ui-title-bar": React.DetailedHTMLProps<UITitleBarAttributes, HTMLElement>;
    }
  }
}
