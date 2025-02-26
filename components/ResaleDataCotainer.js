import React from "react";

const ResaleDataCotainer = (data) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((listing) => (
        <ResaleCard curElem={listing} key={listing.ListingKey} />
      ))}
    </div>
  );
};

export default ResaleDataCotainer;
