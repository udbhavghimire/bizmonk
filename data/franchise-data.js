const baseFranchises = [
  {
    name: "Mary Brown's Chicken",
    type: "Fast Food Restaurant",
    investment: "$450K - $700K",
    locations: "Premium locations available",
    image: "/mary.jpg",
    description:
      "Be part of Canada's fastest-growing chicken restaurant chain known for its Made Fresh from Scratch™ preparation. With over 50 years of success, Mary Brown's offers a proven business model and comprehensive support system.",
  },
  {
    name: "Fat Bastard Burrito",
    type: "Fast Casual Restaurant",
    investment: "$350K - $500K",
    locations: "Prime locations available",
    image: "/fatb.jpg",
    description:
      "Join Canada's fastest-growing burrito franchise with a unique menu and strong brand presence. Fat Bastard Burrito offers an innovative concept with exceptional profit potential and comprehensive franchise support.",
  },
];

// Helper function to create location data
const createLocationData = (cityName) => ({
  title: `Franchise Opportunities in ${cityName}`,
  description: `Discover premium franchise opportunities in ${cityName}'s thriving market`,
  franchises: baseFranchises.map((franchise) => ({
    ...franchise,
    locations: franchise.locations + ` in ${cityName}`,
  })),
  stats: {
    availableFranchises: "100+",
    successRate: "95%",
    supportAndTraining: `${cityName}-based`,
    financingOptions: "Available",
  },
});

// Create a mapping of all valid locations
export const franchiseLocations = {
  ontario: {
    title: "Franchise Opportunities in Ontario",
    description: "Discover premium franchise opportunities across Ontario",
    franchises: baseFranchises.map((franchise) => ({
      ...franchise,
      locations: franchise.locations + " across Ontario",
    })),
    stats: {
      availableFranchises: "500+",
      successRate: "95%",
      supportAndTraining: "Comprehensive",
      financingOptions: "Multiple Available",
    },
  },
  toronto: createLocationData("Toronto"),
  mississauga: createLocationData("Mississauga"),
  brampton: createLocationData("Brampton"),
  vaughan: createLocationData("Vaughan"),
  markham: createLocationData("Markham"),
  "richmond-hill": createLocationData("Richmond Hill"),
  oakville: createLocationData("Oakville"),
  ajax: createLocationData("Ajax"),
  pickering: createLocationData("Pickering"),
  milton: createLocationData("Milton"),
  burlington: createLocationData("Burlington"),
  oshawa: createLocationData("Oshawa"),
  newmarket: createLocationData("Newmarket"),
  aurora: createLocationData("Aurora"),
  whitby: createLocationData("Whitby"),
};

// Helper function to get location-specific content with error handling
export const getLocationContent = (location) => {
  const locationKey = location.toLowerCase();
  const locationData = franchiseLocations[locationKey];

  if (!locationData) {
    throw new Error(`Location not found: ${location}`);
  }

  return locationData;
};
