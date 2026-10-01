import type { Metadata } from "next";
import "./globals.css";
import { Archivo } from "next/font/google";
import AppProviders from "../providers/AppProviders";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "Kino XII",
  description: "Cinema ticket booking platform",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable}  h-full antialiased`}>
      <body className="min-h-full flex flex-col font-archivo">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
