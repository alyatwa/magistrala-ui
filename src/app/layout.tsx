import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import "./theme.css";
import { fontVariables } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ActiveThemeProvider } from "@/components/active-theme";
import { LayoutProvider } from "@/hooks/use-layout";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "CTX AI Solutions",
  description:
    "CTX AI Solutions is a leading provider of AI-powered IoT solutions, specializing in intelligent automation for industries like oil & gas, finance, and manufacturing. Our platform transforms raw device data into actionable insights, enabling seamless device management and predictive analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link type="image/png" sizes="32x32" rel="icon" href="/cloud.png" />
      </head>
      <body
        className={cn(
          `text-foreground group/body overscroll-none font-sans antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]`,
          fontVariables
        )}
      >
        <ThemeProvider>
          <LayoutProvider>
            <ActiveThemeProvider>
              {children}
              {/* <TailwindIndicator />    */}
              <Toaster position="top-center" />
            </ActiveThemeProvider>
          </LayoutProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
