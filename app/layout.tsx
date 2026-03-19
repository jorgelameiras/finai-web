import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinAI - Smart Financial Management",
  description: "AI-powered personal finance dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.className = theme;
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
