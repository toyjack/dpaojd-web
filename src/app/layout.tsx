import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "辞書序跋データベース（仮）",
  description: "日本の辞書における序跋文を収集・検索できるデータベースです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hero mb-8">
            <div className="hero-content text-center">
              <div className="max-w-4xl">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
                  辞書序跋データベース（仮）
                </h1>
                <p className="text-secondary font-light">
                  Dictionary Prefaces and Afterwords Database of Japanese
                  Dictionaries (Provisional)
                </p>
                <div className="divider divider-primary w-24 mx-auto" />
              </div>
            </div>
          </div>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
