import React, { useEffect } from 'react'
import { getSpotPrice, getSpotPriceOposite } from '../../../api/aftermath'
import { ArrowDown } from '../../../icons/ArrowDown'
import { ArrowRight } from '../../../icons/ArrowRight'

interface SwapAftermathProps {
    amount: number
    isSuiToUsdc: boolean
}

export const SwapAftermath = ({ amount, isSuiToUsdc }: SwapAftermathProps) => {
    const [spotPrice, setSpotPrice] = React.useState(0)

    useEffect(() => {
        async function temp() {
            if (isSuiToUsdc) {
                const result = await getSpotPrice()
                setSpotPrice(result!);
            } else {
                const result = await getSpotPriceOposite()
                setSpotPrice(result!);
            }
        }
        temp()
    }, [isSuiToUsdc])
    return (
        <>
            <div className="flex w-[577px] h-[60px] items-center gap-[60px] bg-[#6060604c] rounded-[12px] overflow-hidden border border-solid border-[#ffffff1a] mb-2">
                <div className="inline-flex flex-col items-center justify-center px-[40px] py-[16px] relative self-stretch flex-[0_0_auto]" style={{
                    backgroundColor: "#f5bdbe"
                }}>
                    <div className="relative w-fit [font-family:'BT_Beau_Sans-Medium',Helvetica] font-medium text-black text-[18px] tracking-[-0.36px] leading-[21.6px] whitespace-nowrap">
                        Swap
                    </div>
                </div>
                <div className="relative w-[168px] h-[24px]">
                    <div className="absolute -top-px left-0 [font-family:'BT_Beau_Sans-Medium',Helvetica] font-medium text-white text-[18px] tracking-[-0.36px] leading-[21.6px] whitespace-nowrap">
                        {amount} {isSuiToUsdc ? "SUI" : "USDC"}
                    </div>
                    <ArrowRight className="!absolute !w-[24px] !h-[24px] !top-0 !left-[75px]" />
                    <div className="absolute -top-px left-[123px] [font-family:'BT_Beau_Sans-Medium',Helvetica] font-medium text-white text-[18px] tracking-[-0.36px] leading-[21.6px] whitespace-nowrap">
                        {amount && spotPrice * amount} {isSuiToUsdc ? "USDC" : "SUI"}
                    </div>
                </div>
            </div>
        </>



    )
}
