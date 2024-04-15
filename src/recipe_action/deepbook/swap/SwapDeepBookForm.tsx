import React from 'react'
import { ActionFormProps } from '../deposit/DepositDeepBookForm'

export const SwapDeepBookForm = ({ handleDone, handleArgsForEachAction }: ActionFormProps) => {

    const [amount, setAmount] = React.useState(0)

    const handleFinish = () => {
        handleDone()
        handleArgsForEachAction(3, { amount: amount })
    }

    return (
        <div className="flex flex-col items-start gap-[24px] p-[40px] relative bg-[#2828284c] border border-solid border-[#ffffff1a] w-[482px] mb-5">
            <div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
                <div className="relative flex-1 mt-[-1.00px] [font-family:'BT_Beau_Sans-Regular',Helvetica] font-normal text-[32px] tracking-[0] leading-[38.4px]">
                    Swap exact base for quote
                </div>
            </div>
            <div className="flex flex-col h-[48px] items-end justify-around gap-[16px] relative self-stretch w-full">
                <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                    <div className="relative w-fit font-subtitle font-[number:var(--subtitle-font-weight)] text-[#8d8b8c] text-[length:var(--subtitle-font-size)] tracking-[var(--subtitle-letter-spacing)] leading-[var(--subtitle-line-height)] whitespace-nowrap [font-style:var(--subtitle-font-style)]">
                        Pool
                    </div>
                    <div className="flex w-[270px] h-[48px] items-center justify-center gap-[var(--collection-1-1)] pt-[var(--collection-1-1)] pb-[var(--collection-1-1)] px-[12px] relative rounded-[13px] border border-solid border-[#8d8b8c]">
                        <div className="inline-flex items-center justify-center relative flex-[0_0_auto] mt-[-5.00px] mb-[-5.00px]">
                            <div className="bg-[#d9d9d9] relative w-[26px] h-[26px] rounded-[13px]" />
                            <div className="ml-[-13px] bg-[#828282] relative w-[26px] h-[26px] rounded-[13px]" />
                        </div>
                        <div className="relative w-fit mt-[-4.00px] mb-[-2.00px] font-subtitle font-[number:var(--subtitle-font-weight)] text-[#ededed] text-[length:var(--subtitle-font-size)] tracking-[var(--subtitle-letter-spacing)] leading-[var(--subtitle-line-height)] whitespace-nowrap [font-style:var(--subtitle-font-style)]">
                            SUI/WTBC
                        </div>
                    </div>
                </div>
            </div>
            <div className="inline-flex flex-col items-start gap-[8px] relative flex-[0_0_auto]">
                <div className="relative w-[310px] h-[24px] mt-[-1.00px] font-subtitle font-[number:var(--subtitle-font-weight)] text-[#8d8b8c] text-[length:var(--subtitle-font-size)] tracking-[var(--subtitle-letter-spacing)] leading-[var(--subtitle-line-height)] whitespace-nowrap [font-style:var(--subtitle-font-style)]">
                    Amount
                </div>
                <div className="flex w-[400px] h-[52px] items-center justify-between pt-[var(--collection-1-1)] pb-[var(--collection-1-1)] px-[12px] relative rounded-[13px] border border-solid border-[#8d8b8c]">
                    <input className='bg-transparent border-none w-full' type="number" value={amount} onChange={(e: any) => setAmount(e.target.value)} />
                    <div className="relative w-fit mt-[-2.00px] font-subtitle font-[number:var(--subtitle-font-weight)] text-[#dfdfdf] text-[length:var(--subtitle-font-size)] tracking-[var(--subtitle-letter-spacing)] leading-[var(--subtitle-line-height)] whitespace-nowrap [font-style:var(--subtitle-font-style)]">
                        SUI
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-end gap-[10px] relative self-stretch w-full flex-[0_0_auto]">
                <button className="inline-flex items-center justify-center gap-[10px] px-[20px] py-[12px] relative flex-[0_0_auto] bg-white rounded-[31px]" onClick={handleFinish}>
                    <div className="relative w-fit mt-[-1.00px] [font-family:'BT_Beau_Sans-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[normal]">
                        Done
                    </div>
                </button>
            </div>
        </div>
    )
}
