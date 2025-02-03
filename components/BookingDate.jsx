"use client";
import React from "react";
import { useRef, useState, useEffect } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import BookingDateOption from "./BookingDateOption";
import TimingList from "./TimingList";
import BookingType from "./BookingType";
import DateSelector from "./DateSelector";
import Image from "next/image";
import { getImageUrls } from "@/api/getImageUrls";

const BookingDate = ({ listingId }) => {
  // const [scrollPosition, setScrollPosition] = useState(0);
  // const [maxScroll, setMaxScroll] = useState(0);
  const cardRef = useRef(null);

  //slide right and left code for cardref and containerref
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [phone, setPhone] = useState("");
  const [loadingImage, setLoadingImage] = useState(true);
  const [imgUrl, setImgUrl] = useState(null);
  const [timing, setTiming] = useState({
    type: "",
    date: "",
    time: "",
    phone: "",
  });

  useEffect(() => {
    const fetchImage = async () => {
      console.log('Starting fetchImage with ListingKey:', listingId); // Debug log
      if (!listingId) {
        console.log('No ListingKey provided, setting loading to false'); // Debug log
        setLoadingImage(false);
        return;
      }

      try {
        setLoadingImage(true);
        console.log('Fetching image URLs...'); // Debug log
        const urls = await getImageUrls({ 
          ResourceRecordKey: listingId,  // Using listingId as ResourceRecordKey
          thumbnailOnly: false 
        });
        console.log('Received URLs:', urls); // Debug log
        
        if (urls?.length > 0) {
          console.log('Setting first image URL:', urls[0]); // Debug log
          setImgUrl(urls[0]);
        } else {
          console.log('No URLs received or empty array'); // Debug log
          setImgUrl(null);
        }
      } catch (error) {
        console.error('Error fetching image:', error);
        setImgUrl(null);
      } finally {
        setLoadingImage(false);
      }
    };

    fetchImage();
  }, [listingId]);

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

    for (let i = 1; i <= 7; i++) {
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

    // select option for any date
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

  const submitData = () => {};

  return (
    <div
      className="relative z-0 w-full rounded-md bg-very-light-gray flex items-center mt-12 sm:mt-24"
      id="bookdate"
    >
      <div className="flex sm:flex-row flex-col w-full overflow-hidden">
        <div className="w-full sm:w-1/2 relative h-[300px] sm:h-auto">
          {loadingImage ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 animate-pulse">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : imgUrl ? (
            <div className="relative w-full h-full">
              <Image
                src={imgUrl}
                alt="Schedule viewing"
                fill
                className="object-cover rounded-t-md sm:rounded-l-md sm:rounded-t-none"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={true}
              />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center bg-gray-50">
              <img src="/icons/no-photo.png" className="w-10 h-10" alt="No photo" />
              <p className="text-gray-500 mt-2">No Image Available</p>
            </div>
          )}
        </div>
        <div className="w-full sm:w-1/2 sm:mx-2 p-4 flex flex-col justify-center items-center">
          {/**Schedule a viewing form */}
          <h1 className="font-bold text-3xl my-2 text-center">
            Schedule a viewing
          </h1>
          <DateSelector />
        </div>
      </div>
    </div>
  );
};

export default BookingDate;
