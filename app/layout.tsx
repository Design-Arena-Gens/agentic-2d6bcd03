import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gold Market Trading Assistant",
  description: "Professional XAU/USD analysis and trading insights",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
