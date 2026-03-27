import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ethux.design · generative design system",
  description: "Input a contract address. See which Ethereum UX problem framings apply. Get generated design system components.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#080808] text-zinc-200">
        <header className="border-b border-zinc-900 sticky top-0 z-50 bg-[#080808]/80 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-6 h-12 flex items-center justify-between">
            <a href="/" className="text-sm font-semibold text-zinc-200 hover:text-white transition-colors">
              ethux.design
              <span className="text-zinc-700 font-normal"> / gen-ds</span>
            </a>
            <nav className="flex items-center gap-6 text-sm">
              <a href="/framings" className="text-zinc-500 hover:text-zinc-200 transition-colors">
                Problem Framings
              </a>
              <a
                href="/generate"
                className="text-zinc-200 bg-violet-600/20 border border-violet-500/30 hover:bg-violet-600/30 transition-colors px-3 py-1 rounded-lg text-xs font-mono"
              >
                Generate UI
              </a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-900 py-6">
          <div className="max-w-4xl mx-auto px-6 flex items-center justify-between text-xs text-zinc-700">
            <span>ethux.design · generative design system · proof of concept</span>
            <span className="font-mono">March 2026</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
