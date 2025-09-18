import { getConvenienceStoreListings } from "@/api/getBusinessListings";
import ListingListPage from "@/components/ListingListPage";

export default function ConvenienceStores() {
  return (
    <>
      <ListingListPage
        getListings={getConvenienceStoreListings}
        title={"Convenience Stores for Sale in Ontario"}
        subtitle={""}
      />
    </>
  );
}

export async function generateMetadata({ params }) {
  return {
    title: `Convenience Stores for Sale in Ontario`,
    description: `Looking for convenience stores for sale in Ontario? Bizmonk is the best place to find your business space.`,
  };
}
