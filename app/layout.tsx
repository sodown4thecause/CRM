import type { Metadata } from "next";
import "./index.css";

export const metadata: Metadata = {
  title: "CRM with AI Assistant",
  description: "Modern CRM powered by AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
