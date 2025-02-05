"use server";
import { commercial } from "./routes/fetchRoutes";

export const getImageUrls = async ({
  ResourceRecordKey,
  thumbnailOnly = false,
}) => {
  if (!ResourceRecordKey) return [];

  const options = {
    method: "GET",
    headers: {
      Authorization: process.env.BEARER_TOKEN_FOR_API,
      "Content-Type": "application/json",
    },
  };

  try {
    // Using the photos endpoint from our routes configuration
    let imageLink = `${commercial.photos}?$filter=ResourceRecordKey eq '${ResourceRecordKey}' and ResourceName eq 'Property' and MediaCategory eq 'Photo' and MediaStatus eq 'Active'`;

    // Add ordering to ensure consistent image order
    imageLink += "&$orderby=Order";

    const response = await fetch(imageLink, options);

    if (!response.ok) {
      console.error("Failed to fetch images:", response.status);
      return [];
    }

    const jsonResponse = await response.json();

    if (!jsonResponse.value || jsonResponse.value.length === 0) {
      return [];
    }

    // Extract MediaURL from each media record and filter out any nulls
    const urls = jsonResponse.value
      .map((data) => data.MediaURL)
      .filter((url) => url != null);

    return urls;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};
