import { LiquidHeader } from "@/components/chrome/LiquidHeader";
import { Footer } from "@/components/chrome/Footer";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <OrganizationJsonLd />
      <LiquidHeader />
      <main className="relative">{children}</main>
      <Footer />
    </>
  );
}
