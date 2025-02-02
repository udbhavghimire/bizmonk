import { isLocalStorageAvailable } from "./checkLocalStorageAvailable";
import { houseType } from "@/constant/businessTypes";
import { saleLease } from "@/constant/saleLease";

// Initialize houseTypeLinkObj only if houseType is defined
const houseTypeLinkObj = {};
if (houseType) {
  Object.values(houseType).forEach((elem) => {
    houseTypeLinkObj[elem.name.toLowerCase()] = elem.slug;
  });
}

export const generateURL = ({
  cityVal,
  houseTypeVal,
  saleLeaseVal,
  listingIDVal = null,
  embeddedSite = false,
}) => {
  // Check if we're on the server side
  const isServer = typeof window === "undefined";

  // Only try to access localStorage on the client side
  const filterState =
    !isServer && isLocalStorageAvailable()
      ? JSON.parse(localStorage.getItem("filterState"))
      : null;

  const city = cityVal?.toLowerCase().replaceAll(" ", "-");
  let houseTypeValue =
    houseTypeVal?.toLowerCase() || filterState?.type?.toLowerCase() || null;
  if (houseTypeValue === "business type") {
    houseTypeValue = null;
  }

  const saleLeaseType =
    Object.keys(saleLease).find((key) => key === saleLeaseVal) ||
    Object.keys(saleLease)
      .find((key) => saleLease[key].name === saleLeaseVal)
      ?.toLowerCase() ||
    Object.keys(saleLease)
      .find((key) => saleLease[key].name === filterState?.saleLease)
      ?.toLowerCase();

  if (listingIDVal && city) {
    return `${
      embeddedSite ? "/embedded-site" : ""
    }/ontario/${city}/listings/${listingIDVal}`;
  }

  let finalLink = `${embeddedSite ? "/embedded-site" : ""}/ontario`;

  if (city) finalLink += "/" + city;

  if (!houseTypeValue && !saleLeaseType)
    return finalLink + "/businesses-for-sale";

  if (houseTypeValue && !city && houseTypeLinkObj[houseTypeValue]) {
    finalLink += "/businesses/" + houseTypeLinkObj[houseTypeValue];
  }
  if (houseTypeValue && city && houseTypeLinkObj[houseTypeValue]) {
    finalLink += "/" + houseTypeLinkObj[houseTypeValue];
  }
  if (saleLeaseType && houseTypeValue) {
    finalLink += "-for-" + saleLeaseType;
  }
  if (saleLeaseType && !houseTypeValue) {
    finalLink += "/businesses-for-" + saleLeaseType;
  }

  return finalLink;

  // if (houseType) {
  //   if (saleLeaseType) {
  //     finalLink += `/${city}`;
  //   }
  //   return `${
  //     embeddedSite ? "/embedded-site" : ""
  //   }/ontario/${city}/${houseType}`;
  // }
  // if (saleLeaseType) {
  //   return `${
  //     embeddedSite ? "/embedded-site" : ""
  //   }/ontario/${city}/${saleLeaseType}`;
  // }

  // return `${embeddedSite ? "/embedded-site" : ""}/ontario`;
};
