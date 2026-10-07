import type { ReactNode } from "react";

import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import MainContent from "@/src/components/layout/MainContent";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <MainContent>{children}</MainContent>

      <Footer />
    </div>
  );
}
