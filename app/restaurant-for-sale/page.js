import { getRestaurantListings } from "@/api/getBusinessListings";
import ListingListPage from "@/components/ListingListPage";

export default function CityRestaurants() {
  return (
    <ListingListPage
      getListings={getRestaurantListings}
      title={"Restaurants for Sale in Ontario"}
      subtitle={""}
    />
  );
}

export async function generateMetadata({ params }) {
  return {
    title: `Restaurants for Sale in Ontario`,
    description: `Looking for restaurants for sale in Ontario? Bizmonk is the best place to find your business space.`,
  };
}
