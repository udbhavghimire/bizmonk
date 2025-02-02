import { BASE_URL } from "..";
export const residential = {
  properties: `${BASE_URL}/residential/Properties/$query`,
  photos: `${BASE_URL}/residentialPhotos/MLS-index.jpeg`,
  statistics: `${BASE_URL}/residential/stats/$query`,
};

export const commercial = {
  properties: "https://query.ampre.ca/odata/Property",
  photos: "https://query.ampre.ca/odata/PropertyPhotos",
  statistics: "https://query.ampre.ca/odata/PropertyStats",
};
