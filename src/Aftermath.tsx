import {
  useCurrentAccount,
  useSignAndExecuteTransactionBlock,
} from "@mysten/dapp-kit";
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
import {
  createTxbStake,
  createTxbSwap,
  createTxbSwapOposite,
} from "./api/aftermath";

export default function index() {
  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();

  const handleStake = async () => {
    const tx = await createTxbStake();

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

  const handleSwap = async () => {
    const txb = await createTxbSwap(
      BigInt(1_000_000_000),
      currentAccount?.address,
    );

    signAndExecute(
      {
        transactionBlock: txb!,
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

  const handleSwapOposite = async () => {
    const txb = await createTxbSwapOposite(
      BigInt(1_000_000_000),
      currentAccount?.address,
    );

    signAndExecute(
      {
        transactionBlock: txb!,
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
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleStake}
      >
        Stake
      </button>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSwap}
      >
        Swap
      </button>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSwapOposite}
      >
        Swap Oposite
      </button>
    </>
  );
}
