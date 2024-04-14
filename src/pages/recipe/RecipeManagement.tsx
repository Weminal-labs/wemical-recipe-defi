import React from "react";
import { SearchIcon } from "../../icons/SearchIcon";
import { DashboardIcon } from "../../icons/DashboardIcon";
import { BoxIcon } from "../../icons/BoxIcon";
import { BookIcon } from "../../icons/BookIcon";
import { ArrowDown } from "../../icons/ArrowDown";
import { SwapIcon } from "../../icons/SwapIcon";
import { AddElementIcon } from "../../icons/AddElementIcon";
import { BarcodeIcon } from "../../icons/BarcodeIcon";
import { ExchangeIcon } from "../../icons/ExchangeIcon";
import { ConnectButton } from "@mysten/dapp-kit";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Actions from '../../recipe_action/index'
import { Swap } from "../../Swap";

export const RecipeManagement = (): JSX.Element => {
  return (
    <div className="bg-black flex flex-row justify-center w-full">
      <div className="bg-black overflow-hidden w-[1920px] ">
        <div className="relative w-[2024px] h-[1280px] left-[-69px]">
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
                  <div className="flex items-center gap-[var(--collection-1-1)] pt-[var(--collection-1-1)] pb-[var(--collection-1-1)] px-[12px] relative self-stretch w-full flex-[0_0_auto] bg-white rounded-[12px]">
                    <DashboardIcon className="!relative !w-[24px] !h-[24px]" color="black" />
                    <div className="relative w-fit [font-family:'BT_Beau_Sans-Medium',Helvetica] font-medium text-black text-[18px] tracking-[-0.36px] leading-[21.6px] whitespace-nowrap">
                      Dashboard
                    </div>
                  </div>
                  <div className="flex items-center gap-[var(--collection-1-1)] pt-[var(--collection-1-1)] pb-[var(--collection-1-1)] px-[12px] relative self-stretch w-full flex-[0_0_auto] rounded-[8px]">
                    <BoxIcon className="!relative !w-[24px] !h-[24px]" />
                    <div className="relative w-[232px] mr-[-28.00px] [font-family:'BT_Beau_Sans-Medium',Helvetica] font-medium text-[#8d8b8c] text-[18px] tracking-[-0.36px] leading-[21.6px]">
                      Portfolio
                    </div>
                  </div>
                  <div className="flex items-center gap-[var(--collection-1-1)] pt-[var(--collection-1-1)] pb-[var(--collection-1-1)] px-[12px] relative self-stretch w-full flex-[0_0_auto] rounded-[8px]">
                    <BookIcon className="!relative !w-[24px] !h-[24px]" />
                    <div className="relative w-fit [font-family:'BT_Beau_Sans-Medium',Helvetica] font-medium text-[#8d8b8c] text-[18px] tracking-[-0.36px] leading-[21.6px] whitespace-nowrap">
                      Recipe hub
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-[577px] items-center justify-center gap-[var(--collection-1-1)] pt-[var(--collection-1-1)] pb-[var(--collection-1-1)] px-[12px] absolute top-[244px] left-[406px] rounded-[13px] border border-dashed border-[#8d8b8c]">
                <ArrowDown className="!relative !w-[24px] !h-[24px]" />
                <p className="relative w-fit font-subtitle font-[number:var(--subtitle-font-weight)] text-[#8d8b8c] text-[length:var(--subtitle-font-size)] tracking-[var(--subtitle-letter-spacing)] leading-[var(--subtitle-line-height)] whitespace-nowrap [font-style:var(--subtitle-font-style)]">
                  Drag, drop, change the order of actions in the box
                </p>
              </div>
            </div>
            <div className="absolute top-[350px] left-[406px] w-[1150px] h-screen">
              <DndProvider backend={HTML5Backend}>
                <Actions />
              </DndProvider>
            </div>
            <div className="absolute top-[34px] left-[406px] [font-family:'Specify_PERSONAL_Expanded-BoldItalic',Helvetica] font-bold italic text-white text-[24px] tracking-[0.48px] leading-[70px] whitespace-nowrap">
              wemical
            </div>
            <div className="inline-flex items-end gap-[466px] absolute top-[155px] left-[406px]">
              <div className="inline-flex items-center justify-center gap-[10px] px-[20px] py-[12px] relative flex-[0_0_auto] bg-white rounded-[31px]">
                <div className="relative w-fit mt-[-1.00px] [font-family:'BT_Beau_Sans-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal]">
                  Deep book
                </div>
              </div>
              <div className="inline-flex items-start gap-[16px] relative flex-[0_0_auto]">
                <div className="inline-flex h-[40px] items-center justify-center gap-[8px] px-[16px] py-0 relative flex-[0_0_auto] rounded-[8px] border border-solid border-white">
                  <SwapIcon className="!relative !w-[24px] !h-[24px]" />
                  <div className="inline-flex items-center justify-center gap-[10px] relative flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'BT_Beau_Sans-Medium',Helvetica] font-medium text-white text-[18px] tracking-[-0.36px] leading-[21.6px] whitespace-nowrap">
                      Swap
                    </div>
                  </div>
                </div>
                <div className="inline-flex h-[40px] items-center justify-center gap-[8px] px-[16px] py-0 relative flex-[0_0_auto] rounded-[8px] border border-solid border-white">
                  <AddElementIcon className="!relative !w-[24px] !h-[24px]" />
                  <div className="inline-flex items-center justify-center gap-[10px] relative flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'BT_Beau_Sans-Medium',Helvetica] font-medium text-white text-[18px] tracking-[-0.36px] leading-[21.6px] whitespace-nowrap">
                      Create pool
                    </div>
                  </div>
                </div>
                <div className="inline-flex h-[40px] items-center justify-center gap-[8px] px-[16px] py-0 relative flex-[0_0_auto] rounded-[8px] border border-solid border-white">
                  <BarcodeIcon className="!relative !w-[24px] !h-[24px]" />
                  <div className="inline-flex items-center justify-center gap-[10px] relative flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'BT_Beau_Sans-Medium',Helvetica] font-medium text-white text-[18px] tracking-[-0.36px] leading-[21.6px] whitespace-nowrap">
                      Deposit
                    </div>
                  </div>
                </div>
                <div className="inline-flex h-[40px] items-center justify-center gap-[8px] px-[16px] py-0 relative flex-[0_0_auto] rounded-[8px] border border-solid border-white">
                  <ExchangeIcon className="!relative !w-[24px] !h-[24px]" />
                  <div className="inline-flex items-center justify-center gap-[10px] relative flex-[0_0_auto]">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'BT_Beau_Sans-Medium',Helvetica] font-medium text-white text-[18px] tracking-[-0.36px] leading-[21.6px] whitespace-nowrap">
                      Orders
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute w-[653px] h-[748px] top-[347px] left-[1371px]">
            <Swap />
            {/* <div className="flex flex-wrap w-[482px] items-start gap-[117px_24px] p-[40px] absolute top-0 left-0 bg-[#2828284c] rounded-[20px] overflow-hidden border border-solid border-[#ffffff1a]">
              <div className="relative w-[246.09px] mt-[-1.00px] [font-family:'BT_Beau_Sans-Regular',Helvetica] font-normal text-white text-[32px] tracking-[0] leading-[38.4px]">
                Create a pool
              </div>
              <div className="inline-flex items-center justify-center gap-[10px] relative flex-[0_0_auto]">
                <div className="relative w-fit mt-[-1.00px] [font-family:'BT_Beau_Sans-Regular',Helvetica] font-normal text-white text-[32px] text-right tracking-[0] leading-[38.4px] whitespace-nowrap">
                  #1
                </div>
              </div>
              <div className="inline-flex flex-col items-end gap-[16px] relative flex-[0_0_auto]">
                <div className="inline-flex items-center gap-[68px] relative flex-[0_0_auto]">
                  <div className="relative w-fit font-subtitle font-[number:var(--subtitle-font-weight)] text-[#8d8b8c] text-[length:var(--subtitle-font-size)] tracking-[var(--subtitle-letter-spacing)] leading-[var(--subtitle-line-height)] whitespace-nowrap [font-style:var(--subtitle-font-style)]">
                    BASE_COIN TYPE
                  </div>
                  <div className="flex w-[186px] h-[48px] items-center justify-center gap-[var(--collection-1-1)] pt-[var(--collection-1-1)] pb-[var(--collection-1-1)] px-[12px] relative rounded-[13px] border border-solid border-[#8d8b8c]">
                    <div className="relative w-fit mt-[-4.00px] mb-[-2.00px] font-subtitle font-[number:var(--subtitle-font-weight)] text-[#ededed] text-[length:var(--subtitle-font-size)] tracking-[var(--subtitle-letter-spacing)] leading-[var(--subtitle-line-height)] whitespace-nowrap [font-style:var(--subtitle-font-style)]">
                      SUI
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-[50px] relative flex-[0_0_auto]">
                  <div className="relative w-fit font-subtitle font-[number:var(--subtitle-font-weight)] text-[#8d8b8c] text-[length:var(--subtitle-font-size)] tracking-[var(--subtitle-letter-spacing)] leading-[var(--subtitle-line-height)] whitespace-nowrap [font-style:var(--subtitle-font-style)]">
                    QUOTE_COIN TYPE
                  </div>
                  <div className="flex w-[186px] h-[48px] items-center justify-center gap-[var(--collection-1-1)] pt-[var(--collection-1-1)] pb-[var(--collection-1-1)] px-[12px] relative rounded-[13px] border border-solid border-[#8d8b8c]">
                    <div className="relative w-fit mt-[-4.00px] mb-[-2.00px] font-subtitle font-[number:var(--subtitle-font-weight)] text-[#dfdfdf] text-[length:var(--subtitle-font-size)] tracking-[var(--subtitle-letter-spacing)] leading-[var(--subtitle-line-height)] whitespace-nowrap [font-style:var(--subtitle-font-style)]">
                      TDTC
                    </div>
                  </div>
                </div>
              </div>
              <div className="inline-flex flex-col items-start gap-[8px] relative flex-[0_0_auto]">
                <p className="relative w-[310px] h-[24px] mt-[-1.00px] font-subtitle font-[number:var(--subtitle-font-weight)] text-[#8d8b8c] text-[length:var(--subtitle-font-size)] tracking-[var(--subtitle-letter-spacing)] leading-[var(--subtitle-line-height)] whitespace-nowrap [font-style:var(--subtitle-font-style)]">
                  FEE amount for create pool(100 SUI)
                </p>
                <div className="flex w-[400px] h-[52px] items-center justify-center gap-[var(--collection-1-1)] pt-[var(--collection-1-1)] pb-[var(--collection-1-1)] px-[12px] relative rounded-[13px] border border-solid border-[#8d8b8c]">
                  <div className="relative w-fit mt-[-2.00px] font-subtitle font-[number:var(--subtitle-font-weight)] text-[#dfdfdf] text-[length:var(--subtitle-font-size)] tracking-[var(--subtitle-letter-spacing)] leading-[var(--subtitle-line-height)] whitespace-nowrap [font-style:var(--subtitle-font-style)]">
                    100 SUI
                  </div>
                </div>
              </div>
              <div className="inline-flex items-start gap-[10px] relative flex-[0_0_auto]">
                <div className="inline-flex flex-col items-start gap-[4px] relative flex-[0_0_auto]">
                  <div className="relative w-[310px] h-[24px] mt-[-1.00px] font-subtitle font-[number:var(--subtitle-font-weight)] text-[#8d8b8c] text-[length:var(--subtitle-font-size)] tracking-[var(--subtitle-letter-spacing)] leading-[var(--subtitle-line-height)] whitespace-nowrap [font-style:var(--subtitle-font-style)]">
                    Custodian account
                  </div>
                  <div className="relative w-[310px] h-[24px] [font-family:'Poppins',Helvetica] font-medium text-[#8d8b8c] text-[16px] tracking-[-0.32px] leading-[19.2px]">
                    0x124124...4124124
                  </div>
                </div>
                <div className="inline-flex items-center justify-center gap-[10px] px-[20px] py-[12px] relative flex-[0_0_auto] bg-white rounded-[31px]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'BT_Beau_Sans-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal]">
                    Done
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="inline-flex items-center justify-center gap-[10px] px-[20px] py-[12px] absolute top-[46px] left-[1487px] bg-white rounded-[31px]">
            <div className="relative w-fit mt-[-1.00px] [font-family:'BT_Beau_Sans-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal]">
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};