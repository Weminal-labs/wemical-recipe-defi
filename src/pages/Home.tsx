import React from "react";
import { ArrowRight } from "../icons/ArrowRight";
import Spline from "@splinetool/react-spline";
import { ConnectButton } from "@mysten/dapp-kit";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="bg-black flex flex-row justify-center w-full">
      <div className="bg-black overflow-hidden w-full h-full">
        <div className="relative h-[1080px]">
          <div className="flex w-full justify-between">
            <div className="[font-family:'Specify_PERSONAL_Expanded-BoldItalic',Helvetica] font-bold italic text-white text-[24px] tracking-[0.48px] leading-[70px] whitespace-nowrap ml-[21%] mt-6">
              wemical
            </div>
            <Link
              className="ml-5 w-full no-underline z-10"
              to="/explore/recipe"
            >
              <div className="[font-family:'Specify_PERSONAL_Expanded-BoldItalic',Helvetica] font-bold italic text-white text-[24px] tracking-[0.48px] leading-[70px] whitespace-nowrap  mt-6">
                Explore
              </div>
            </Link>
            <div className="gap-[10px] px-[20px] py-[12px] bg-white rounded-[31px] mr-[15%] mt-6 z-10">
              <ConnectButton />
            </div>
          </div>
          <img
            className="absolute w-[1185px] h-[1023px] top-[55px] left-0"
            alt="Eclipse"
            src="/img/eclipse.png"
          />
          <Spline scene="https://prod.spline.design/H0cVvqv9KSTKWmTU/scene.splinecode" />
          <div className="absolute top-[440px] left-[337px]">
            <div className=" [font-family:'Specify_PERSONAL_Expanded-Black',Helvetica] font-black text-white text-[60px] tracking-[1.20px] leading-[70px] whitespace-nowrap">
              DEAR SUIANS
            </div>
            <p className="[font-family:'BT_Beau_Sans-Light',Helvetica] font-light text-[#cfcfcf] text-[18px] tracking-[0.36px] leading-[70px] whitespace-nowrap">
              Let's create some cooking recipe with wemical
            </p>
            <Link className="w-full no-underline z-10" to="/explore/recipe">
              <div className="inline-flex items-center gap-[13px]">
                <div className="relative w-fit mt-[-1.00px] [font-family:'BT_Beau_Sans-Medium',Helvetica] font-medium text-white text-[18px] tracking-[0.36px] leading-[70px] whitespace-nowrap">
                  CLICK TO EXPLORE
                </div>
                <ArrowRight className="!relative !w-[24px] !h-[24px]" />
              </div>
            </Link>
          </div>
          <img
            className="absolute w-full h-[1080px] top-0 left-0"
            alt="Frame"
            src="/img/background.png"
          />
        </div>
      </div>
    </div>
  );
};
