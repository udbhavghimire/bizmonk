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
    description: `100+ restaurants for sale in Ontario, priced from $1 to $5,000,000. Book a showing for Ontario restaurant listings and contact Bizmonk to check out top opportunities in Ontario’s growing restaurant market.`,
  };
}
