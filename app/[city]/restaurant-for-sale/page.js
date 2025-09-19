import citiesData from "@/data/gta-cities.json";

import { getRestaurantListings } from "@/api/getBusinessListings";
import ListingListPage from "@/components/ListingListPage";

const { cities: gtaCities } = citiesData;

export default function CityRestaurants({ params }) {
  const { cities: gtaCities } = citiesData;

  const cityExists = gtaCities.find(
    (c) => c.toLowerCase() === params?.city.toLowerCase()
  );

  if (!cityExists) {
    notFound();
  }
  return (
    <>
      <ListingListPage
        getListings={getRestaurantListings}
        city={params?.city}
        subtitle={` 500+ ${cityExists} businesses for sale. Book a showing for restaurants.
          Prices from $1 to $5,000,000. Open houses available.`}
        title={` Restaurants for Sale in ${cityExists}`}
      />
    </>
  );
}

export async function generateMetadata({ params }) {
  const city = params.city;
  const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);

  return {
    title: `Restaurants for Sale in ${capitalizedCity}`,
    description: `100+ restaurants for sale in ${capitalizedCity}, Ontario, priced from $1 to $5,000,000. Book a showing for ${capitalizedCity} restaurant listings and contact Bizmonk to check out top opportunities in ${capitalizedCity}’s growing restaurant market.`,
  };
}
