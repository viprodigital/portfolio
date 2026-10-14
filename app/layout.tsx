import type { Metadata, Viewport } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B1120",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ruban-portfolio.dev"),
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  title: {
    default: "Ruban — Network Engineer, Systems Architect & AI Strategist",
    template: "%s | Ruban",
  },
  description:
    "I build scalable frameworks, Network solutions, and AI-powered workflows to deliver reliable, high-quality software. 2.5+ years of enterprise experience with Cisco, Windows, Linux, Firewalls, AWS Cloud, and AI systems.",
  keywords: [
    "Ruban",
    "Network Engineer",
    "System Engineer",
    "Systems Engineering",
    "Cisco",
    "Windows Server",
    "Linux Administration",
    "Firewall Management",
    "AWS Cloud",
    "Active Directory",
    "VMware Virtualization",
    "TypeScript",
    "DevOps",
  ],
  authors: [{ name: "Ruban", url: "https://ruban-portfolio.dev" }],
  creator: "Ruban",
  publisher: "Ruban",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ruban-portfolio.dev",
    siteName: "Ruban Portfolio",
    title: "Ruban — Network Engineer & Systems Architect",
    description:
      "I build scalable frameworks, Network solutions, and AI-powered workflows to deliver reliable, high-quality software.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ruban — Network Engineer & Systems Architect Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ruban — Network Engineer & Systems Architect",
    description:
      "I build scalable frameworks, Network solutions, and AI-powered workflows to deliver reliable, high-quality software.",
    creator: "@ruban_tech",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://ruban-portfolio.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${firaCode.variable} font-sans bg-background text-white antialiased selection:bg-primary selection:text-white min-h-screen relative`}
      >
        {children}
      </body>
    </html>
  );
}
