"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import ThemeCustomization from "../themes/index";
import store from "../app/store";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <SessionProvider>
            <AppRouterCacheProvider>
              <ThemeCustomization>
                {children}
                <Toaster />
              </ThemeCustomization>
            </AppRouterCacheProvider>
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
