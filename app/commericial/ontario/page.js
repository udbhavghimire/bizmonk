import OntarioCitiesGrid from "@/components/OntarioCitiesGrid";

export const metadata = {
  title:
    "Explore Restaurants, Convenience Stores, and Commercial Spaces in GTA | Bizmonk",
  description:
    "Discover prime commercial real estate opportunities in the Greater Toronto Area. Search for restaurants, convenience stores, and commercial spaces tailored for your business needs. Perfect for entrepreneurs and investors in the GTA market.",
};
const page = async () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4">
        <OntarioCitiesGrid />
      </div>
    </div>
  );
};

export default page;
