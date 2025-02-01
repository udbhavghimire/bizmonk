const baseFranchises = [
  {
    name: "Mary Brown's Chicken",
    type: "Fast Food Restaurant",
    investment: "$450K - $700K",
    locations: "Premium locations available",
    image: "/mary.jpg",
    description:
      "Be part of Canada's fastest-growing chicken restaurant chain known for its Made Fresh from Scratch™ preparation. With over 50 years of success, Mary Brown's offers a proven business model and comprehensive support system.",
    brochure: "/brochures/marybrowns.pdf",
    financing: {
      "Restaurant Model": "Full Store: 1,800-3,000 sq. ft.",
      "startUp Costs": "$875,000+",
      "liquid Capital": "$300,000",
      "franchisee Fee": "$30,000",
      royalties: "5%",
      marketing: "4%",
    },
    stats: [
      { value: "270+", label: "STORES" },
      { value: "55+", label: "YEARS IN BUSINESS" },
      { value: "18", label: "CONSECUTIVE YEARS SAME STORE SALES GROWTH" },
      {
        value: "14",
        label: "YEARS CONSECUTIVE FRANCHISEES' CHOICE AWARD WINNER",
      },
    ],
    contactImage: "/contact-marybrown.png",
    specialities: [
      "Individual or multi-unit operators are welcome",
      "Best-in-class training at our training centre",
      "3 week comprehensive Training Course teaches you how to produce and serve consistently perfect product – profitably",
      "Our purchasing team ensures the highest quality products are available chain-wide for all Mary Brown's menu items",
      "An expert group of Banking and Business Advisors is available to assist with financial planning and any questions you may have.",
    ],
    storeModels: [
      {
        type: "Stand Alone with Drive Thru",
        description:
          "Our stand alone model with Drive Thru offers a spacious 2,200 to 3,200 square foot floor plan as well as additional sales opportunities in the drive-thru.",
        image: "/marybrown-drivethru.webp",
      },
      {
        type: "Stand Alone",
        description:
          "Mary Brown's stand alone locations are typically 1,800 to 2,500 square feet, providing ample dine-in seating as well as convenient take-out ordering.",
        image: "/marybrown-standalone.webp",
      },
      {
        type: "End Cap",
        description:
          "End cap offers unique design and enhanced visibility. Square footage is 1,700 to 2,200 square feet for dine-in guest seating and take-out.",
        image: "/marybrown-endcap.webp",
      },
      {
        type: "In Line",
        description:
          "Mary Brown's in line models are 1,700 – 2,200 square feet.",
        image: "/marybrown-inline.webp",
      },
      {
        type: "Non-Traditional",
        description:
          "A smaller footprint at 600-1,000 square feet including Walmart locations, mall locations and express locations that are ideal for universities, airports, sport arenas and other options.",
        image: "/marybrown-notraditional.webp",
      },
    ],
  },

  {
    name: "Fat Bastard Burrito",
    type: "Fast Casual Restaurant",
    investment: "$350K - $500K",
    locations: "Prime locations available",
    image: "/fatb.jpg",
    description:
      "Join Canada's fastest-growing burrito franchise with a unique menu and strong brand presence. Fat Bastard Burrito offers an innovative concept with exceptional profit potential and comprehensive franchise support.",
    specialities: [
      "Proven business model with strong track record",
      "Comprehensive training and ongoing support",
      "Strong brand recognition and marketing support",
      "Prime location opportunities",
      "Established supply chain and operations systems",
    ],
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

// Add this new data structure for franchise partners
export const franchiseList = [
  {
    name: "A&W Restaurant",
    logo: "/franchises/a_&_w_restaurant.jpeg",
    displayName: "A&W Restaurant",
  },
  {
    name: "Charleys Philly Steak",
    logo: "/franchises/charleys_philly_steak.png",
    displayName: "Charleys Philly Steak",
  },
  {
    name: "Potikki's",
    logo: "/franchises/potikkis.png",
    displayName: "Potikki's",
  },
  {
    name: "241 Pizza",
    logo: "/franchises/241_pizza.png",
    displayName: "241 Pizza",
  },
  {
    name: "Boston Pizza",
    logo: "/franchises/boston_pizza.jpeg",
    displayName: "Boston Pizza",
  },
  {
    name: "Burger King",
    logo: "/franchises/burger_king.png",
    displayName: "Burger King",
  },
  {
    name: "Burrito Jax",
    logo: "/franchises/burrito_jax.png",
    displayName: "Burrito Jax",
  },
  {
    name: "Eggsmart",
    logo: "/franchises/eggsmart.png",
    displayName: "Eggsmart",
  },
  {
    name: "Imperfect Eats",
    logo: "/franchises/imperfect_eats.jpeg",
    displayName: "Imperfect Eats",
  },
  {
    name: "Kajun Chicken & Seafood",
    logo: "/franchises/kajun_chicken_&_seafood.png",
    displayName: "Kajun Chicken & Seafood",
  },
  {
    name: "Lice Squad & Superherokids",
    logo: "/franchises/lice_squad_&_superherokids.png",
    displayName: "Lice Squad & Superherokids",
  },
  {
    name: "Modern Cleaning",
    logo: "/franchises/modern_cleaning.png",
    displayName: "Modern Cleaning",
  },
  {
    name: "Naturals2Go",
    logo: "/franchises/naturals2go.png",
    displayName: "Naturals2Go",
  },
  {
    name: "Qwench Juice Bar",
    logo: "/franchises/qwench_juice_bar.png",
    displayName: "Qwench Juice Bar",
  },
  {
    name: "The Toasted Yolk Cafe",
    logo: "/franchises/the_toasted_yolk_cafe.png",
    displayName: "The Toasted Yolk Cafe",
  },
];
