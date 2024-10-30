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
    <html lang="en">
      <body>
        {/* <AppHeader /> */}
        <div className="flex">
          <AppSidebar />
          <div className="flex-1 bg-white"> {children}</div>
        </div>

        {/* <AppFooter /> */}
      </body>
    </html>
  );
}
