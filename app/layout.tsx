import type { Metadata, Viewport } from "next";
import {
  Fraunces,
  Inter_Tight,
  JetBrains_Mono,
  Sacramento,
} from "next/font/google";
import { SITE_URL } from "@/lib/utils";
import { SmoothScroll } from "@/components/chrome/SmoothScroll";
import { ConciergeProvider } from "@/components/intake/ConciergeProvider";
import { FirstVisitPrompt } from "@/components/intake/FirstVisitPrompt";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

const signature = Sacramento({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-signature",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Studio A by Nancy - Bespoke Interior Design",
    template: "%s - Studio A by Nancy",
  },
  description:
    "An interior design studio crafting residential and commercial spaces with refined detail, architectural restraint, and a personal concierge approach.",
  openGraph: {
    type: "website",
    siteName: "Studio A by Nancy",
    url: SITE_URL,
    title: "Studio A by Nancy - Bespoke Interior Design",
    description:
      "An interior design studio crafting residential and commercial spaces with refined luxury and architectural restraint.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio A by Nancy",
    description:
      "Bespoke residential and commercial interior design - concierge from concept to installation.",
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F7F4EE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${interTight.variable} ${jetbrains.variable} ${signature.variable}`}
    >
      <body className="bg-canvas text-ink antialiased">
        <SmoothScroll>
          <ConciergeProvider>
            {children}
            <FirstVisitPrompt />
          </ConciergeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
