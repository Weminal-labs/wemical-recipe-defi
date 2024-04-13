import { useCurrentAccount, useSignAndExecuteTransactionBlock, useSuiClient } from '@mysten/dapp-kit';
import React from 'react'
import { useNetworkVariable, useNetworkVariables } from './networkConfig';
import { BASE_COIN_TYPE, POOL_ID, QUOTE_COIN_TYPE } from './constants';
// import { TransactionBlock } from '@mysten/sui.js/transactions';

export function DeepBook() {
    const client = useSuiClient();
    const currentAccount = useCurrentAccount();
    const { deepbookPackageId } = useNetworkVariables();
    const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();

    const executePTB = () => {
        // const txb = new TransactionBlock();

        // txb.setSender(currentAccount?.address!);
        // txb.setGasBudget(100000000);

        // const result1 = txb.moveCall({
        //     arguments: [],
        //     target: `0xcab68c8cd7e80f3dd06466da6b2c083d1fd50ab3e9be8e32395c19b53021c064::counter::create`,
        // });

        // console.log(result1);


        // const [accountCap] = txb.moveCall({
        //     arguments: [],
        //     target: `${deepbookPackageId}::book::new_custodian_account`,
        // });

        // console.log(accountCap);

        // const [result] = txb.moveCall({
        //     arguments: [txb.object(POOL_ID), txb.object("0x28c77510e01b24a4863b929b7ae24ffc3d6b5e0b642951edd0705d911b6a7a84"), txb.object(accountCap)],
        //     typeArguments: [BASE_COIN_TYPE, QUOTE_COIN_TYPE],
        //     target: `${deepbookPackageId}::book::make_base_deposit`,
        // });

        // console.log(result);

        // signAndExecute(
        //     {
        //         transactionBlock: txb,
        //         options: {
        //             showEffects: true,
        //             showObjectChanges: true,
        //         },
        //     },
        //     {
        //         onSuccess: (tx) => {
        //             console.log(tx);
        //         },
        //         onError: (error) => {
        //             console.error(error);
        //         }
        //     },
        // );
    };

    return (
        <>
            <div>DeepBook</div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={executePTB}>
                Execute PTB
            </button>
        </>
    )
}
