import Link from "next/link";
import React from "react";

const TextWithContactButton = ({ title, subtitle, textContent, imgSrc }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between max-w-7xl mx-auto px-4 sm:px-6 items-center py-24 w-full text-center sm:text-left">
      <div className="max-w-lg sm:w-1/2">
        <h1 className="text-4xl font-serif mb-6 text-black">{title}</h1>
        <h2 className="text-2xl font-bold mb-4 text-black">{subtitle}</h2>
        <img
          src={imgSrc}
          alt="Franchise Image"
          className="w-full mt-5 sm:m-10 rounded-lg sm:hidden"
        />
        <p className="text-md sm:text-lg mb-4 text-black mt-5 sm:mt-0">
          {textContent}
        </p>

        <Link
          href="tel:(647) 123-4567"
          className="px-6 py-2 text-lg font-semibold text-white bg-black rounded hover:bg-gray-800"
        >
          Contact us
        </Link>
      </div>
      <div className="w-full h-full sm:w-1/2">
        <img
          src={imgSrc}
          alt="Franchise Image"
          className="sm:h-[500px] sm:w-[300px] md:h-[500px] md:w-full mt-5 md:m-0 sm:m-10 rounded-lg hidden sm:block object-cover"
        />
      </div>
    </div>
  );
};

export default TextWithContactButton;
