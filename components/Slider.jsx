"use client";
import React, { useEffect, useRef } from "react";
//ICONS
// import PropertyCard from "./PropertyCard";

import ResaleCard from "./ResaleCard";
import useDeviceView from "@/helpers/useDeviceView";
// import PreconstructionCard from "./PreconstructionCard";
// import CreateSchema from "@/helpers/CreateSchema";

// type: resale/commercial
// data: array of json properties
const Slider = ({ data, type }) => {
  const scrollRef = useRef(null); //used to hold scroll value
  const cardRef = useRef(null); //used to hold card width value
  const { isMobileView } = useDeviceView();
  const sliderData = Array.isArray(data) ? data : [];
  //business is returned as Sale of business so we need to modify it to Business

  const slideLeft = () => {
    const scrollContainer = scrollRef.current;
    const cardWidth = cardRef.current.offsetWidth;
    let scrollAmount; // Adjust the scroll amount as needed
    if (!isMobileView) {
      scrollAmount = cardWidth * 3;
    } else {
      scrollAmount = cardWidth * 1;
    }
    scrollContainer.scrollLeft -= scrollAmount;
  };

  const slideRight = () => {
    const scrollContainer = scrollRef.current;
    const cardWidth = cardRef.current.offsetWidth;
    let scrollAmount; // Adjust the scroll amount as needed
    if (!isMobileView) {
      scrollAmount = cardWidth * 3;
    } else {
      scrollAmount = cardWidth * 1;
    } // Adjust the scroll amount as needed
    scrollContainer.scrollLeft += scrollAmount;
  };

  return (
    <div className="relative flex justify-center">
      {/* <div className="btns flex justify-between">
        <button
          className=" absolute start-0"
          title="scroll left"
          onClick={slideLeft}
        >
          <SlArrowLeft size={16} color="black" />
        </button>
        <button
          className=" absolute end-0"
          title="scroll right"
          onClick={slideRight}
        >
          <SlArrowRight size={16} color="black" />
        </button>
      </div> */}
      <div
        className={`w-full grid grid-rows-1 grid-cols-2 sm:grid-cols-4 overflow-x-hidden grid-nowrap justify-between sm:py-3 gap-4 auto-rows-[minmax(100px,_auto)]`}
        id="slider"
        ref={scrollRef}
      >
        {sliderData.map((curElem, index) => {
          if (
            curElem.ListingKey !== "C8446018" &&
            curElem.ListingKey !== "C8450446"
          ) {
            //manual removal, to be removed later
            return (
              <div className="my-2 sm:my-0 row-auto" key={index} ref={cardRef}>
                {
                  <>
                    <ResaleCard curElem={curElem} />
                  </>
                }
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Slider;
