import type { Metadata } from "next";
import "./globals.css";
// import AppHeader from "@/components/app.header";
// import AppFooter from "@/components/app.footer";
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
        {/* <AppHeader /> */}

        <div className="h-screen flex justify-center">
          <AppSidebar />
          <div className="flex-1 container mx-auto bg-white">{children}</div>
        </div>

        {/* <AppFooter /> */}
      </body>
    </html>
  );
}
