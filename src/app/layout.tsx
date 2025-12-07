import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">{children}</body>
    </html>
  );
}
