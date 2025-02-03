"use server";
import { commercial } from "./routes/fetchRoutes";

export const getImageUrls = async ({
  ResourceRecordKey,
  thumbnailOnly = false,
}) => {
  if (ResourceRecordKey) {
    const options = {
      method: "GET",
      headers: {
        Authorization: process.env.BEARER_TOKEN_FOR_API,
      },
    };

    try {
      // Using the photos endpoint from our routes configuration
      let imageLink = `${commercial.photos}?$filter=ResourceRecordKey eq '${ResourceRecordKey}' and ResourceName eq 'Property' and MediaCategory eq 'Photo' and MediaStatus eq 'Active'`;

      // Add size filter based on thumbnailOnly parameter
      if (thumbnailOnly) {
        imageLink += " and ImageSizeDescription eq 'Large'";
      } else {
        imageLink += " and ImageSizeDescription eq 'LargestNoWatermark'";
      }

      // Add ordering to ensure consistent image order
      imageLink += "&$orderby=Order";

      console.log("Fetching images from:", imageLink); // Debug log

      const response = await fetch(imageLink, options);

      if (!response.ok) {
        console.error("Failed to fetch images:", response.status);
        return [];
      }

      const jsonResponse = await response.json();
      console.log("API Response:", jsonResponse); // Debug log

      // Extract MediaURL from each media record and filter out any nulls
      const urls = jsonResponse.value
        .map((data) => data.MediaURL)
        .filter((url) => url != null);

      console.log("Extracted URLs:", urls); // Debug log

      return urls;
    } catch (error) {
      console.error("Error fetching images:", error);
      return [];
    }
  }
  return [];
};
