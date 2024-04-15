import React from "react";
import { ArrowRight } from "../icons/ArrowRight";
import Spline from "@splinetool/react-spline";
import { ConnectButton } from "@mysten/dapp-kit";

export const Home = () => {
  return (
    <div className="bg-black flex flex-row justify-center w-full">
      <div className="bg-black w-[1920px] h-[1080px]">
        <div className="relative h-[1080px]">
          <div className="absolute top-[34px] left-[337px] [font-family:'Specify_PERSONAL_Expanded-BoldItalic',Helvetica] font-bold italic text-white text-[24px] tracking-[0.48px] leading-[70px] whitespace-nowrap">
            wemical
          </div>
          <div className="inline-flex items-center justify-center gap-[10px] px-[20px] py-[12px] absolute top-[46px] left-[1418px] bg-white rounded-[31px]">
            <ConnectButton />
          </div>
          <img
            className="absolute w-[1185px] h-[1023px] top-[55px] left-0"
            alt="Eclipse"
            src="/img/eclipse.png"
          />
          <Spline scene="https://prod.spline.design/H0cVvqv9KSTKWmTU/scene.splinecode" />
          <div className="absolute top-[440px] left-[337px] [font-family:'Specify_PERSONAL_Expanded-Black',Helvetica] font-black text-white text-[60px] tracking-[1.20px] leading-[70px] whitespace-nowrap">
            DEAR SUIANS
          </div>
          <p className="absolute top-[498px] left-[337px] [font-family:'BT_Beau_Sans-Light',Helvetica] font-light text-[#cfcfcf] text-[18px] tracking-[0.36px] leading-[70px] whitespace-nowrap">
            let's create some cooking recipe with wemical
          </p>
          <div className="inline-flex items-center gap-[13px] absolute top-[569px] left-[337px]">
            <div className="relative w-fit mt-[-1.00px] [font-family:'BT_Beau_Sans-Medium',Helvetica] font-medium text-white text-[18px] tracking-[0.36px] leading-[70px] whitespace-nowrap">
              CLICK TO EXPLORE
            </div>
            <ArrowRight className="!relative !w-[24px] !h-[24px]" />
          </div>
          <img
            className="absolute w-[1920px] h-[1080px] top-0 left-0"
            alt="Frame"
            src="/img/background.png"
          />
        </div>
      </div>
    </div>
  );
};
