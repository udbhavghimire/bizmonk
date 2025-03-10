"use client";
import React, { useRef, useState } from "react";
import BookingType from "./BookingType";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import BookingDateOption from "./BookingDateOption";
import TimingList from "./TimingList";
import { sendEmail } from "@/api/resend";

const DateSelector = ({ showBookingType = true }) => {
  // const [scrollPosition, setScrollPosition] = useState(0);
  // const [maxScroll, setMaxScroll] = useState(0);
  const cardRef = useRef(null);

  //slide right and left code for cardref and containerref
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [phone, setPhone] = useState("");
  const [timing, setTiming] = useState({
    type: "",
    date: "",
    time: "",
    phoneNumber: "",
    name: "",
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedType, setSelectedType] = useState('in-person');

  const slideLeft = (e) => {
    e.preventDefault();
    const scrollContainer = scrollRef.current;
    const cardWidth = cardRef.current.offsetWidth;
    const scrollAmount = 300; // Adjust the scroll amount as needed
    scrollContainer.scrollLeft -= scrollAmount;
  };

  const slideRight = (e) => {
    e.preventDefault();
    const scrollContainer = scrollRef.current;
    const cardWidth = cardRef.current.offsetWidth;
    const scrollAmount = 300; // Adjust the scroll amount as needed
    scrollContainer.scrollLeft += scrollAmount;
  };
  function getDaysInMonth(year, month) {
    // Get the number of days in a month
    return new Date(year, month + 1, 0).getDate();
  }

  function getSevenDaysStartingTomorrow() {
    const today = new Date();
    const daysArray = [];

    for (let i = 1; i <= 8; i++) {
      const date = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + i
      );
      const day = date.getDate();
      const dayName = date
        .toLocaleDateString("en-US", { weekday: "long" })
        .slice(0, 3);
      const monthName = date
        .toLocaleDateString("default", { month: "long" })
        .slice(0, 3);
      const month = date.getMonth() + 1; // Month is 0-indexed, so we add 1 to get the correct month
      const year = date.getFullYear();

      daysArray.push({
        day,
        dayName,
        month: monthName,
        monthNumber: month,
        year,
        selected: false,
      });
    }

    // daysArray.unshift({
    //   day: "Any",
    //   month: "",
    //   dayName: "",
    //   selected: false,
    //   time: "",
    // });

    return daysArray;
  }
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const [daysArray, setDaysArray] = useState(
    getSevenDaysStartingTomorrow(year, month)
  );
  const selectOption = (e, data) => {
    const updatedDaysArray = daysArray.map((day) => {
      if (day.day === data.day) {
        return { ...day, selected: true };
      } else {
        return { ...day, selected: false };
      }
    });
    setDaysArray(updatedDaysArray);
    handleChange(e);
  };

  const handleChange = (e) => {
    const { id, value } = e.currentTarget;
    setTiming((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const submitData = async () => {
    await sendEmail({
      content: timing,
      page: address,
      title: `Inquiry for property ${address}`,
    });
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {showBookingType && (
        <BookingType selectedType={selectedType} onTypeChange={handleTypeChange} />
      )}
      
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Select Date</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {dates.map((date) => (
            <BookingDateOption
              key={date.toISOString()}
              date={date}
              isSelected={selectedDate?.toDateString() === date.toDateString()}
              onSelect={handleDateSelect}
            />
          ))}
        </div>
      </div>

      {selectedDate && (
        <TimingList
          selectedTime={selectedTime}
          onTimeSelect={handleTimeSelect}
        />
      )}

      <div className="relative mb-1 mt-4 w-full">
        <input
          type="text"
          name="name"
          id="name"
          placeholder=""
          value={timing.name}
          onChange={(e) => handleChange(e)}
          required={true}
          className="rounded-full bg-white mt-4 fff w-full px-4 pt-5 pb-1 border-b-2 focus:outline-none peer/bookshowingName placeholder:translate-y-1/2 placeholder:scale-100"
        />
        <label
          htmlFor="name"
          className="absolute left-0 top-5 px-4 text-gray-500 transition-all duration-300 peer-focus/bookshowingName:-translate-y-[0.85] peer-focus/bookshowingName:scale-30 peer-placeholder-shown/bookshowingName:translate-y-1/4 peer-placeholder-shown/bookshowingName:scale-100"
        >
          Name
        </label>
      </div>
      <div className="relative mb-3 w-full">
        <input
          type="text"
          inputMode="numeric"
          name="phone"
          id="phoneNumber"
          placeholder=""
          value={timing.phoneNumber}
          onChange={(e) => handleChange(e)}
          required={true}
          className="rounded-full bg-white mt-4 fff w-full px-4 pt-5 pb-1 border-b-2 focus:outline-none peer/bookshowingPhone placeholder:translate-y-1/2 placeholder:scale-100 "
        />
        <label
          htmlFor="phoneNumber"
          className="absolute left-0 top-5 px-4 text-gray-500 transition-all duration-300 peer-focus/bookshowingPhone:-translate-y-[0.85] peer-focus/bookshowingPhone:scale-30 peer-placeholder-shown/bookshowingPhone:translate-y-1/4 peer-placeholder-shown/bookshowingPhone:scale-100"
        >
          Phone
        </label>
      </div>

      <input
        type="submit"
        value="Schedule Tour"
        className="px-4 py-2 bg-black text-white md:py-2 w-40 mb-3 rounded-full hover:cursor-pointer mx-auto text-lg"
        id="subbtn"
        onClick={submitData}
      />
    </div>
  );
};

export default DateSelector;
