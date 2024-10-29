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
        <header className="bg-gray-300 p-4">
          <h3>Header</h3>
        </header>
        {children}
        <footer>
          <h3 className="bg-gray-300 p-4">Footer</h3>
        </footer>
      </body>
    </html>
  );
}
