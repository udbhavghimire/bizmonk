import { cities } from "@/constant/cities";
const { usePathname } = require("next/navigation");

export const useWidePage = () => {
  const pathname = usePathname();
  if (cities.some((cityObj) => pathname.includes(cityObj.name.toLowerCase()))) {
    return [true];
  }
  return [false];
};
