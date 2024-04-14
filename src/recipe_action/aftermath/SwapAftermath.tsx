import React, { useEffect } from 'react'
import { getSpotPrice, getSpotPriceOposite } from '../../api/aftermath'

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
        <div className='flex flex-col'>
            <div>Swap Aftermath</div>
            <div>{amount} {isSuiToUsdc ? "SUI to USDC" : "USDC to Sui"}: {amount && spotPrice * amount}</div>
        </div>
    )
}
