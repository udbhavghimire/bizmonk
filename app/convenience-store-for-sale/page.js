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
    description: `100+ convenience stores for sale in Ontario, priced from $1 to $5,000,000. Book a showing for Ontario convenience store listings and contact Bizmonk to check out top opportunities in Ontario's growing convenience store market.`,
  };
}
