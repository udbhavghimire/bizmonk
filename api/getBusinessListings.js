"use server";

import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
import { fetchMedia } from "./getImageUrls";

const buildFetchOptions = (revalidate = 3600) => ({
  method: "GET",
  headers: {
    Authorization: `Bearer ${process.env.BEARER_TOKEN_FOR_API}`,
    Accept: "application/json",
  },
  next: { revalidate },
});

const isConsumedBodyError = (error) => {
  return (
    error instanceof TypeError &&
    typeof error.message === "string" &&
    error.message.includes("Body has already been consumed")
  );
};

const fetchJson = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};
// Helper to attach media to listings
const attachMedia = async (listings, mediaCount = 1) => {
  return await Promise.all(
    (listings || []).map(async (listing) => {
      try {
        const media = await fetchMedia(listing.ListingKey, mediaCount);
        return { ...listing, Media: media };
      } catch (err) {
        console.error("Failed to fetch media for", listing.ListingKey, err);
        return { ...listing, Media: [] };
      }
    }),
  );
};

export const getSaleOfBusinessListings = async (
  city = null,
  searchParams = {},
) => {
  const pageSize = 60;
  const page = Number(searchParams?.page) || 1;
  const skip = (page - 1) * pageSize;

  const url = `https://query.ampre.ca/odata/Property?$filter=PropertySubType eq 'Sale Of Business'${
    city ? ` and contains(City,'${capitalizeFirstLetter(city)}')` : ""
  }&$top=500&$skip=${skip}&$orderby=OriginalEntryTimestamp desc`;

  try {
    let data;
    try {
      data = await fetchJson(url, buildFetchOptions());
    } catch (error) {
      if (!isConsumedBodyError(error)) {
        throw error;
      }

      const retryBaseOptions = buildFetchOptions();
      const retryOptions = {
        ...retryBaseOptions,
        headers: {
          ...retryBaseOptions.headers,
          "x-fetch-retry": "1",
        },
      };
      data = await fetchJson(url, retryOptions);
    }

    // Attach media before returning
    data.value = await attachMedia(data.value);

    return data;
  } catch (error) {
    console.error("Error fetching business listings:", error);
    return { value: [] };
  }
};

export const getRestaurantListings = async ({
  city = null,
  numberOfListings = null,
  priceRange = null,
} = {}) => {
  const SALEOFBUSINESSLISTINGS = await getSaleOfBusinessListings(city);
  let filteredValues = SALEOFBUSINESSLISTINGS.value.filter((listing) =>
    listing.BusinessType.includes("Restaurant"),
  );

  // Apply price filter if provided
  if (priceRange) {
    filteredValues = filteredValues.filter((listing) => {
      const price = Number(listing.ListPrice);
      return price >= priceRange.min && price <= priceRange.max;
    });
  }

  if (numberOfListings)
    filteredValues = filteredValues.slice(0, numberOfListings);

  return attachMedia(filteredValues);
};

export const getConvenienceStoreListings = async ({
  city = null,
  numberOfListings = null,
  priceRange = null,
} = {}) => {
  const SALEOFBUSINESSLISTINGS = await getSaleOfBusinessListings(city);
  let filteredValues = SALEOFBUSINESSLISTINGS.value.filter((listing) =>
    listing.BusinessType.includes("Convenience/Variety"),
  );

  // Apply price filter if provided
  if (priceRange) {
    filteredValues = filteredValues.filter((listing) => {
      const price = Number(listing.ListPrice);
      return price >= priceRange.min && price <= priceRange.max;
    });
  }

  if (numberOfListings)
    filteredValues = filteredValues.slice(0, numberOfListings);

  return attachMedia(filteredValues);
};

export const getOfficeListings = async ({
  city = null,
  numberOfListings,
  priceRange = null,
}) => {
  const data = await fetch(
    `https://query.ampre.ca/odata/Property?$filter=PropertyType eq 'Commercial' and TransactionType eq 'For Lease'${
      city ? ` and contains(City,'${capitalizeFirstLetter(city)}')` : ""
    }&$top=${numberOfListings || 200}&$orderby=OriginalEntryTimestamp desc`,
    buildFetchOptions(),
  ).then(async (response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });

  let filteredValues = data?.value?.filter((listing) => {
    const validTypes = [
      "Industrial",
      "Medical/Dental",
      "Warehouse",
      "Retail Store Related",
      "Professional Office",
    ];
    return validTypes.some((type) => listing.BusinessType?.includes(type));
  });

  // Apply price filter if provided
  if (priceRange) {
    filteredValues = filteredValues.filter((listing) => {
      const price = Number(listing.ListPrice);
      return price >= priceRange.min && price <= priceRange.max;
    });
  }

  return attachMedia(filteredValues);
};

export async function getBramptonRestaurantsUnder300k() {
  return getRestaurantListings({
    city: "Brampton",
    numberOfListings: 8,
    priceRange: {
      min: 0,
      max: 300000,
    },
  });
}

export async function getBramptonStoresUnder500k() {
  return getConvenienceStoreListings({
    city: "Brampton",
    numberOfListings: 8,
    priceRange: {
      min: 0,
      max: 500000,
    },
  });
}

export async function getTorontoCommercialSpace() {
  return getOfficeListings({
    city: "Toronto",
    numberOfListings: 8,
  });
}

const formatCityName = (str) => {
  if (!str) return "";
  return str
    .trim()
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const BUSINESS_TYPE_API_MAP = {
  restaurant: "Restaurant",
  "convenience-store": "Convenience/Variety",
  industrial: "Industrial",
  "medical-dental": "Medical/Dental",
  warehouse: "Warehouse",
  "retail-store-related": "Retail Store Related",
  "professional-office": "Professional Office",
};

export async function fetchProperties({
  city,
  top = 20,
  skip = 0,
  minPrice,
  maxPrice,
  businessType,
  sort = "newest",
}) {
  const SORT_ORDER_MAP = {
    newest: "OriginalEntryTimestamp desc",
    oldest: "OriginalEntryTimestamp asc",
    price_desc: "ListPrice desc",
    price_asc: "ListPrice asc",
  };
  const orderBy = SORT_ORDER_MAP[sort] || SORT_ORDER_MAP.newest;

  const params = [`$top=${top}`, `$skip=${skip}`, `$count=true`];
  params.push(`$orderby=${encodeURIComponent(orderBy)}`);

  const filters = [`PropertySubType eq 'Sale Of Business'`];

  if (city) {
    const formattedCity = formatCityName(city);
    filters.push(`contains(City, '${formattedCity}')`);
  }

  if (businessType) {
    const apiBusinessType = BUSINESS_TYPE_API_MAP[businessType];
    if (apiBusinessType) {
      filters.push(`BusinessType in ('${apiBusinessType}')`);
    }
  }

  if (Number.isFinite(minPrice)) filters.push(`ListPrice ge ${minPrice}`);
  if (Number.isFinite(maxPrice)) filters.push(`ListPrice le ${maxPrice}`);

  if (filters.length > 0) {
    params.push(`$filter=${encodeURIComponent(filters.join(" and "))}`);
  }

  const url = `https://query.ampre.ca/odata/Property?${params.join("&")}`;
  const data = await fetchJson(url, buildFetchOptions());

  const totalCount = data["@odata.count"] || 0;

  return {
    items: data.value || [],
    totalCount,
    totalPages: Math.ceil(totalCount / top),
    currentPage: Math.floor(skip / top) + 1,
    top,
    skip,
  };
}
