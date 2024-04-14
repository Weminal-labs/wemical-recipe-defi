import { TxBlock } from "@cetusprotocol/cetus-sui-clmm-sdk";
import { Network, TurbosSdk } from "turbos-clmm-sdk";
import type { Contract } from 'turbos-clmm-sdk';


export const turboSDK = new TurbosSdk(Network.testnet);

export const test1 = async () => {
    const fees = await turboSDK.contract.getFees(); // interface: Contract.Fee[]
    const contract = await turboSDK.contract.getConfig(); // interface: Contract.Config

    console.log(fees, contract);


}

export const getPools = async () => {
    const pools = await turboSDK.pool.getPools()
    return pools
}

// 0xcc1e9ec515810773ac9ad2ae41194ab0166300d9071a09a22cd8eb152138a3b3: pool Turbos va Sui

// 0x7278ca6cf1fb19c6c8d5dc22aa245ebb8833e47885955f8334663e832b792a69

export const turboSwap = async () => {
    const swapResults = await turboSDK.trade.computeSwapResult({
        pools: [{
            pool: '0xcc1e9ec515810773ac9ad2ae41194ab0166300d9071a09a22cd8eb152138a3b3',
            a2b: false
        }],
        address: "0xb4b291607e91da4654cab88e5e35ba2921ef68f1b43725ef2faeae045bf5915d",
        amountSpecified: 1000000000,
        amountSpecifiedIsInput: true
    });

    console.log(swapResults);

    let nextTickIndex = turboSDK.math.bitsToNumber(swapResults[0].tick_current_index.bits)

    const txb = await turboSDK.trade.swap({
        /**
         * nextTickIndex = sdk.math.bitsToNumber(swapResult.tick_current_index.bits)
         */
        routes: [{ pool: '0xcc1e9ec515810773ac9ad2ae41194ab0166300d9071a09a22cd8eb152138a3b3', a2b: false, nextTickIndex }],
        coinTypeA: "0x541826891e877178df82f2df2996599618a259e719ef54a8e1969211c609cd21::turbos::TURBOS",
        coinTypeB: "0x2::sui::SUI",
        address: '0xb4b291607e91da4654cab88e5e35ba2921ef68f1b43725ef2faeae045bf5915d',
        amountA: swapResults[0].amount_a,
        amountB: swapResults[0].amount_b,
        amountSpecifiedIsInput: swapResults[0].is_exact_in,
        slippage: "0.01"
    });

    return txb;
}

export const turboAddLiquidity = async () => {
    const txb = await turboSDK.pool.addLiquidity({
        pool: '0xcc1e9ec515810773ac9ad2ae41194ab0166300d9071a09a22cd8eb152138a3b3',
        address: '0xb4b291607e91da4654cab88e5e35ba2921ef68f1b43725ef2faeae045bf5915d',
        amountA: 761384286,
        amountB: 70161603,
        slippage: 0.001,
        tickLower: 4294942946,
        tickUpper: 4294943946
    })

    return txb;
}