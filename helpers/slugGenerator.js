export const slugGenerator = (data) => {
  const address = [
    data.Street || data.StreetNumber,
    data.StreetName,
    data.StreetAbbreviation || data.StreetSuffix,
    data.Municipality || data.City,
    data.ListingKey,
  ]
    .filter(Boolean)
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return address;
};
