import { component$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./global.css";
import { Header } from "./components/root-components/header";
import { Footer } from "./components/root-components/footer";

export default component$(() => {
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
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="ja" class="text-secondary-500 min-h-screen bg-white antialiased">
        <Header />
        <main>
          <section class="min-h-screen pt-14 lg:pt-24">
            <RouterOutlet />
            <ServiceWorkerRegister />
          </section>
        </main>
        <Footer />
      </body>
    </QwikCityProvider>
  );
});
