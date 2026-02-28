"use server";

const MEDIA_FALLBACK_URL = "/icons/no-photo.png";
const FETCH_TIMEOUT_MS = Number(process.env.AMPRE_FETCH_TIMEOUT_MS || 10000);
const FETCH_RETRY_COUNT = 1;

const getErrorCode = (err) =>
  err?.code || err?.cause?.code || err?.name || "UNKNOWN_FETCH_ERROR";

const fetchWithTimeout = async (url, options = {}, timeoutMs = FETCH_TIMEOUT_MS) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
};

const fetchJsonWithRetry = async (url, options, retries = FETCH_RETRY_COUNT) => {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, options);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt === retries) {
        throw error;
      }
    }
  }

  throw lastError;
};

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
  const apiBase = "https://pillar9.homebaba.ca";

  try {
    // 1. Fetch the photo count for the listing
    const response = await fetchJsonWithRetry(
      `https://query.ampre.ca/odata/Media?$select=MediaKey&$filter=ResourceRecordKey eq '${ResourceRecordKey}' and ImageSizeDescription eq 'Large' and MediaStatus eq 'Active'`,
      options,
    );
    const countData = response?.value?.length;

    // 2. If there are no photos, return an empty array
    if (!countData || countData === 0) {
      return [];
    }

    // 3. Build the array of image URLs
    if (thumbnailOnly) {
      return [`${apiBase}/images/${ResourceRecordKey}-0.jpg`];
    }

    const urls = [];
    for (let i = 0; i <= countData; i++) {
      urls.push(`${apiBase}/images/${ResourceRecordKey}-${i}.jpg`);
    }
    return urls;
  } catch (err) {
    console.warn(
      `getImageUrls fallback for ${ResourceRecordKey}: ${getErrorCode(err)}`,
    );
    return [MEDIA_FALLBACK_URL];
  }
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

    const data = await fetchJsonWithRetry(url, {
      headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN_FOR_API}`,
        Accept: "application/json",
      },
      next: { revalidate: 60 },
    });

    const media = data.value || [];
    return media.map((item) => ({
      ...item,
      MediaURL: buildMediaUrl(listingKey, item.MediaKey, item.MediaType),
    }));
  } catch (err) {
    console.warn(
      `fetchMedia fallback for listing ${listingKey}: ${getErrorCode(err)}`,
    );
    return [
      {
        MediaKey: "fallback",
        MediaType: "image/png",
        MediaURL: MEDIA_FALLBACK_URL,
      },
    ];
  }
}
