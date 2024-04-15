import { SuiClient, SuiHTTPTransport, getFullnodeUrl } from "@mysten/sui.js/client";
import { Aftermath, AftermathApi, IndexerCaller, Pool, Pools, Router, Staking } from "aftermath-ts-sdk";

const testnetStakingAddresses = {
    staking: {
        packages: {
            events:
                "0x58e6bdd081ae6035141871a1c7cdf82895e944a8b7673f78d22e370a07cbf99b",
            lsd: "0x58e6bdd081ae6035141871a1c7cdf82895e944a8b7673f78d22e370a07cbf99b",
            afsui:
                "0x5783fa2298e7301a1c7f99ce45d4a207478fbf3003eca9482ae823d6f6c7cd60",
        },
        objects: {
            stakedSuiVault:
                "0x690f36f9c5249b0c4c9b3efdf8a2864c750a8021037360e3b7bedc9ceafb277f",
            safe: "0x091686a693e86929f91ef539d867fae334a33d124bc2c204dcb3b53dd9016501",
            treasury:
                "0xf3d41534e43ecf36da8657b48350a09a3e50eeb2ce61f8ceb80e6d2f85828bc0",
            referralVault:
                "0x8d357115058f22976cd01c5415116d9aca806d1ded37eecd75d87978f404e927",
            validatorConfigsTable:
                "0xc9b9c0f1115793a24e0551609e51daa5ffe2b11429d12b46fdf8a3b0bfc0e908",
            stakedSuiVaultState: "",
        },
    },
};


// Aftermath Provider
const afSdk = new Aftermath("TESTNET");
const afApi = new AftermathApi(
    new SuiClient({
        transport: new SuiHTTPTransport({
            url: getFullnodeUrl("testnet"),
        }),
    }),
    testnetStakingAddresses,
    new IndexerCaller("TESTNET"),
);
const stakingApi = afApi.Staking();

let staking: Staking | null = null;
let pools: Pools | null = null;
let router: Router | null = null;
let pool: Pool | null = null;

async function init() {
    await afSdk.init();
    staking = afSdk.Staking();
    pools = afSdk.Pools();
    router = afSdk.Router();
    pool = await pools.getPool({
        objectId: "0x5eb0f58b9cb9b7b843a50e1b94da98e57b534bae7f93efb35afe868c24898dc5", // SUI/USDC
    });
}

export const createTxbSwap = async (amount: bigint, walletAddress: any) => {
    await init();

    const route = await router?.getCompleteTradeRouteGivenAmountIn({
        coinInType:
            "0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI",
        coinOutType:
            "0x02264251ff808fbf55c06f60fd1174814fd787bd32dc539531894deb497029c7::usdc::USDC",
        coinInAmount: amount,
        externalFee: {
            recipient:
                "0x1fb0c0a6790860fc83c8f26f6fa089868ad94de9468348f98dfb4cdf89a53777",
            feePercentage: 0.0001, // 1% fee from amount out
        },
    });

    const tx = await router?.getTransactionForCompleteTradeRoute({
        walletAddress,
        completeRoute: route!,
        slippage: 0.01, // 1% max slippage
    });

    return tx;
};

export const createTxbSwapOposite = async (amount: bigint, walletAddress: any) => {
    await init();

    const route = await router?.getCompleteTradeRouteGivenAmountIn({
        coinOutType:
            "0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI",
        coinInType:
            "0x02264251ff808fbf55c06f60fd1174814fd787bd32dc539531894deb497029c7::usdc::USDC",
        coinInAmount: amount,
        externalFee: {
            recipient:
                "0x1fb0c0a6790860fc83c8f26f6fa089868ad94de9468348f98dfb4cdf89a53777",
            feePercentage: 0.0001, // 1% fee from amount out
        },
    });

    const tx = await router?.getTransactionForCompleteTradeRoute({
        walletAddress,
        completeRoute: route!,
        slippage: 0.01, // 1% max slippage
    });

    return tx;
};

export const createTxbStake = async () => {
    await init();

    const tx = await staking?.getStakeTransaction({
        walletAddress:
            "0xb4b291607e91da4654cab88e5e35ba2921ef68f1b43725ef2faeae045bf5915d",
        suiStakeAmount: 1_000_000_000n, // 1 Sui
        validatorAddress:
            "0xf95ef0315cdf53688337437622fda6f854389d898c02ce9423be393cdde063de",
    });

    const suiCoin = await afApi.Coin().fetchCoinWithAmountTx({
        tx: tx!,
        walletAddress:
            "0xb4b291607e91da4654cab88e5e35ba2921ef68f1b43725ef2faeae045bf5915d",
        coinType: "0x02::sui::SUI",
        coinAmount: BigInt(1_423_837_387), // ~1.4 SUI
    });

    const afSuiCoin = stakingApi.stakeTx({
        tx: tx!,
        suiCoin,
        validatorAddress:
            "0xf95ef0315cdf53688337437622fda6f854389d898c02ce9423be393cdde063de",
    });

    return tx;
}

export const getSpotPrice = async () => {
    await init();

    const spotPrice = pool?.getSpotPrice({
        coinInType:
            "0x02264251ff808fbf55c06f60fd1174814fd787bd32dc539531894deb497029c7::usdc::USDC",
        coinOutType:
            "0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI",
        // optional
        withFees: true,
    });
    return spotPrice;
};

export const getSpotPriceOposite = async () => {
    await init();

    const spotPrice = pool?.getSpotPrice({
        coinOutType:
            "0x02264251ff808fbf55c06f60fd1174814fd787bd32dc539531894deb497029c7::usdc::USDC",
        coinInType:
            "0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI",
        // optional
        withFees: true,
    });
    return spotPrice;
};