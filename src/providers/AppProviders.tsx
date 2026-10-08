"use client";

import type { ReactNode } from "react";

import QueryProvider from "../lib/query/QueryProvider";
import AuthProvider from "./AuthProvider";

type AppProvidersProps = {
  children: ReactNode;
};

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
}
