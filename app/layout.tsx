import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import Nav from "@/components/home-page/nav";

const font = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Travel",
  description: "Plan your next trip",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <div className="relative">
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}
