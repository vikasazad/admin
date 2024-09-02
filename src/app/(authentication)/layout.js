"use client";
import ThemeCustomization from "../themes/index";
import store from "../app/store";
import { Provider } from "react-redux";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider store={store}>
        <AppRouterCacheProvider>
          <ThemeCustomization>
            <body>{children}</body>
          </ThemeCustomization>
        </AppRouterCacheProvider>
      </Provider>
    </html>
  );
}
