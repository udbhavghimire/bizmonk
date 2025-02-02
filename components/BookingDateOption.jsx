"use client";
import React from "react";

const BookingDateOption = ({ date, isSelected, onSelect }) => {
  const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
  const monthName = date.toLocaleDateString("en-US", { month: "short" });
  const dayNumber = date.getDate();

  return (
    <button
      className={`p-3 rounded-md text-center transition-colors ${
        isSelected
          ? "bg-primary text-white"
          : "bg-gray-100 hover:bg-gray-200 text-gray-800"
      }`}
      onClick={() => onSelect(date)}
    >
      <div className="text-sm font-medium">{dayName}</div>
      <div className="text-xs opacity-75">{monthName}</div>
      <div className="text-lg font-bold">{dayNumber}</div>
    </button>
  );
};

export default BookingDateOption;
