import React from "react";

interface Props {
  className: any;
}

export const BoxIcon = ({ className }: Props): JSX.Element => {
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
        d="M3.16992 7.44L11.9999 12.55L20.7699 7.47"
        stroke="#8D8B8C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path d="M12 21.61V12.54" stroke="#8D8B8C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path
        d="M9.92965 2.48001L4.58965 5.44001C3.37965 6.11001 2.38965 7.79001 2.38965 9.17001V14.82C2.38965 16.2 3.37965 17.88 4.58965 18.55L9.92965 21.52C11.0696 22.15 12.9396 22.15 14.0796 21.52L19.4196 18.55C20.6296 17.88 21.6196 16.2 21.6196 14.82V9.17001C21.6196 7.79001 20.6296 6.11001 19.4196 5.44001L14.0796 2.47001C12.9296 1.84001 11.0696 1.84001 9.92965 2.48001Z"
        stroke="#8D8B8C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
