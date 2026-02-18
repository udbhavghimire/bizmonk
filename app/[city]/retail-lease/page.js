import citiesData from "@/data/gta-cities.json";
import { notFound } from "next/navigation";
import ResaleCard from "@/components/ResaleCard";
import Link from "next/link";
import { cities } from "@/constant/cities";
import ClientFilter from "@/components/ClientFilter";
import ClientPagination from "@/components/ClientPagination";
import { getOfficeListings } from "@/api/getBusinessListings";

const { cities: gtaCities } = citiesData;

// Convert to a server component
export default async function CityOffices({ params, searchParams }) {
  const { city } = params;
  const propertyTypeSlug = searchParams.type;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  if (!city) {
    notFound();
  }

  const cityExists = gtaCities.find(
    (c) => c.toLowerCase() === city.toLowerCase()
  );
  const cityUrl = city.toLowerCase();

  if (!cityExists) {
    notFound();
  }

  // Function to convert slug back to display name
  const getDisplayNameFromSlug = (slug) => {
    if (!slug) return null;

    const displayMap = {
      "medical-dental": "Medical/Dental",
      "professional-office": "Professional Office",
      industrial: "Industrial",
      warehouse: "Warehouse",
      retail: "Retail",
    };

    return displayMap[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
  };

  // Get the display name for the property type
  const propertyType = getDisplayNameFromSlug(propertyTypeSlug);

  // Fetch data server-side
  const listings = await getOfficeListings({
    city: city,
  });

  // Filter listings based on property type if provided
  let filteredListings = listings;
  if (propertyType && propertyType !== "All Properties") {
    filteredListings = listings.filter((listing) => {
      return (
        listing.BusinessType && listing.BusinessType.includes(propertyType)
      );
    });
  }

  // For server-side rendering with pagination
  const currentPage = page;
  const itemsPerPage = 20;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredListings?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredListings?.length / itemsPerPage);

  const breadcrumbItems = [
    {
      label: cityExists,
      href: `/${cityUrl}`,
    },
    {
      label: propertyType || "Retail Lease",
    },
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto">
        {/* <Breadcrumb items={breadcrumbItems} /> */}

        <h1 className="text-3xl font-bold text-gray-900">
          {propertyType
            ? `${propertyType} Properties`
            : "Commercial Properties for Lease"}{" "}
          in {cityExists}
        </h1>
        <p className="text-sm mb-4">
          {filteredListings?.length}+ {cityExists} properties for lease.
          {propertyType ? ` Filtered by ${propertyType}.` : ""}
          Prices from $1 to $5,000,000. Open houses available.
        </p>

        {/* Use a client component wrapper for Filter */}
        <ClientFilter cityUrl={cityUrl} />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {currentItems.map((listing) => (
            <ResaleCard curElem={listing} key={listing.ListingKey} />
          ))}
        </div>

        {filteredListings?.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {propertyType
              ? `No ${propertyType} properties found in this area.`
              : "No listings found."}
          </div>
        )}

        {filteredListings?.length > 0 && (
          <ClientPagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl={`/${cityUrl}/retail-lease`}
          />
        )}

        {/* Cities Section */}
        <div className="py-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Business Properties for sale in your city
            </h2>
            <p className="text-lg text-gray-600">
              Explore top cities across Canada
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities?.map((city) => (
              <Link
                key={city.name}
                href={`/${city.name.toLowerCase()}`}
                className="group relative rounded-lg overflow-hidden aspect-[4/3]"
              >
                <img
                  src={city.image}
                  alt={`${city.name} cityscape`}
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                  {city.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
