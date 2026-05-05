import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ivanne Obediente | Portfolio",
  description:
    "Aspiring developer based in the Philippines — design, UI/UX, and visual storytelling.",
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
