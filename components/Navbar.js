"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useWidePage } from "@/hooks/useWidePage";
import SearchBar from "@/components/SearchBar";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSellingOpen, setIsSellingOpen] = useState(false);
  const [isFranchiseOpen, setIsFranchiseOpen] = useState(false);
  const [isWidePage] = useWidePage();
  const pathname = usePathname();
  const isHomepage = pathname == "/";
  const navigation = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Franchise",
      items: [
        {
          name: "Mary Brown's Chicken",
          href: "/franchise-opportunity/ontario/mary-browns-chicken",
        },
        {
          name: "Fat Bastard Burrito",
          href: "/franchise-opportunity/ontario/fat-bastard-burrito",
        },
        {
          name: "Wingsup",
          href: "/franchise-opportunity/ontario/wingsup",
        },
        {
          name: "Burger King",
          href: "/franchise-opportunity/ontario/burger-king",
        },
        {
          name: "Burrito Jax",
          href: "/franchise-opportunity/ontario/burrito-jax",
        },
        {
          name: "Boston Pizza",
          href: "/franchise-opportunity/ontario/boston-pizza",
        },
        {
          name: "Naturals2Go",
          href: "/franchise-opportunity/ontario/naturals2go",
        },
        // {
        //   name: "A&W Restaurant",
        //   href: "/franchise-opportunity/ontario/a&w-restaurant",
        // },
        {
          name: "Charleys Philly Steak",
          href: "/franchise-opportunity/ontario/charleys-philly-steak",
        },
        {
          name: "Potikki's",
          href: "/franchise-opportunity/ontario/potikkis",
        },
      ],
    },
    {
      name: "Selling",
      items: [
        { name: "Sell Your Business", href: "/sell-your-business" },
        { name: "Find a Broker", href: "/find-broker" },
        { name: "Sign Up as a Broker", href: "/broker-signup" },
        { name: "Advertise a Franchise", href: "/advertise-franchise" },
      ],
    },
    // { name: "Buying", href: "/buying" },
    // { name: "Valuation", href: "/valuation" },
    { name: "About Us", href: "/about" },
    { name: "Resources", href: "/resources" },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex justify-between h-16">
          {/* Logo and Search Bar */}
          <div className="flex items-center gap-x-3">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/bizmonk-logo.png"
                  alt="Bizmonk"
                  width={100}
                  height={100}
                />
              </Link>
            </div>

            <div className="">
              <SearchBar />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navigation.map((item) =>
              item.items ? (
                <div key={item.name} className="relative">
                  <button
                    className="text-gray-600 hover:text-primary transition-colors duration-200 flex items-center gap-1"
                    onClick={() => {
                      if (item.name === "Franchise") {
                        setIsFranchiseOpen(!isFranchiseOpen);
                        setIsSellingOpen(false);
                      } else if (item.name === "Selling") {
                        setIsSellingOpen(!isSellingOpen);
                        setIsFranchiseOpen(false);
                      }
                    }}
                  >
                    {item.name}
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>

                  {((item.name === "Franchise" && isFranchiseOpen) ||
                    (item.name === "Selling" && isSellingOpen)) && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            setIsFranchiseOpen(false);
                            setIsSellingOpen(false);
                          }}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-primary transition-colors duration-200"
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex  p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-50 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out md:hidden`}
      >
        {/* Overlay */}
        <div
          className={`${
            isMenuOpen ? "opacity-100" : "opacity-0"
          } absolute inset-0 bg-black/20 transition-opacity duration-300 ease-in-out`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu content */}
        <div className="relative bg-white h-full w-4/5 max-w-sm shadow-xl flex flex-col">
          <div className="px-4 pt-5 pb-6 space-y-6">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-blue-600 text-transparent bg-clip-text">
                  Bizmonk
                </span>
              </Link>
              <button
                type="button"
                className="rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-col space-y-1">
              {navigation.map((item) =>
                item.items ? (
                  <div key={item.name}>
                    <button
                      className="w-full px-3 py-4 text-left text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md flex items-center justify-between"
                      onClick={() => {
                        if (item.name === "Franchise") {
                          setIsFranchiseOpen(!isFranchiseOpen);
                          setIsSellingOpen(false);
                        } else if (item.name === "Selling") {
                          setIsSellingOpen(!isSellingOpen);
                          setIsFranchiseOpen(false);
                        }
                      }}
                    >
                      {item.name}
                      <ChevronDownIcon className="h-4 w-4" />
                    </button>
                    {((item.name === "Franchise" && isFranchiseOpen) ||
                      (item.name === "Selling" && isSellingOpen)) && (
                      <div className="pl-4">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-3 py-3 text-sm text-gray-600 hover:text-primary hover:bg-gray-50"
                            onClick={() => {
                              setIsFranchiseOpen(false);
                              setIsSellingOpen(false);
                              setIsMenuOpen(false);
                            }}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-3 py-4 text-base font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Bottom section */}
          <div className="mt-auto p-4 border-t border-gray-200">
            <Link
              href="/contact"
              className="w-full flex items-center justify-center px-4 py-3 text-base font-medium text-white bg-primary rounded-full hover:bg-primary/90"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
