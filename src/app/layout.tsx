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
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip font-archivo">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
