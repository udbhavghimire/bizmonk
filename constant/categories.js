export const categorySlugMap = {
  "restaurant-for-sale": "restaurant",
  "convenience-store-for-sale": "convenience-store",
  "retail-lease": "retail-store-related",
  "industrial-for-sale": "industrial",
  "medical-dental-for-sale": "medical-dental",
  "warehouse-for-sale": "warehouse",
  "professional-office-for-sale": "professional-office",
  "commercial-space-for-sale": "commercial-space",
};

export const getCategoryFromSlug = (slug) => {
  return categorySlugMap[slug?.toLowerCase()] || null;
};
