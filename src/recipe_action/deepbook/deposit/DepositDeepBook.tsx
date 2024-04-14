import React from 'react'
import { ArrowRight } from '../../../icons/ArrowRight'

interface DepositDeepBookProps {
    amount: number
}

export const DepositDeepBook = ({ amount }: DepositDeepBookProps) => {
    return (
        <div className="flex w-[577px] h-[60px] items-center gap-[60px] bg-[#6060604c] rounded-[12px] overflow-hidden border border-solid border-[#ffffff1a] mb-2">
            <div className="inline-flex flex-col items-center justify-center px-[40px] py-[16px] relative self-stretch flex-[0_0_auto] bg-white w-[124px]">
                <div className="relative w-fit [font-family:'BT_Beau_Sans-Medium',Helvetica] font-medium text-black text-[18px] tracking-[-0.36px] leading-[21.6px] whitespace-nowrap">
                    <div className='flex flex-col items-center'>
                        <div>Deposit</div>
                        <div className="mb-[-7.00px] text-[#757575] relative w-fit [font-family:'BT_Beau_Sans-Medium',Helvetica] font-medium text-[18px] tracking-[-0.36px] leading-[21.6px] whitespace-nowrap">Base</div>
                    </div>
                </div>
            </div>
            <div className="relative w-[168px] h-[24px]">
                <div className="absolute -top-px left-0 [font-family:'BT_Beau_Sans-Medium',Helvetica] font-medium text-white text-[18px] tracking-[-0.36px] leading-[21.6px] whitespace-nowrap">
                    {amount} SUI
                </div>
                <ArrowRight className="!absolute !w-[24px] !h-[24px] !top-0 !left-[75px]" />
                <div className="absolute -top-px left-[123px] [font-family:'BT_Beau_Sans-Medium',Helvetica] font-medium text-white text-[18px] tracking-[-0.36px] leading-[21.6px] whitespace-nowrap">
                    LP
                </div>
            </div>
        </div>
    )
}
