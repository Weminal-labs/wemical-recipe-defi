import React from "react";

interface Props {
  className: any;
}

export const ExchangeIcon = ({ className }: Props): JSX.Element => {
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
        d="M2 17.06H12"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M4.21997 13.5H9.78003C11.56 13.5 12 13.94 12 15.7V19.81C12 21.57 11.56 22.01 9.78003 22.01H4.21997C2.43997 22.01 2 21.57 2 19.81V15.7C2 13.94 2.43997 13.5 4.21997 13.5Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M22 15C22 18.87 18.87 22 15 22L16.05 20.25"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M2 9C2 5.13 5.13 2 9 2L7.95001 3.75"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M18.5 11C20.9853 11 23 8.98528 23 6.5C23 4.01472 20.9853 2 18.5 2C16.0147 2 14 4.01472 14 6.5C14 8.98528 16.0147 11 18.5 11Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
