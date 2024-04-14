import React, { useEffect } from 'react'
import { getPools, turboAddLiquidity, turboSwap } from './api/turbo'
import { useSignAndExecuteTransactionBlock } from '@mysten/dapp-kit';

export const Turbo = () => {

    const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();


    useEffect(() => {
        async function test() {
            const pools = await getPools()
            console.log(pools)
        }
        test()
    }, [])

    const handleSwap = async () => {
        try {
            // const txb = await turboSwap();
            const txb = await turboAddLiquidity();

            signAndExecute(
                {
                    transactionBlock: txb,
                    options: {
                        showEffects: true,
                        showObjectChanges: true,
                    },
                },
                {
                    onSuccess: (tx) => {
                        console.log(tx)
                    },
                    onError: (error) => {
                        console.log(error)
                    }
                },
            );

        } catch (err) {
            console.log(err)
        }


    }

    return (
        <>
            <div>Turbo</div>
            <button onClick={handleSwap}>Turbo Swap</button>
        </>
    )
}
