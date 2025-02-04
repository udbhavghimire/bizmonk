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

      // Add ordering to ensure consistent image order
      imageLink += "&$orderby=Order";

      console.log("ResourceRecordKey:", ResourceRecordKey);
      console.log("Fetching images from:", imageLink);
      console.log(
        "Using Authorization header:",
        options.headers.Authorization ? "Present" : "Missing"
      );

      const response = await fetch(imageLink, options);
      console.log("Response status:", response.status);

      if (!response.ok) {
        console.error(
          "Failed to fetch images:",
          response.status,
          response.statusText
        );
        const errorText = await response.text();
        console.error("Error response:", errorText);
        return [];
      }

      const jsonResponse = await response.json();
      console.log(
        "API Response value length:",
        jsonResponse.value?.length || 0
      );

      if (!jsonResponse.value || jsonResponse.value.length === 0) {
        console.log("No images found in response");
        return [];
      }

      // Extract MediaURL from each media record and filter out any nulls
      const urls = jsonResponse.value
        .map((data) => {
          if (!data.MediaURL) {
            console.log("Missing MediaURL for record:", data);
            return null;
          }
          return data.MediaURL;
        })
        .filter((url) => url != null);

      console.log("Final extracted URLs count:", urls.length);
      if (urls.length > 0) {
        console.log("First image URL:", urls[0]);
      }

      return urls;
    } catch (error) {
      console.error("Error fetching images:", error);
      return [];
    }
  }
  return [];
};
