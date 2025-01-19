import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocationContent, franchiseLocations } from "@/data/franchise-data";
import Newsletter from "@/components/Newsletter";
import HeroSection from "./_components/HeroSection";
import RelatedFranchises from "./_components/RelatedFranchises";
import ExploreMoreCities from "./_components/ExploreMoreCities";
import ContactForm from "./_components/ContactForm";

export default async function FranchiseDetailPage({ params }) {
  const { location, franchise } = await params;

  try {
    const locationData = getLocationContent(location);
    const franchiseData = locationData.franchises.find(
      (f) =>
        f.name.toLowerCase().replace(/\s+/g, "-").replace(/'/g, "") ===
        franchise
    );

    if (!franchiseData) {
      notFound();
    }

    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection franchiseData={franchiseData} location={location} />

        {/* Related Franchises Section */}
        <ContactForm contactImage={franchiseData.contactImage} />
        <RelatedFranchises
          franchiseData={franchiseData}
          locationData={locationData}
          location={location}
        />
        {/* Explore More Cities Section */}
        <ExploreMoreCities
          franchise={franchise}
          franchiseData={franchiseData}
        />

        <Newsletter />
      </div>
    );
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  return Object.entries(franchiseLocations).flatMap(([location, data]) =>
    data.franchises.map((franchise) => ({
      location,
      franchise: franchise.name.toLowerCase().replace(/['\s]+/g, "-"),
    }))
  );
}
