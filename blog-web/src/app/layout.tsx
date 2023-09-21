import Header from "@/app/components/header";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Web",
  description: "博客",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className="relative bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% overscroll-none">
        <Header />
        <main className="p-10">{children}</main>
      </body>
    </html>
  );
}
