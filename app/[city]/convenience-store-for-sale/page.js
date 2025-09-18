import { getConvenienceStoreListings } from "@/api/getBusinessListings";
import ListingListPage from "@/components/ListingListPage";
import citiesData from "@/data/gta-cities.json";

const { cities: gtaCities } = citiesData;

export default function CityConvenienceStores({ params }) {
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
        getListings={getConvenienceStoreListings}
        city={params?.city}
        subtitle={`500+ ${cityExists} businesses for sale. Book a showing for convenience stores. Prices from $1 to $5,000,000. Open houses available.`}
        title={`Convenience Stores for Sale in ${cityExists}`}
      />
    </>
  );
}

export async function generateMetadata({ params }) {
  const city = params.city;
  const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);

  return {
    title: `Convenience Stores for Sale in ${capitalizedCity}`,
    description: `Looking for convenience stores for sale in ${capitalizedCity}? Bizmonk is the best place to find your business space.`,
  };
}
