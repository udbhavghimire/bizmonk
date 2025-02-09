const CityContent = ({ cityName }) => {
  const cityContent = {
    toronto: {
      title: "Why Invest in Toronto Commercial Real Estate?",
      description: `Toronto, Canada's largest city and economic powerhouse, offers exceptional opportunities for business property investments. As a global financial center and tech hub, Toronto continues to attract international businesses and entrepreneurs, making it a prime location for commercial real estate investment.`,
      pros: [
        "Diverse and rapidly growing multicultural economy",
        "Strong financial sector presence with major banks and institutions",
        "Robust tech and startup ecosystem with growing innovation districts",
        "High population density and consistent foot traffic",
        "Excellent transportation infrastructure including TTC and GO Transit",
        "World-class educational institutions attracting global talent",
        "Strong tourism sector driving retail and hospitality growth",
        "Stable political and economic environment",
      ],
      cons: [
        "Higher property costs compared to other Canadian cities",
        "Competitive market with high demand for prime locations",
        "Complex zoning regulations and permit processes",
        "Higher operating costs and property taxes",
        "Parking challenges in downtown areas",
        "Seasonal weather considerations",
      ],
      whyInvest: `Toronto's commercial real estate market offers stable long-term growth potential, backed by a strong economy and continuous urban development. The city's multicultural population of over 6 million in the GTA creates diverse business opportunities across various sectors. With major infrastructure projects, including transit expansion and waterfront development, Toronto continues to enhance its position as a global business destination. The city's strong population growth, averaging 1.4% annually, ensures a steady demand for commercial services and retail spaces.`,
      additionalInfo: [
        {
          title: "Market Trends and Growth",
          content:
            "Toronto's commercial real estate market has shown remarkable resilience, with average property values increasing by 5-7% annually over the past decade. The city's expansion into areas like the East Harbour and Port Lands creates new investment opportunities in emerging districts.",
        },
        {
          title: "Strategic Location Benefits",
          content:
            "Located in the heart of North America's fourth-largest economic region, Toronto offers easy access to major U.S. markets and serves as a gateway to the Canadian economy. The city's strategic location and international airport connectivity make it ideal for businesses with global operations.",
        },
        {
          title: "Demographics and Consumer Base",
          content:
            "Toronto's diverse population includes a high concentration of young professionals and a growing middle class, driving demand for retail, entertainment, and service-based businesses. The city's high immigration rate ensures a continuous influx of new consumers and entrepreneurs.",
        },
      ],
    },
    mississauga: {
      title: "Commercial Real Estate Investment in Mississauga",
      description: `Mississauga, Ontario's third-largest city, presents a compelling opportunity for commercial real estate investment. With its strategic location near Toronto Pearson International Airport and major highways, Mississauga offers excellent accessibility and business growth potential.`,
      pros: [
        "Lower property costs compared to Toronto",
        "Excellent transportation links including airport proximity",
        "Growing corporate presence and business parks",
        "Diverse and expanding population base",
        "Business-friendly municipal government",
        "Modern infrastructure and planned development",
        "Strong manufacturing and logistics sector",
        "Lower operating costs than Toronto",
      ],
      cons: [
        "Developing public transit infrastructure",
        "Competition from neighboring municipalities",
        "Suburban layout requiring car dependency",
        "Growing property tax rates",
        "Limited downtown core development",
      ],
      whyInvest: `Mississauga offers investors a perfect blend of urban amenities and suburban advantages. The city's strategic location, strong corporate presence, and growing population of over 800,000 create excellent opportunities for commercial real estate investment. With major development projects like the Hurontario LRT and Downtown21 Plan, Mississauga is transforming into a more connected and vibrant urban center.`,
      additionalInfo: [
        {
          title: "Economic Stability",
          content:
            "Home to over 98,000 businesses including many Fortune 500 companies, Mississauga boasts a diverse economy spanning advanced manufacturing, life sciences, information technology, and financial services.",
        },
        {
          title: "Future Development",
          content:
            "The city's commitment to smart growth through initiatives like the Mississauga Waterfront and Square One District development ensures long-term value appreciation for commercial properties.",
        },
        {
          title: "Business Environment",
          content:
            "Mississauga's business-friendly policies, competitive tax rates, and efficient municipal services make it an attractive location for companies of all sizes, driving demand for commercial space.",
        },
      ],
    },
    vancouver: {
      title: "Investing in Vancouver's Commercial Properties",
      description: `Vancouver, known for its stunning natural beauty and strategic Pacific Rim location, presents unique opportunities in the commercial real estate sector. The city serves as Canada's gateway to Asian markets and boasts a thriving tech and film industry.`,
      pros: [
        "Strategic location for Asia-Pacific trade",
        "Growing tech and entertainment sectors",
        "High quality of life attracting skilled workforce",
        "Strong tourism industry",
        "Stable property value appreciation",
      ],
      cons: [
        "Premium property prices",
        "Limited land availability",
        "Weather-related maintenance considerations",
        "Seismic considerations for construction",
      ],
      whyInvest: `Vancouver's commercial real estate offers investors exposure to a dynamic market with strong international connections. The city's focus on sustainability and innovation makes it particularly attractive for forward-thinking businesses and investors.`,
    },
    // Add more cities as needed
  };

  const content = cityContent[cityName.toLowerCase()] || {
    title: `Investing in ${cityName}'s Commercial Real Estate`,
    description: `${cityName} offers unique opportunities in the Canadian commercial real estate market, with its own distinct advantages and market characteristics. As part of Ontario's growing economy, ${cityName} presents valuable investment potential for commercial property buyers.`,
    pros: [
      "Growing local economy with diverse business sectors",
      "Potential for property value appreciation",
      "Business-friendly environment and support",
      "Strategic location advantages within Ontario",
      "Access to regional markets and infrastructure",
      "Competitive operating costs",
      "Local development initiatives",
    ],
    cons: [
      "Market-specific challenges and competition",
      "Economic fluctuations and market cycles",
      "Local regulation and zoning considerations",
      "Infrastructure development needs",
      "Seasonal business variations",
    ],
    whyInvest: `${cityName} presents valuable opportunities for commercial real estate investment, supported by local economic growth and development initiatives. The city's strategic position within Ontario's economic corridor makes it an attractive location for businesses looking to establish or expand their presence.`,
    additionalInfo: [
      {
        title: "Local Market Overview",
        content: `${cityName}'s commercial real estate market offers diverse opportunities across retail, office, and industrial sectors, supported by local economic development programs and population growth.`,
      },
      {
        title: "Future Growth Potential",
        content: `With ongoing infrastructure improvements and community development projects, ${cityName} continues to enhance its appeal as a business destination.`,
      },
      {
        title: "Investment Considerations",
        content:
          "Investors can benefit from relatively stable property values and potential for appreciation as the region continues to develop and attract new businesses.",
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {content.title}
        </h2>
        <p className="text-lg text-gray-600 mb-8">{content.description}</p>

        {/* Advantages Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Advantages
          </h3>
          <ul className="grid md:grid-cols-2 gap-4">
            {content.pros.map((pro, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-600">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Considerations Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Considerations
          </h3>
          <ul className="grid md:grid-cols-2 gap-4">
            {content.cons.map((con, index) => (
              <li key={index} className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span className="text-gray-600">{con}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Why Invest?
          </h3>
          <p className="text-gray-600">{content.whyInvest}</p>
        </div>

        <div className="space-y-6">
          {content.additionalInfo.map((info, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {info.title}
              </h3>
              <p className="text-gray-600">{info.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityContent;
