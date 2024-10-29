import type { Metadata } from "next";
import "./globals.css";

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
        <header>
          <h3 style={{ backgroundColor: "#ccc" }}>Header</h3>
        </header>
        {children}
        <footer>
          <h3 style={{ backgroundColor: "#ccc" }}>Footer</h3>
        </footer>
      </body>
    </html>
  );
}
