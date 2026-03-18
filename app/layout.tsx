import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Special Message For You ❤️",
  description: "A birthday surprise with love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-background text-foreground selection:bg-rose-100">
        {children}
      </body>
    </html>
  );
}
