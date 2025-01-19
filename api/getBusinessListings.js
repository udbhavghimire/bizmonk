"use server";

import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
const options = {
  method: "GET",
  headers: {
    Authorization: process.env.BEARER_TOKEN_FOR_API,
  },
  next: {
    revalidate: 3600,
  },
};

export const getSaleOfBusinessListings = async ({ city } = {}) => {
  return await fetch(
    `https://query.ampre.ca/odata/Property?$filter=PropertySubType eq 'Sale Of Business'${
      city ? ` and contains(City,'${capitalizeFirstLetter(city)}')` : ""
    }&$top=500&$orderby=OriginalEntryTimestamp desc`,
    options
  ).then((response) => response.json());
};

export const getRestaurantListings = async ({
  city = null,
  numberOfListings = null,
  priceRange = null,
} = {}) => {
  const SALEOFBUSINESSLISTINGS = await getSaleOfBusinessListings({ city });
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
  const SALEOFBUSINESSLISTINGS = await getSaleOfBusinessListings({ city });
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
    `https://query.ampre.ca/odata/Property?$filter=PropertySubType eq 'Office'${
      city ? ` and contains(City,'${capitalizeFirstLetter(city)}')` : ""
    }&$top=${numberOfListings || 200}&$orderby=OriginalEntryTimestamp desc`,
    options
  ).then((response) => response.json());

  let filteredValues = data.value;

  // Apply price filter if provided
  if (priceRange) {
    filteredValues = filteredValues.filter((listing) => {
      const price = Number(listing.ListPrice);
      return price >= priceRange.min && price <= priceRange.max;
    });
  }

  return filteredValues;
};
