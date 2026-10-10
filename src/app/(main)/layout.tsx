import type { ReactNode } from "react";

import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className={"min-w-0 flex-1 "}>{children}</main>

      <Footer />
    </div>
  );
}
