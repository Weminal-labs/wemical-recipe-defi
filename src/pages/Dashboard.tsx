import React from "react";
import { Recipe } from "./Recipe";

export const Dashboard = () => {
  return (
    <>
      <Recipe />
      <Recipe />
      <Recipe />
      <Recipe />
      <Recipe />
      <Recipe />

      <p className="absolute top-[181px] left-[406px] [font-family:'BT_Beau_Sans-Medium',Helvetica] font-medium text-white text-[28px] tracking-[-0.56px] leading-[30.8px] whitespace-nowrap">
        Feel At Home With Premade Recipe
      </p>
    </>
  );
};
