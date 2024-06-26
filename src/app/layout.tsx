import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/context/User";
import LayoutCommon from "@/components/Layout/LayoutCommon";
import Navbar from "@/components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <html lang="en">
        <body>
          <LayoutCommon children={children} />
        </body>
      </html>
    </UserProvider>
  );
}
