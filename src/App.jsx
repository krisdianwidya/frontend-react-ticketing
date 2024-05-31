import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Layout from "./pages/Layout";

const Login = React.lazy(() => import("./pages/Login"));
const Home = React.lazy(() => import("./pages/Overview"));
const TicketListing = React.lazy(() => import("./pages/TicketListing"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<React.Suspense fallback={<>...</>}><Home /></React.Suspense>}
          />
          <Route
            path="tickets"
            element={<React.Suspense fallback={<>...</>}><TicketListing /></React.Suspense>}
          />
        </Route>
        <Route
          path="login"
          element={
            <React.Suspense fallback={<>...</>}>
              <Login />
            </React.Suspense>
          }
        />

      </Routes>
    </QueryClientProvider>
  )
}

export default App
