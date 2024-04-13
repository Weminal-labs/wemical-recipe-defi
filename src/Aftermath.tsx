import { useSignAndExecuteTransactionBlock } from "@mysten/dapp-kit";
import {
  SuiClient,
  SuiHTTPTransport,
  getFullnodeUrl,
} from "@mysten/sui.js/client";
import {
  Aftermath,
  AftermathApi,
  IndexerCaller,
  Pools,
  Router,
  Staking,
} from "aftermath-ts-sdk";
import axios from "axios";

import React, { useEffect, useState } from "react";

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

export default function index() {
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

  const [staking, setStaking] = useState<Staking | null>(null);
  const [pools, setPools] = useState<Pools | null>(null);
  const [router, setRouter] = useState<Router | null>(null);

  const instance = axios.create({
    baseURL: "https://testnet.aftermath.finance/api/",
    headers: {},
  });

  const stakingApi = afApi.Staking();

  const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();

  useEffect(() => {
    async function init() {
      await afSdk.init();
      setStaking(afSdk.Staking());
      setPools(afSdk.Pools());
      setRouter(afSdk.Router());
    }
    init();
  }, []);

  useEffect(() => {
    async function fetchPools() {
      const resp = await instance.get("/pools");
      // console.log(resp.data);
      // CORS error
      // const allPools = await pools.getAllPools();
      // console.log(allPools);
    }
    fetchPools();
  }, []);

  const handleStake = async () => {
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

    signAndExecute(
      {
        transactionBlock: tx!,
        options: {
          showEffects: true,
          showObjectChanges: true,
        },
      },
      {
        onSuccess: (tx) => {
          console.log(tx);
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );

    console.log(afSuiCoin);
  };

  const handleSwap = async () => {
    const route = await router?.getCompleteTradeRouteGivenAmountIn({
      coinInType:
        "0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI",
      coinOutType:
        "0x02264251ff808fbf55c06f60fd1174814fd787bd32dc539531894deb497029c7::usdc::USDC",
      coinInAmount: 1_000_000_000n,
      externalFee: {
        recipient:
          "0x1fb0c0a6790860fc83c8f26f6fa089868ad94de9468348f98dfb4cdf89a53777",
        feePercentage: 0.0001, // 1% fee from amount out
      },
    });

    const tx = await router?.getTransactionForCompleteTradeRoute({
      walletAddress:
        "0xb4b291607e91da4654cab88e5e35ba2921ef68f1b43725ef2faeae045bf5915d",
      completeRoute: route!,
      slippage: 0.01, // 1% max slippage
    });

    signAndExecute(
      {
        transactionBlock: tx!,
        options: {
          showEffects: true,
          showObjectChanges: true,
        },
      },
      {
        onSuccess: (tx) => {
          console.log(tx);
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  };

  return (
    <>
      <div>Aftermath</div>
      <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleStake}>Stake</button>
      <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSwap}>Swap</button>
    </>
  );
}
