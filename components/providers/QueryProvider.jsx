"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function QueryProvider({ children }) {
  // Use state to ensure each browser tab gets its own instance
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // cache for 1 min
            refetchOnWindowFocus: false, // Don't spam API on focus change
             retry: 1, // Optional: retry once on failure
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Devtools only in development mode */}
      {process.env.NODE_ENV === "development" && (
         <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
