import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MobilWorth Indonesia",
  description: "Used car price estimator for the Indonesian market.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
