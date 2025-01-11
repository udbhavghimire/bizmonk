import Link from "next/link";
import React from "react";

const TextWithContactButton = ({ title, subtitle, textContent, imgSrc }) => {
  return (
    <div class="flex justify-between max-w-7xl mx-auto items-center px-12 my-20 w-full">
      <div class="max-w-lg">
        <h1 class="text-4xl font-serif mb-6 text-black">{title}</h1>
        <h2 class="text-2xl font-bold mb-4 text-black">{subtitle}</h2>
        <p class="text-lg mb-4 text-black">{textContent}</p>

        <Link
          href="tel:(647) 123-4567"
          class="px-6 py-2 text-lg font-semibold text-white bg-black rounded hover:bg-gray-800"
        >
          Contact us
        </Link>
      </div>
      <div class="w-1/2">
        <img
          src={imgSrc}
          alt="Franchise Image"
          class="w-full m-10 rounded-lg"
        />
      </div>
    </div>
  );
};

export default TextWithContactButton;
