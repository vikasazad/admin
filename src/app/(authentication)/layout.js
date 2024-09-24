"use client";
import ThemeCustomization from "../themes/index";
import store from "../app/store";
import { Provider } from "react-redux";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <Provider store={store}>
        <SessionProvider session={session}>
          <AppRouterCacheProvider>
            <ThemeCustomization>
              <body>
                {children}
                <Toaster />
              </body>
            </ThemeCustomization>
          </AppRouterCacheProvider>
        </SessionProvider>
      </Provider>
    </html>
  );
}
