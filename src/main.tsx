import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Providers from "@/providers";
import { ResponsiveLayout } from "@/responsive-layout";
import { AppRoutes } from "@/router";
import "./globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Providers>
        <ResponsiveLayout>
          <AppRoutes />
        </ResponsiveLayout>
      </Providers>
    </BrowserRouter>
  </React.StrictMode>,
);
