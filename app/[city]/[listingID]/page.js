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

const INITIAL_OFFSET = 0;
const INITIAL_LIMIT = 3;

const fetchData = async (listingID) => {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: process.env.BEARER_TOKEN_FOR_API,
        "Content-Type": "application/json",
      },
      cache: "no-store", // Disable caching to get fresh data
    };

    // Extract ListingKey from the URL and convert to uppercase
    const listingKey = listingID.split("-").pop().toUpperCase();

    // Use the correct OData syntax with quotes around the ListingKey
    const urlToFetchMLSDetail = `${commercial.properties}?$filter=ListingKey eq '${listingKey}'`;

    console.log("Fetching from URL:", urlToFetchMLSDetail); // Debug log

    const response = await fetch(urlToFetchMLSDetail, options);

    if (!response.ok) {
      console.error("Response not OK:", response.status, response.statusText);
      const errorText = await response.text();
      console.error("Error details:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data); // Debug log

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
        cityName
    );

    const listingKey = await Promise.resolve(listingID.split("-").pop());
    const main_data = await fetchData(listingKey);

    if (!main_data) {
      throw new Error("Listing not found");
    }

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

    return (
      <>
        <div className="flex justify-between max-w-7xl mx-auto px-4">
          <div className="w-full">
            <div>
              <script
                key={main_data.ListingKey}
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(CreateSchema(main_data)),
                }}
              />
              <div className="pt-md-3 pt-0">
                <div className="sticky top-0 z-[999]">
                  <Breadcrumb items={breadcrumbItems} />
                </div>
                <section className="padding-top w-full text-sm flex flex-col items-center justify-center gy-2 relative">
                  <div className="w-full relative">
                    <Gallery
                      ResourceRecordKey={main_data?.ListingKey || null}
                    />
                    <div className="space-x-2 order-2 sm:order-1 absolute bottom-2 left-2">
                      <button className="bg-green-900 p-1 text-white text-xs font-bold mt-1 mb-2 sm:my-0 w-fit-content rounded-md">
                        <TimeAgo
                          modificationTimestamp={
                            main_data.ModificationTimestamp
                          }
                        />
                      </button>
                      <button className="bg-green-900 p-1 text-white text-xs font-bold mt-1 mb-2 sm:my-0 w-fit-content rounded-md">
                        <span>{main_data.TypeOwn1Out}</span>
                      </button>
                    </div>
                  </div>

                  {/* Main Content with Sticky Form */}
                  <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 pt-0 sm:pt-4">
                    {/* Left Content */}
                    <div className="lg:col-span-2 col">
                      <PropertyPage {...{ main_data }} />
                      <BookingDate listingId={main_data.ListingKey} />
                      <MapSection main_data={main_data} />
                      <div className="mt-24 mb-10">
                        <FAQ main_data={main_data} />
                      </div>
                    </div>

                    {/* Right Sticky Form */}
                    <div id="contact-form" className="lg:col-span-1 col">
                      <StickyContactForm listingData={main_data} />
                    </div>
                  </div>

                  <PriceButton price={formatCurrency(main_data?.ListPrice)} />
                </section>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error in page:", error);
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Error Loading Listing
          </h1>
          <p className="text-gray-600">
            The listing you're looking for could not be found.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
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
          main_data
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
