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
    options,
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

const mediaTypeToExtension = (mediaType) => {
  if (!mediaType) return "";
  const type = mediaType.toLowerCase();
  if (type.includes("jpeg") || type.includes("jpg")) return "jpg";
  if (type.includes("png")) return "png";
  if (type.includes("webp")) return "webp";
  if (type.includes("gif")) return "gif";
  return type.split("/")[1] || "";
};
const MLS_MEDIA_CDN_BASE =
  "https://treeb.tor1.cdn.digitaloceanspaces.com/treeb/Property";
const buildMediaUrl = (listingKey, mediaKey, mediaType) => {
  if (!listingKey || !mediaKey) return null;
  const ext = mediaTypeToExtension(mediaType);
  if (!ext) return null;
  return `${MLS_MEDIA_CDN_BASE}/${listingKey}/${mediaKey}.${ext}`;
};

export async function fetchMedia(listingKey, mediaCount = 20) {
  if (!listingKey) return [];

  try {
    const params = [`$select=MediaKey,MediaType`, `$top=${mediaCount}`];
    const filter =
      "ImageSizeDescription eq 'Medium' and MediaStatus eq 'Active' and ResourceRecordKey eq '" +
      listingKey +
      "'";
    params.push(`$filter=${encodeURIComponent(filter)}`);
    params.push(`$orderby=${encodeURIComponent("Order asc")}`);
    const url = `https://query.ampre.ca/odata/Media?${params.join("&")}`;

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN_FOR_API}`,
        Accept: "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`Failed to fetch media for ${listingKey}: ${res.status}`);
      return [];
    }

    const data = await res.json();

    const media = data.value || [];
    return media.map((item) => ({
      ...item,
      MediaURL: buildMediaUrl(listingKey, item.MediaKey, item.MediaType),
    }));
  } catch (err) {
    console.error(`fetchMedia error for listing ${listingKey}`, err);
    return [];
  }
}
