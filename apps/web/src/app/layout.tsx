import type { Metadata } from "next";
import Providers from "./providers";
import "@repo/tailwind-config/global.css";

export const metadata: Metadata = {
  title: "Ezifind",
  description: "Luxury property finder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
