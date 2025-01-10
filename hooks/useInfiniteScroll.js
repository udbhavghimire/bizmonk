import { useState, useEffect } from "react";

export function useInfiniteScroll(callback) {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollHeight - scrollTop <= clientHeight * 1.5) {
        setIsFetching(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;

    callback().then(() => {
      setIsFetching(false);
    });
  }, [isFetching, callback]);

  return [isFetching, setIsFetching];
}
