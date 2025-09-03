import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@ant-design/v5-patch-for-react-19";

import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 6,
      gcTime: 1000 * 60 * 5, // Updated from cacheTime
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>
);
