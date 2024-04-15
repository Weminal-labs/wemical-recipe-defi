import { ConnectButton } from "@mysten/dapp-kit";
import React from "react";
import { BookIcon } from "../icons/BookIcon";
import { BoxIcon, DashboardIcon } from "@radix-ui/react-icons";
import { SearchIcon } from "../icons/SearchIcon";
import { Link, Outlet } from "react-router-dom";

export const RecipeLayout = () => {
  return (
    <div className="bg-black flex flex-row justify-center w-full">
      <div className="bg-black overflow-hidden w-[1920px] ">
        <div className="relative w-[2024px]Link h-[1280px] left-[-69px]">
          <div className="absolute w-[1575px] h-[1280px] top-0 left-0">
            <div className="absolute w-[983px] h-[1280px] top-0 left-0">
              <div className="flex flex-col w-[300px] h-full items-center gap-[var(--collection-1-4)] pr-[var(--collection-1-1)] pl-[var(--collection-1-1)] py-[60px] absolute top-0 left-[69px] border-r [border-right-style:solid] border-[#3b3b3b]">
                <div className="flex items-center gap-[var(--collection-1-1)] pt-[var(--collection-1-1)] pb-[var(--collection-1-1)] px-[12px] relative self-stretch w-full flex-[0_0_auto] rounded-[13px] border border-solid border-[#8d8b8c]">
                  <SearchIcon className="!relative !w-[24px] !h-[24px]" />
                  <div className="relative w-fit font-subtitle font-[number:var(--subtitle-font-weight)] text-[#8d8b8c] text-[length:var(--subtitle-font-size)] tracking-[var(--subtitle-letter-spacing)] leading-[var(--subtitle-line-height)] whitespace-nowrap [font-style:var(--subtitle-font-style)]">
                    Search
                  </div>
                </div>
                <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] gap-[var(--collection-1-0)]">
                  <Link className="w-full no-underline" to="/explore/">
                    <div className="flex items-center gap-[var(--collection-1-1)] pt-[var(--collection-1-1)] pb-[var(--collection-1-1)] px-[12px] relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[12px]">
                      <DashboardIcon
                        className="!relative !w-[24px] !h-[24px]"
                        color="black"
                      />
                      <div className="relative w-fit [font-family:'BT_Beau_Sans-Medium',Helvetica] font-medium text-black text-[18px] tracking-[-0.36px] leading-[21.6px] whitespace-nowrap">
                        Dashboard
                      </div>
                    </div>
                  </Link>
                  <div className="flex items-center gap-[var(--collection-1-1)] pt-[var(--collection-1-1)] pb-[var(--collection-1-1)] px-[12px] relative self-stretch w-full flex-[0_0_auto] rounded-[8px]">
                    <BoxIcon className="!relative !w-[24px] !h-[24px]" />
                    <div className="relative w-[232px] mr-[-28.00px] [font-family:'BT_Beau_Sans-Medium',Helvetica] font-medium text-[#8d8b8c] text-[18px] tracking-[-0.36px] leading-[21.6px]">
                      Portfolio
                    </div>
                  </div>
                  <Link
                    className="w-full no-underline"
                    to="/explore/recipe"
                  >
                    <div className="flex items-center gap-[var(--collection-1-1)] pt-[var(--collection-1-1)] pb-[var(--collection-1-1)] px-[12px] relative self-stretch w-full flex-[0_0_auto] rounded-[8px]">
                      <BookIcon className="!relative !w-[24px] !h-[24px]" />
                      <div className="relative w-fit [font-family:'BT_Beau_Sans-Medium',Helvetica] font-medium text-[#8d8b8c] text-[18px] tracking-[-0.36px] leading-[21.6px] whitespace-nowrap">
                        Recipe hub
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute top-[34px] left-[406px] [font-family:'Specify_PERSONAL_Expanded-BoldItalic',Helvetica] font-bold italic text-white text-[24px] tracking-[0.48px] leading-[70px] whitespace-nowrap">
              wemical
            </div>
            <Outlet />
          </div>
          <div className="inline-flex items-center justify-center gap-[10px] px-[20px] py-[12px] absolute top-[46px] left-[1210px] bg-white rounded-[31px]">
            <div className="relative w-fit mt-[-1.00px] [font-family:'BT_Beau_Sans-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal]">
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
