import citiesData from "@/data/gta-cities.json";

import { getRestaurantListings } from "@/api/getBusinessListings";
import ListingListPage from "@/components/ListingListPage";
import { notFound } from "next/navigation";

const { cities: gtaCities } = citiesData;

export default async function CityRestaurants({ params }) {
  const resolvedParams = await params;
  const { cities: gtaCities } = citiesData;

  const cityExists = gtaCities.find(
    (c) => c.toLowerCase() === resolvedParams?.city.toLowerCase()
  );

  if (!cityExists) {
    notFound();
  }
  return (
    <>
        <ListingListPage
          getListings={getRestaurantListings}
          city={resolvedParams?.city}
        subtitle={` 500+ ${cityExists} restaurants for sale. Book a showing for restaurants.
          Prices from $1 to $5,000,000. Open houses available.`}
        title={` Restaurants for Sale in ${cityExists}`}
      />
    </>
  );
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const city = resolvedParams.city;
  const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);

  return {
    title: `Restaurants for Sale in ${capitalizedCity}`,
    description: `100+ restaurants for sale in ${capitalizedCity}, Ontario, priced from $1 to $5,000,000. Book a showing for ${capitalizedCity} restaurant listings and contact Bizmonk to check out top opportunities in ${capitalizedCity}’s growing restaurant market.`,
  };
}
