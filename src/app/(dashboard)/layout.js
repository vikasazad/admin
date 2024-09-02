"use client";
import { useEffect } from "react";

// material-ui
import useMediaQuery from "@mui/material/useMediaQuery";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

// project import
import Drawer from "./Drawer";
import Header from "./Header";
import navigation from "../menu-items/index";
import Loader from "../components/Loader";
import Breadcrumbs from "../components/@extended/Breadcrumbs";
import ThemeCustomization from "../themes/index";
import "./globals.css";
import ScrollTop from "../components/ScrollTop";
import { handlerDrawerOpen, useGetMenuMaster } from "../api/menu";
import { createTheme, ThemeProvider } from "@mui/system";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import store from "../app/store";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// ==============================|| MAIN LAYOUT ||============================== //

export default function DashboardLayout({ children }) {
  const theme = createTheme();
  const { menuMasterLoading } = useGetMenuMaster();
  const downXL = useMediaQuery(theme.breakpoints.down("xl"));

  useEffect(() => {
    handlerDrawerOpen(!downXL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downXL]);

  if (menuMasterLoading) return <Loader />;

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AppRouterCacheProvider>
              <ThemeCustomization>
                <ScrollTop>
                  <Box sx={{ display: "flex", width: "100%" }}>
                    <Header />
                    <Drawer />
                    <Box
                      component="main"
                      sx={{
                        width: "calc(100% - 260px)",
                        flexGrow: 1,
                        p: { xs: 2, sm: 3 },
                        height: "100vh",
                        overflowY: "auto",
                      }}
                    >
                      <Toolbar />
                      <Breadcrumbs navigation={navigation} title />
                      {children}
                    </Box>
                  </Box>
                </ScrollTop>
              </ThemeCustomization>
            </AppRouterCacheProvider>
          </LocalizationProvider>
        </Provider>
      </body>
    </html>
  );
}
