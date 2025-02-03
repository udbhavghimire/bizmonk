import { commercial } from "../api/routes/fetchRoutes";

export const generateImageURLs = (id) => {
  const images = [];

  for (let i = 1; i <= 10; i++) {
    const imgSrc = `${commercial.photos}?id=${id}&index=${i}`;
    images.push(imgSrc);
  }

  return images;
};
