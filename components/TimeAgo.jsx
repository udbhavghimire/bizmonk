"use client";
import React, { useState, useEffect } from "react";

function TimeAgo({ modificationTimestamp }) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    if (!modificationTimestamp) {
      setTimeAgo("No timestamp available");
      return;
    }

    const calculateTimeAgo = () => {
      // Parse the UTC timestamp
      const modificationTime = new Date(modificationTimestamp);
      const currentTime = new Date();

      // Calculate the time difference in seconds
      const timeDifferenceSeconds = Math.floor(
        (currentTime - modificationTime) / 1000
      );

      // If the timestamp is in the future (listing not yet active)
      if (timeDifferenceSeconds < 0) {
        return "Coming soon";
      }

      // Define time units in seconds
      const minute = 60;
      const hour = minute * 60;
      const day = hour * 24;
      const week = day * 7;
      const month = day * 30;
      const year = day * 365;

      // Calculate the appropriate time unit
      if (timeDifferenceSeconds < minute) {
        return timeDifferenceSeconds === 1
          ? "1 second ago"
          : `${timeDifferenceSeconds} seconds ago`;
      } else if (timeDifferenceSeconds < hour) {
        const minutes = Math.floor(timeDifferenceSeconds / minute);
        return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
      } else if (timeDifferenceSeconds < day) {
        const hours = Math.floor(timeDifferenceSeconds / hour);
        return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
      } else if (timeDifferenceSeconds < week) {
        const days = Math.floor(timeDifferenceSeconds / day);
        return days === 1 ? "1 day ago" : `${days} days ago`;
      } else if (timeDifferenceSeconds < month) {
        const weeks = Math.floor(timeDifferenceSeconds / week);
        return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
      } else if (timeDifferenceSeconds < year) {
        const months = Math.floor(timeDifferenceSeconds / month);
        return months === 1 ? "1 month ago" : `${months} months ago`;
      } else {
        const years = Math.floor(timeDifferenceSeconds / year);
        return years === 1 ? "1 year ago" : `${years} years ago`;
      }
    };

    // Initial calculation
    setTimeAgo(calculateTimeAgo());

    // Update every minute
    const intervalId = setInterval(() => {
      setTimeAgo(calculateTimeAgo());
    }, 60000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [modificationTimestamp]);

  // Only log if modificationTimestamp exists
  // if (modificationTimestamp) {
  //   console.log(new Date(modificationTimestamp).toLocaleString("en-US"));
  // }

  return <>{timeAgo}</>;
}

export default TimeAgo;
