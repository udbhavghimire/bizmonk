import Gallery from "@/components/Gallery";
import Link from "next/link";
import { commercial } from "@/api/routes/fetchRoutes";
import MapSection from "@/components/MapSection";
import PropertyPage from "@/components/PropertyPage";
import BookingDate from "@/components/BookingDate";
import FAQ from "@/components/FAQ";
import Breadcrumb from "@/components/Breadcrumb";
import CreateSchema from "@/helpers/CreateSchema";
import { slugGenerator } from "@/helpers/slugGenerator";
import PriceButton from "@/components/PriceButton";
import formatCurrency from "@/helpers/formatCurrency";
import TimeAgo from "@/helpers/TimeAgo";
import cities from "@/data/gta-cities.json";
import StickyContactForm from "@/components/StickyContactForm";
import { fetchMedia } from "@/api/getImageUrls";
const INITIAL_OFFSET = 0;
const INITIAL_LIMIT = 3;

const fetchData = async (listingID) => {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN_FOR_API}`,
        Accept: "application/json",
      },
      cache: "no-store", // Disable caching to get fresh data
    };

    // Extract ListingKey from the URL and convert to uppercase
    const listingKey = listingID.split("-").pop().toUpperCase();

    // Use the correct OData syntax with quotes around the ListingKey
    const urlToFetchMLSDetail = `${commercial.properties}?$filter=ListingKey eq '${listingKey}'`;

    const response = await fetch(urlToFetchMLSDetail, options);

    if (!response.ok) {
      console.error("Response not OK:", response.status, response.statusText);
      const errorText = await response.text();
      console.error("Error details:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.value || data.value.length === 0) {
      console.error("No data found for ListingKey:", listingKey);
      throw new Error("No listing found");
    }

    return data.value[0];
  } catch (error) {
    console.error("Error fetching listing:", error);
    return null;
  }
};

const page = async ({ params }) => {
  try {
    const { city, listingID } = await Promise.resolve(params);
    const cityName = await Promise.resolve(city.split("-")[0]);
    const properCityName = await Promise.resolve(
      cities.cities.find((c) => c.toLowerCase() === cityName.toLowerCase()) ||
        cityName,
    );

    const listingKey = await Promise.resolve(listingID.split("-").pop());
    const main_data = await fetchData(listingKey);
    if (!main_data) {
      throw new Error("Listing not found");
    }
    // Fetch media images for this listing
    const mediaImages = await fetchMedia(main_data.ListingKey, 20);

    // Add them to main_data so client can use them
    main_data.media = mediaImages;

    const breadcrumbItems = [
      { label: "Home", href: "/" },
      { label: properCityName, href: `/${cityName.toLowerCase()}` },
      {
        label: `${main_data.StreetNumber} ${main_data.StreetName}`,
        href: "#",
      },
    ];

    const address = [
      main_data?.StreetNumber,
      main_data?.StreetName,
      main_data?.StreetSuffix,
    ]
      .filter(Boolean)
      .join(" ");

    const formattedPrice = formatCurrency(main_data?.ListPrice);

    return (
      <>
        <div className="min-h-screen bg-gray-50 pb-12">
          {/* Schema Markup */}
          <script
            key={main_data.ListingKey}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(CreateSchema(main_data)),
            }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 -mt-4">
            {/* Breadcrumb - Clean & Simple */}
            <div className="mb-6">
              <Breadcrumb items={breadcrumbItems} />
            </div>

            <section className="flex flex-col gap-8">
              {/* Gallery Section */}
              <div className="w-full rounded-2xl overflow-hidden shadow-sm bg-white">
                <Gallery mediaImages={mediaImages} />
              </div>

              {/* Property Header (Desktop: Row, Mobile: Col) */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {main_data.StreetNumber} {main_data.StreetName}{" "}
                    {main_data.StreetSuffix}
                  </h1>
                  <p className="text-gray-500 text-lg mt-1">
                    {main_data.City}, {main_data.StateOrProvince}{" "}
                    {main_data.PostalCode}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border border-emerald-100">
                      {main_data.TransactionType || "For Sale"}
                    </span>
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide border border-blue-100">
                      {main_data.PropertySubType}
                    </span>
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold border border-gray-200 flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-3 h-3"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75l4 4a.75.75 0 101.06-1.06l-3.25-3.25V5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <TimeAgo
                        modificationTimestamp={main_data.ModificationTimestamp}
                      />
                    </span>
                  </div>
                </div>
                <div className="text-left lg:text-right">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                    {formattedPrice}
                  </h2>
                  {main_data.ListPriceLow && (
                    <p className="text-gray-500 text-sm mt-1">
                      Est. Monthly: {formatCurrency(main_data.ListPriceLow)}/mo
                    </p>
                  )}
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Left Content (Detail) */}
                <div className="lg:col-span-8 flex flex-col space-y-10">
                  {/* Property Details Component */}
                  <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                    <PropertyPage {...{ main_data }} hideHeader={true} />
                  </div>

                  {/* Booking Date (if needed inline) */}
                  {/* <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                     <BookingDate listingId={main_data.ListingKey} image={mediaImages?.[0]?.MediaURL} />
                  </div> */}

                  {/* Map Section */}
                  <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white p-1">
                    <MapSection main_data={main_data} />
                  </div>

                  {/* FAQ */}
                  <div className="mt-4">
                    <FAQ main_data={main_data} />
                  </div>
                </div>

                {/* Right Sidebar (Sticky) */}
                <div className="lg:col-span-4 relative">
                  <div className="sticky top-24 space-y-6">
                    <StickyContactForm listingData={main_data} />

                    {/* Tiny Mortgage calc or extra CTA could go here */}
                  </div>
                </div>
              </div>

              {/* Mobile Fixed Bottom Bar (Optional, if we want strict mobile responsiveness for conversion) */}
              <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-50 flex items-center justify-between gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div>
                  <p className="text-xs text-gray-500">Price</p>
                  <p className="text-lg font-bold text-gray-900">
                    {formattedPrice}
                  </p>
                </div>
                <a
                  href="#contactform"
                  className="bg-black text-white px-6 py-3 rounded-xl font-semibold shadow-lg active:scale-95 transition-transform"
                >
                  Contact Agent
                </a>
              </div>
            </section>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error in page:", error);
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-md mx-4">
          <div className="bg-red-50 text-red-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008h-.008v-.008z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Listing Not Found
          </h1>
          <p className="text-gray-500 mb-6">
            The listing you're looking for might have been removed or is
            temporarily unavailable.
          </p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-6 py-2.5 rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }
};

export async function generateMetadata({ params }, parent) {
  try {
    const { city, listingID } = await Promise.resolve(params);
    const listingKey = await Promise.resolve(listingID.split("-").pop());
    const main_data = await fetchData(listingKey);

    if (!main_data) {
      return {
        title: "Listing Not Found",
        description: "The requested listing could not be found",
      };
    }

    const metadata = {
      title:
        main_data?.StreetNumber && main_data?.StreetName
          ? `${main_data.StreetNumber} ${main_data.StreetName} ${
              main_data.StreetSuffix || ""
            }`
          : "Property Listing",
      description:
        main_data?.PropertySubType &&
        main_data?.City &&
        main_data?.StateOrProvince
          ? `${main_data.PropertySubType} in ${main_data.City}, ${main_data.StateOrProvince}`
          : "Property Listing Details",
      alternates: {
        canonical: `https://commercialspot.ca/${city}/${slugGenerator(
          main_data,
        )}`,
      },
    };

    // Only add openGraph if we have valid image URLs
    if (main_data?.PhotoCount && main_data.PhotoCount > 0) {
      metadata.openGraph = {
        images: [main_data.PhotoURLs[0]],
      };
    }

    return metadata;
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Property Listing",
      description: "View property listing details",
    };
  }
}

export default page;
