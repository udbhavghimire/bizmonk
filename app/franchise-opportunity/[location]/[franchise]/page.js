import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocationContent, franchiseLocations } from "@/data/franchise-data";
import Newsletter from "@/components/Newsletter";
import HeroSection from "./_components/HeroSection";
import RelatedFranchises from "./_components/RelatedFranchises";
import ExploreMoreCities from "./_components/ExploreMoreCities";
import ContactForm from "./_components/ContactForm";
import { Suspense } from "react";
import VideoSection from "./_components/VideoSection";

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

        {/* Video Section - Will only show for franchises with video */}
        <VideoSection videoUrl={franchiseData.video} />

        {/* Contact Form Section */}
        <Suspense fallback={<div>Loading contact form...</div>}>
          {console.log(franchise.image)}
          <ContactForm
            contactImage={
              franchiseData?.contactImage
                ? franchiseData?.contactImage
                : franchiseData?.image
            }
            pageName={franchiseData.name}
          />
        </Suspense>

        {/* Related Franchises Section */}
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
export async function generateMetadata({ params }, parent) {
  const { location, franchise } = await params;
  try {
    const locationText = location
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    const locationData = getLocationContent(location);
    const franchiseData = locationData.franchises.find(
      (f) =>
        f.name.toLowerCase().replace(/\s+/g, "-").replace(/'/g, "") ===
        franchise
    );

    const metadata = {
      title: franchiseData.name + " Franchise Opportunity in " + locationText,
      description: `${franchiseData.name} franchise opportunities now available in ${locationText}. Start your own successful business with expert guidance and a trusted brand.
`,
    };
    return metadata;

    if (!franchiseData) {
      notFound();
    }
  } catch (err) {
    console.log(err);
  }
}
