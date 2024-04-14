import React from "react";

interface Props {
  className: any;
}

export const SwapIcon = ({ className }: Props): JSX.Element => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.5002 14.99L15.4902 20.01"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M3.5 14.99H20.5"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M3.5 9.01L8.51 3.99"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M20.5 9.01H3.5"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
    </svg>
  );
};
