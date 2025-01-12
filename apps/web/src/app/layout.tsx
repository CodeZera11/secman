import type { Metadata } from "next";
import Providers from "./providers";
import "@repo/tailwind-config/global.css";

export const metadata: Metadata = {
  title: "Web Toolbox",
  description: "A collection of tools for web development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      className="h-screen bg-neutral-900"
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
