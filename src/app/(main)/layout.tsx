import { ReactNode } from "react";
import Footer from "@/src/components/layout/Footer";
import Header from "@/src/components/layout/Header";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
