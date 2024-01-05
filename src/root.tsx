import { component$, useServerData } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from "@builder.io/qwik-city";
import { RouterHead } from "~/components/router-head/router-head";

import "~/styles/global.css";
import { QwikPartytown } from "./components/partytown/partytown";

export default component$(() => {
  const GA_MEASUREMENT_ID = "G-ZM24XR3CYH";
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
        <QwikPartytown forward={["dataLayer.push"]} />
        <script
          async
          type="text/partytown"
          nonce={nonce}
          dangerouslySetInnerHTML={`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;var n=d.querySelector('[nonce]');n&&j.setAttribute('nonce',n.nonce||n.getAttribute('nonce'));f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GA_MEASUREMENT_ID}');`}
        />
        <meta name="theme-color" content="#b1d5ff" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials" />
        <link rel="preconnect" href="https://storage.ephy.dev" />
        <RouterHead />
      </head>
      <body lang="ja" class="text-secondary-500 min-h-screen bg-white antialiased">
        <RouterOutlet />
        <ServiceWorkerRegister nonce={nonce} />
      </body>
    </QwikCityProvider>
  );
});
