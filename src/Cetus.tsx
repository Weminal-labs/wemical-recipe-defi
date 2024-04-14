import React, { useEffect } from 'react'
import { retrievelAllPools, swapTest } from './api/cetus'
import { useSignAndExecuteTransactionBlock } from '@mysten/dapp-kit';

export const Cetus = () => {

    const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();

    useEffect(() => {
        async function test() {
            let data = await retrievelAllPools()
            console.log(data)
        }
        test()
    }, [])

    const handleSwap = async () => {
        try {
            const txb = await swapTest();

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
            <div>Cetus</div>
            <button onClick={handleSwap}>Handle Swap</button>
        </>
    )
}
