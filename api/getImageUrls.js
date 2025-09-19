"use server";
import { commercial } from "./routes/fetchRoutes";

export const getImageUrls = async ({
  ResourceRecordKey,
  thumbnailOnly = false,
  soldData = false,
}) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: !soldData
        ? process.env.BEARER_TOKEN_FOR_API
        : process.env.BEARER_TOKEN_FOR_VOW,
    },
    // cache: "no-store",
  };
  // 1. Fetch the photo count for the listing
  const apiBase = "https://pillar9.homebaba.ca";
  const countRes = await fetch(
    `https://query.ampre.ca/odata/Media?$select = MediaKey&$filter=ResourceRecordKey eq '${ResourceRecordKey}' and ImageSizeDescription eq 'Large' and MediaStatus eq 'Active'`,
    options
  );
  const response = await countRes.json();
  const countData = response?.value?.length;

  // 2. If there are no photos, return an empty array
  if (!countData || countData === 0) {
    return [];
  }

  // 3. Build the array of image URLs
  // If thumbnailOnly, just return the first image
  if (thumbnailOnly) {
    return [`${apiBase}/images/${ResourceRecordKey}-0.jpg`];
  }

  // Otherwise, return all images
  const urls = [];
  for (let i = 0; i <= countData; i++) {
    urls.push(`${apiBase}/images/${ResourceRecordKey}-${i}.jpg`);
  }
  return urls;
};
