import Link from "next/link";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="flex justify-center max-w-5xl mx-auto bg-black/10 border rounded-md py-10 shadow-md">
      <Link href="/" className="flex gap-4 items-center">
        <svg
          width="45"
          height="45"
          viewBox="0 0 45 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_3_11)">
            <path
              d="M22.5 3.75C12.8062 3.75 4.78272 11.175 3.84521 20.625H17.2119C17.9994 18.45 20.0625 16.875 22.5 16.875C24.9375 16.875 27.0006 18.45 27.7881 20.625H41.1548C40.2173 11.175 32.1938 3.75 22.5 3.75ZM22.5 20.625C21.4645 20.625 20.625 21.4645 20.625 22.5C20.625 23.5355 21.4645 24.375 22.5 24.375C23.5355 24.375 24.375 23.5355 24.375 22.5C24.375 21.4645 23.5355 20.625 22.5 20.625ZM3.84521 24.375C4.78271 33.825 12.8062 41.25 22.5 41.25C32.1938 41.25 40.2173 33.825 41.1548 24.375H27.7881C27.0006 26.55 24.9375 28.125 22.5 28.125C20.0625 28.125 17.9994 26.55 17.2119 24.375H3.84521Z"
              fill="#FF5350"
            />
          </g>
          <defs>
            <clipPath id="clip0_3_11">
              <rect width="45" height="45" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <span className="text-lg font-medium text-white">Home</span>
      </Link>
    </div>
  );
};

export default Header;
