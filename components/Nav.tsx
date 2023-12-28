"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [isClink, setisClick] = useState(false);

  const toggleNavbar = (): void => {
    setisClick(!isClink);
  };
  return (
    <>
      <nav className="bg-white shadow-sm shadow-text/20 mb-2 md:mb-3">
        <div className="w-full mx-auto  md:px-6 lg:px-8">
          <div className="flex items-center md:justify-between h-16">
            <div className="flex mx-auto md:mx-0 md:items-center">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                >
                  <g transform="rotate(90 24 24)">
                    <defs>
                      <mask id="ipTDirectionAdjustmentTwo0">
                        <g
                          fill="none"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="4"
                        >
                          <path
                            d="m18 10l6-6m0 0l6 6m-6-6v10m-6 24l6 6m0 0l6-6m-6 6V34m14-16l6 6m0 0l-6 6m6-6H34m-24-6l-6
                                         6m0 0l6 6m-6-6h10"
                          />
                          <circle cx="24" cy="24" r="4" fill="#555" />
                        </g>
                      </mask>
                    </defs>
                    <path
                      fill="currentColor"
                      d="M0 0h48v48H0z"
                      mask="url(#ipTDirectionAdjustmentTwo0)"
                    />
                  </g>
                </svg>
                <Link
                  href="/"
                  className="text-primary  text-2xl font-extrabold ml-2"
                >
                  KNELETROMATH
                </Link>
              </div>
            </div>
            <div className="flex">
              <div className="hidden md:block">
                <div className="ml-4 flex items-center space-x-4 font-bold">
                  <Link
                    href="/"
                    className="hover:text-primary link-hover rounded-lg  p-2"
                  >
                    Home
                  </Link>
                  <Link
                    href="/graph"
                    className="hover:text-primary link-hover  rounded-lg p-2"
                  >
                    Graph
                  </Link>
                  <Link
                    href="/setting"
                    className="hover:text-primary link-hover rounded-lg p-2"
                  >
                    Setting
                  </Link>
                </div>
              </div>
            </div>
            <div className="md:hidden flex items-center">
              <button
                className="inline-flex items-center text-primary justify-center p-2 rounded-md black
                              hover:text-secondary focus:outling-none focus:ring-2 focus:ring-inset "
                onClick={toggleNavbar}
              >
                {isClink ? (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {isClink && (
          <div className="px-2 pt-2 pb-3 space-y- sm:-px-3 text-center bg-background rounded-xl ">
            <Link
              href="/"
              className="hover:text-primary block  hover:font-semibold hover:bg-gray-100 text-black bg-white rounded-lg p-2"
            >
              Home
            </Link>
            <Link
              href="/graph"
              className="hover:text-primary hover:font-semibold block hover:bg-gray-100 text-black rounded-lg p-2"
            >
              Graph
            </Link>
            <Link
              href="/setting"
              className="hover:text-primary block  hover:font-semibold hover:bg-gray-100 text-black rounded-lg p-2"
            >
              Setting
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
