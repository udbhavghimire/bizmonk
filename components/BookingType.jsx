"use client";
import React, { useState } from "react";

const BookingType = ({ selectedType, onTypeChange }) => {
  const bookingTypes = [
    { id: 'in-person', label: 'In Person' },
    { id: 'virtual', label: 'Virtual Tour' },
  ];

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold">Booking Type</h3>
      <div className="flex gap-2">
        {bookingTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onTypeChange(type.id)}
            className={`px-4 py-2 rounded-md ${
              selectedType === type.id
                ? 'bg-primary text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookingType;
