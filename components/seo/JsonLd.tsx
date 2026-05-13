import { SITE_URL } from "@/lib/utils";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "InteriorDesigner",
    name: "Studio A by Nancy",
    url: SITE_URL,
    description:
      "Bespoke residential and commercial interior design - concierge from concept to installation.",
    areaServed: ["New York", "Los Angeles", "Aspen"],
    sameAs: [
      "https://www.instagram.com/",
      "https://www.pinterest.com/",
      "https://www.houzz.com/",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Project inquiries",
      email: "studio@studioabynancy.com",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
