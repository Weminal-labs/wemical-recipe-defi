import CetusClmmSDK, { Percentage, SdkOptions, adjustForSlippage, d } from '@cetusprotocol/cetus-sui-clmm-sdk'
import { BN } from 'bn.js'

const SDKConfig = {
    clmmConfig: {
        pools_id: '0xc090b101978bd6370def2666b7a31d7d07704f84e833e108a969eda86150e8cf',
        global_config_id: '0x6f4149091a5aea0e818e7243a13adcfb403842d670b9a2089de058512620687a',
        global_vault_id: '0xf3114a74d54cbe56b3e68f9306661c043ede8c6615f0351b0c3a93ce895e1699',
        admin_cap_id: '0xa456f86a53fc31e1243f065738ff1fc93f5a62cc080ff894a0fb3747556a799b',
    },
    cetusConfig: {
        coin_list_id: '0x257eb2ba592a5480bba0a97d05338fab17cc3283f8df6998a0e12e4ab9b84478',
        launchpad_pools_id: '0xdc3a7bd66a6dcff73c77c866e87d73826e446e9171f34e1c1b656377314f94da',
        clmm_pools_id: '0x26c85500f5dd2983bf35123918a144de24e18936d0b234ef2b49fbb2d3d6307d',
        admin_cap_id: '0x1a496f6c67668eb2c27c99e07e1d61754715c1acf86dac45020c886ac601edb8',
        global_config_id: '0xe1f3db327e75f7ec30585fa52241edf66f7e359ef550b533f89aa1528dd1be52',
        coin_list_handle: '0x3204350fc603609c91675e07b8f9ac0999b9607d83845086321fca7f469de235',
        launchpad_pools_handle: '0xae67ff87c34aceea4d28107f9c6c62e297a111e9f8e70b9abbc2f4c9f5ec20fd',
        clmm_pools_handle: '0xd28736923703342b4752f5ed8c2f2a5c0cb2336c30e1fed42b387234ce8408ec',
    },
}

export const testnet: SdkOptions = {
    fullRpcUrl: 'https://fullnode.testnet.sui.io',
    swapCountUrl: 'https://api-sui.devcetus.com/v2/sui/swap/count',
    simulationAccount: {
        address: '0xb4b291607e91da4654cab88e5e35ba2921ef68f1b43725ef2faeae045bf5915d'
    },
    cetus_config: {
        package_id: '0xf5ff7d5ba73b581bca6b4b9fa0049cd320360abd154b809f8700a8fd3cfaf7ca',
        published_at: '0xf5ff7d5ba73b581bca6b4b9fa0049cd320360abd154b809f8700a8fd3cfaf7ca',
        config: {
            coin_list_id: '0x257eb2ba592a5480bba0a97d05338fab17cc3283f8df6998a0e12e4ab9b84478',
            launchpad_pools_id: '0xdc3a7bd66a6dcff73c77c866e87d73826e446e9171f34e1c1b656377314f94da',
            clmm_pools_id: '0x26c85500f5dd2983bf35123918a144de24e18936d0b234ef2b49fbb2d3d6307d',
            admin_cap_id: '0x1a496f6c67668eb2c27c99e07e1d61754715c1acf86dac45020c886ac601edb8',
            global_config_id: '0xe1f3db327e75f7ec30585fa52241edf66f7e359ef550b533f89aa1528dd1be52',
            coin_list_handle: '0x3204350fc603609c91675e07b8f9ac0999b9607d83845086321fca7f469de235',
            launchpad_pools_handle: '0xae67ff87c34aceea4d28107f9c6c62e297a111e9f8e70b9abbc2f4c9f5ec20fd',
            clmm_pools_handle: '0xd28736923703342b4752f5ed8c2f2a5c0cb2336c30e1fed42b387234ce8408ec'
        }
    },
    clmm_pool: {
        package_id: '0x0868b71c0cba55bf0faf6c40df8c179c67a4d0ba0e79965b68b3d72d7dfbf666',
        published_at: '0x1c29d658882c40eeb39a8bb8fe58f71a216a918acb3e3eb3b47d24efd07257f2',
        config: {
            pools_id: '0xc090b101978bd6370def2666b7a31d7d07704f84e833e108a969eda86150e8cf',
            global_config_id: '0x6f4149091a5aea0e818e7243a13adcfb403842d670b9a2089de058512620687a',
            global_vault_id: '0xf3114a74d54cbe56b3e68f9306661c043ede8c6615f0351b0c3a93ce895e1699',
            admin_cap_id: '0xa456f86a53fc31e1243f065738ff1fc93f5a62cc080ff894a0fb3747556a799b',
            partners_id: '0xb1cefb6de411213a1cfe94d24213af2518eff3d51267fb95e35d11aa77fc9b5f'
        }
    },
    integrate: {
        package_id: '0x8627c5cdcd8b63bc3daa09a6ab7ed81a829a90cafce6003ae13372d611fbb1a9',
        published_at: '0xf1a5d0c5b0593e41d13f9684ca91365bdfe54a98836c1d33c90e361a031fac74'
    },
    deepbook: {
        package_id: '0x000000000000000000000000000000000000000000000000000000000000dee9',
        published_at: '0x000000000000000000000000000000000000000000000000000000000000dee9'
    },
    deepbook_endpoint_v2: {
        package_id: '0xa34ffca2c6540e1ca9e53963ab43e7b1eed7b82e37696c743bb7c6179c15dfa6',
        published_at: '0xa34ffca2c6540e1ca9e53963ab43e7b1eed7b82e37696c743bb7c6179c15dfa6'
    },
    aggregatorUrl: 'https://api-sui.devcetus.com/router'
}

export const TestnetSDK = new CetusClmmSDK(testnet)

export async function retrievelAllPools() {
    // If you want to get all pools, just pass one empty array.
    const pools = await TestnetSDK.Pool.getPoolsWithPage([])
    return pools
}


export async function retrieveOnePool() {
    const pool = await TestnetSDK.Pool.getPool('0xbed3136f15b0ea649fb94bcdf9d3728fb82ba1c3e189bf6062d78ff547850054')
    return pool
}

export async function swapTest() {
    // Whether the swap direction is token b to token a
    const a2b = false

    // fix input token amount
    const coinAmount = new BN(120000);

    // input token amount is token b
    const byAmountIn = false

    // slippage value
    const slippage = Percentage.fromFraction(1, 100)
    // console.log(slippage)
    // const { denominator, numerator } = slippage;

    // Fetch pool data
    const pool = await TestnetSDK.Pool.getPool("0x375128f60d6dabb8c624a6f055d8417b15625e3ec77f0620fed136c5e28d1665") // USDT/SUI

    // Estimated amountIn amountOut fee
    const res: any = await TestnetSDK.Swap.preswap({
        pool: pool,
        currentSqrtPrice: pool.current_sqrt_price,
        coinTypeA: pool.coinTypeA,
        coinTypeB: pool.coinTypeB,
        decimalsA: 6, // USDT 's decimals
        decimalsB: 9, // SUI 's decimals
        a2b,
        byAmountIn,
        amount: coinAmount.toString(),
    })

    // const partner = '0x8e0b7668a79592f70fbfb1ae0aebaf9e2019a7049783b9a4b6fe7c6ae038b528'

    const toAmount = byAmountIn ? new BN(res.estimatedAmountOut) : new BN(res.estimatedAmountIn)
    const amountLimit = adjustForSlippage(toAmount, slippage, !byAmountIn)

    // build swap Payload
    const swapPayload = await TestnetSDK.Swap.createSwapTransactionPayload(
        {
            pool_id: pool.poolAddress,
            coinTypeA: pool.coinTypeA,
            coinTypeB: pool.coinTypeB,
            a2b: a2b,
            by_amount_in: byAmountIn,
            amount: res.amount.toString(),
            amount_limit: amountLimit.toString(),
            // swap_partner: partner,
        },
    )

    return swapPayload;

    // const transferTxn = await sendTransaction(signer, swapPayload)
    // console.log('swap: ', transferTxn)
}