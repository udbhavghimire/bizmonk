"use server";

import { capitalizeFirstLetter } from "@/helpers/capitalizeFirstLetter";
const options = {
  method: "GET",
  headers: {
    Authorization: process.env.BEARER_TOKEN_FOR_API,
  },
  next: {
    revalidate: 3600,
  },
};

export const getSaleOfBusinessListings = async (
  city = null,
  searchParams = {}
) => {
  const pageSize = 60;
  const page = Number(searchParams?.page) || 1;
  const skip = (page - 1) * pageSize;

  try {
    const response = await fetch(
      `https://query.ampre.ca/odata/Property?$filter=PropertySubType eq 'Sale Of Business'${
        city ? ` and contains(City,'${capitalizeFirstLetter(city)}')` : ""
      }&$top=60&$skip=${skip}&$orderby=OriginalEntryTimestamp desc`,
      options
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
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
    listing.BusinessType.includes("Restaurant")
  );

  // Apply price filter if provided
  if (priceRange) {
    filteredValues = filteredValues.filter((listing) => {
      const price = Number(listing.ListPrice);
      return price >= priceRange.min && price <= priceRange.max;
    });
  }

  return !numberOfListings
    ? filteredValues
    : filteredValues.slice(0, numberOfListings);
};

export const getConvenienceStoreListings = async ({
  city = null,
  numberOfListings = null,
  priceRange = null,
} = {}) => {
  const SALEOFBUSINESSLISTINGS = await getSaleOfBusinessListings(city);
  let filteredValues = SALEOFBUSINESSLISTINGS.value.filter((listing) =>
    listing.BusinessType.includes("Convenience/Variety")
  );

  // Apply price filter if provided
  if (priceRange) {
    filteredValues = filteredValues.filter((listing) => {
      const price = Number(listing.ListPrice);
      return price >= priceRange.min && price <= priceRange.max;
    });
  }

  return !numberOfListings
    ? filteredValues
    : filteredValues.slice(0, numberOfListings);
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
    options
  ).then((response) => response.json());

  let filteredValues = data.value.filter((listing) => {
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

  return filteredValues;
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
