import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { profile } from "@/lib/data";
import "./globals.css";

const headingFont = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${profile.fullName} | ${profile.headline}`,
  description:
    "Premium, animated portfolio website built with Next.js, Tailwind CSS, and Framer Motion.",
  keywords: [
    profile.fullName,
    profile.headline,
    "Next.js Portfolio",
    "Frontend Engineer",
    "Framer Motion",
  ],
  openGraph: {
    title: `${profile.fullName} | ${profile.headline}`,
    description:
      "Premium, animated portfolio website built with Next.js, Tailwind CSS, and Framer Motion.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${headingFont.variable} ${bodyFont.variable} min-h-full bg-background text-foreground antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
