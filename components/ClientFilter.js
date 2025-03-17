"use client";
import { useRouter } from "next/navigation";
import Filter from "@/components/Filter";

export default function ClientFilter({ cityUrl }) {
  const router = useRouter();

  const handleFilterChange = (filterParams) => {
    // Build the query string based on filter parameters
    let queryParams = new URLSearchParams();

    if (filterParams.propertyType) {
      queryParams.set(
        "type",
        filterParams.propertyType.toLowerCase().replace(/\s+/g, "-")
      );
    }

    if (filterParams.priceRange) {
      queryParams.set("price", filterParams.priceRange);
    }

    // Navigate to the filtered URL
    const queryString = queryParams.toString();
    const url = `/${cityUrl}/retail-lease${
      queryString ? `?${queryString}` : ""
    }`;
    router.push(url);

    // Return a resolved promise to satisfy the async expectation
    return Promise.resolve();
  };

  return <Filter cityUrl={cityUrl} onFilterChange={handleFilterChange} />;
}
