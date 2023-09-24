import Header from "@/app/components/header";
import { Inter } from 'next/font/google'
import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/app/components/footer";
 
const inter = Inter({
  variable: '--font-inter',
  preload: false,
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

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
    <html lang="zh" className="inter.variable">
      <body className="text-base">
        <div className="max-w-3xl mx-auto px-2">
          <Header />
          <main className="bg-white">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
