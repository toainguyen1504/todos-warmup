import type { Metadata } from "next";

import "./globals.css";
import AppSidebar from "@/components/app.sidebar";

export const metadata: Metadata = {
  title: "Todo list",
  description: "Create Tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-[family-name:var(--font-geist-sans)]">
      <body>
        <div className="h-screen flex justify-center">
          {/* Sidebar */}
          <div className="sidebar-container lg:flex hidden">
            <AppSidebar />
          </div>

          {/* Container */}
          <div className="flex-1 container mx-auto bg-white">{children}</div>
        </div>
      </body>
    </html>
  );
}
