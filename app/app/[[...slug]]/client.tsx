"use client";

import { Auth0Provider } from "@auth0/auth0-react";
import dynamic from "next/dynamic";
import React from "react";

const App = dynamic(() => import("../../src/pages/App"), { ssr: false });

export function ClientOnly() {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN ?? ""}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID ?? ""}
    >
      <App />;
    </Auth0Provider>
  );
}
