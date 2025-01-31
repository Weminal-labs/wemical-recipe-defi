import React from "react";
import ReactDOM from "react-dom/client";
import "@mysten/dapp-kit/dist/index.css";
import "./index.css";

import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme } from "@radix-ui/themes";
import App from "./App.tsx";
import { networkConfig } from "./networkConfig.ts";
import { RecipeManagement } from "./pages/recipe/RecipeManagement.tsx";
import { Home } from "./pages/Home.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecipeLayout } from "./pages/RecipeLayout.tsx";
import { Dashboard } from "./pages/Dashboard.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme appearance="dark">
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
          <WalletProvider autoConnect>
            <BrowserRouter>
              <Routes>
                <Route index element={<Home />} />
                <Route path="explore" element={<RecipeLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="recipe" element={<RecipeManagement />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </Theme>
  </React.StrictMode>,
);
