"use server";
export const getImageUrls = async ({ MLS, thumbnailOnly = false }) => {
  if (MLS) {
    const options = {
      method: "GET",
      headers: {
        Authorization: process.env.BEARER_TOKEN_FOR_API,
      },
      // cache: "no-store",
    };

    let imageLink = `https://query.ampre.ca/odata/Media?$filter=ResourceRecordKey eq 'MLS' and MediaType eq 'image/jpeg' and MediaStatus eq 'Active'`;

    if (thumbnailOnly) imageLink += " and ImageSizeDescription eq 'Large'";
    else imageLink += " and ImageSizeDescription eq 'Largest'";
    console.log(imageLink.replace("MLS", MLS));
    const response = await fetch(imageLink.replace("MLS", MLS), options);
    const jsonResponse = await response.json();
    const urls = jsonResponse.value.map((data) => data.MediaURL);
    return urls;
  }
};
