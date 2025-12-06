import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "社区成员名录",
  description: "社区成员信息收集和管理系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
