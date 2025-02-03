import dynamic from "next/dynamic";
import Gallery from "@/components/Gallery";
import Link from "next/link";
import { commercial } from "@/api/routes/fetchRoutes";
import { generateImageURLs } from "@/helpers/generateImageURLs";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
// import {
//   fetchDataFromMLS,
//   // fetchStatsFromMLS,
//   getSalesData,
// } from "../../../../../api/getSalesData";
import BookShowingForm from "@/components/BookShowingForm";
import MapSection from "@/components/MapSection";
import PropertyPage from "@/components/PropertyPage";
import BookingDate from "@/components/BookingDate";
import FAQ from "@/components/FAQ";
import MortgageCalculator from "@/components/MortgageCalculator";
import Image from "next/image";
import Slider from "@/components/Slider";
import Breadcrumb from "@/components/Breadcrumb";
import CreateSchema from "@/helpers/CreateSchema";
import { slugGenerator } from "@/helpers/slugGenerator";
import PropertyDisplaySection from "@/components/PropertyDisplaySection";
import PriceButton from "@/components/PriceButton";
import formatCurrency from "@/helpers/formatCurrency";
import Carousel from "@/components/Carousel";
import { generateURL } from "@/helpers/generateURL";
import MobileGallery from "@/components/MobileGallery";
import Thumbnails from "@/components/Thumbnails";
import TimeAgo from "@/helpers/TimeAgo";
import cities from "@/data/gta-cities.json";
// import { houseType } from "@/constant";
// import { Button } from "@nextui-org/react";

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
    // Get city and listing ID from params
    const { city, listingID } = params;

    // Process city name
    const cityName = city.split("-")[0]; // Only take the first part before any dash
    // Find the matching city from our list (case-insensitive)
    const properCityName =
      cities.cities.find((c) => c.toLowerCase() === cityName.toLowerCase()) ||
      cityName;

    // Get listing data
    const listingKey = listingID.split("-").pop();
    const main_data = await fetchData(listingKey);

    if (!main_data) {
      throw new Error("Listing not found");
    }

    const imageURLs = generateImageURLs(
      listingKey,
      parseInt(main_data?.PhotoCount || 0)
    );

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
        <div className="flex justify-center sm:max-w-[68%] mx-auto">
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
                <div className="hidden sm:block relative">
                  <Gallery ResourceRecordKey={main_data.ListingKey} />
                  <div className="space-x-2 order-2 sm:order-1 absolute bottom-2 left-2">
                    <button className="bg-green-900 p-1 text-white text-xs font-bold mt-1 mb-2 sm:my-0 w-fit-content rounded-md">
                      <TimeAgo
                        modificationTimestamp={main_data.ModificationTimestamp}
                      />
                    </button>
                    <button className="bg-green-900 p-1 text-white text-xs font-bold mt-1 mb-2 sm:my-0 w-fit-content rounded-md">
                      <span>{main_data.TypeOwn1Out}</span>
                    </button>
                  </div>
                </div>
                <MobileGallery ResourceRecordKey={main_data.ListingKey} />
                <div className="w-full flex justify-center pt-0 sm:pt-4 relative">
                  <div className="grid sm:grid-cols-6 grid-cols-1 justify-between sm:justify-between w-full sm:gap-x-6 gap-y-12 sm:gap-y-0 relative">
                    <div className={`sm:col-span-6 col-span-4 col-md-8`}>
                      <PropertyPage {...{ main_data }} />
                      <BookingDate bannerImage={imageURLs[0]} />
                      <MapSection main_data={main_data} />
                    </div>
                    <div className="mt-24 mb-10 col-span-6">
                      <FAQ main_data={main_data} />
                    </div>
                  </div>
                </div>
                <PriceButton price={formatCurrency(main_data?.ListPrice)} />
              </section>
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
    const listingKey = listingID.split("-").pop();
    const main_data = await fetchData(listingKey);

    if (!main_data) {
      return {
        title: "Listing Not Found",
        description: "The requested listing could not be found",
      };
    }

    const imageURLs = generateImageURLs(listingKey);

    return {
      ...parent,
      alternates: {
        canonical: `https://commercialspot.ca/${city}/${slugGenerator(
          main_data
        )}`,
      },
      openGraph: {
        images: await fetch(imageURLs[0]),
      },
      title: `${main_data?.StreetNumber} ${main_data?.StreetName} ${
        main_data?.StreetSuffix || ""
      }`,
      description: `${main_data?.PropertySubType || ""} in ${
        main_data?.City
      }, ${main_data?.StateOrProvince}`,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return parent;
  }
}

export default page;
