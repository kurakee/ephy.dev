import { component$, useServerData } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "~/styles/global.css";

export default component$(() => {
  const nonce = useServerData<string | undefined>("nonce");
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#b1d5ff" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials" />
        <RouterHead />
      </head>
      <body lang="ja" class="text-secondary-500 min-h-screen bg-white antialiased">
        <RouterOutlet />
        <ServiceWorkerRegister nonce={nonce} />
      </body>
    </QwikCityProvider>
  );
});
