import type { Metadata } from "next";
import "./globals.css";
import AppHeader from "@/components/app.header";
import AppFooter from "@/components/app.footer";

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
    <html lang="en">
      <body>
        <AppHeader />
        {children}
        <AppFooter />
      </body>
    </html>
  );
}
