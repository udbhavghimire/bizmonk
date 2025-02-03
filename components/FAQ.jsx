"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

const FAQ = ({ main_data }) => {
  return (
    <div className="w-full">
      <h2 className="font-bold pb-3 text-2xl sm:text-4xl mb-4 text-left">
        Some information about this property - {main_data.Address}
      </h2>
      <Accordion 
        variant="splitted" 
        className="px-0 w-full flex flex-col items-start"
        itemClasses={{
          title: "text-left w-full",
          content: "text-left w-full"
        }}
      >
        <AccordionItem
          key="1"
          aria-label="Accordion 1"
          title="What type of property is this?"
          className="w-full"
        >
          <div className="text-[1rem]">
            This is a {main_data.TypeOwn1Out ? main_data.TypeOwn1Out.toLowerCase() : 'commercial'} property.
          </div>
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Accordion 2"
          title="How many bedrooms and bathrooms does this property have ?"
          className="w-full"
        >
          <div className="text-[1rem]">
            This property has {main_data.Bedrooms || 'N/A'} bedrooms and{" "}
            {main_data.Washrooms || 'N/A'} bathrooms.
          </div>
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Accordion 2"
          title="How many parking spaces are available?"
          className="w-full"
        >
          <div className="text-[1rem]">
            There are {main_data.ParkingSpaces || 'N/A'} parking spaces.
          </div>
        </AccordionItem>
        <AccordionItem
          key="4"
          aria-label="Accordion 3"
          title="Where is this property located?"
          className="w-full"
        >
          <div className="text-[1rem]">
            This property is located in{" "}
            {main_data.Community ? main_data.Community : ""} {main_data?.Street || ''}{" "}
            {main_data?.StreetName || ''} {main_data?.StreetAbbreviation || ''}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQ;
