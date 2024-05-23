import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saga Scholarships",
  description:
    "Receive an American degree. Play the sport you love. Create unforgettable memories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className=" scroll-smooth overflow-x-hidden">
      <body
        className={cn(
          "antialiased grainy bg-white select-none",
          inter.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
