import React, { useEffect, useState } from "react";
import { SearchIcon } from "../../icons/SearchIcon";
import { DashboardIcon } from "../../icons/DashboardIcon";
import { BoxIcon } from "../../icons/BoxIcon";
import { BookIcon } from "../../icons/BookIcon";
import { ArrowDown } from "../../icons/ArrowDown";
import { SwapIcon } from "../../icons/SwapIcon";
import { AddElementIcon } from "../../icons/AddElementIcon";
import { BarcodeIcon } from "../../icons/BarcodeIcon";
import { ExchangeIcon } from "../../icons/ExchangeIcon";
import {
  ConnectButton,
  useCurrentAccount,
  useSignAndExecuteTransactionBlock,
} from "@mysten/dapp-kit";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Actions from "../../recipe_action/index";
import { SwapAftermath } from "../../recipe_action/aftermath/swap/SwapAftermath";
import { DepositDeepBook } from "../../recipe_action/deepbook/deposit/DepositDeepBook";
import { SwapDeepBook } from "../../recipe_action/deepbook/swap/SwapDeepBook";
import { WithdrawBase } from "../../recipe_action/deepbook/withdraw/WithdrawBase";
import {
  createTxbSwap,
  createTxbSwapOposite,
  getSpotPrice,
  getSpotPriceOposite,
} from "../../api/aftermath";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { SwapAftermathForm } from "../../recipe_action/aftermath/swap/SwapAftermathForm";
import { ActionType } from "../../recipe_action/Container";
import { useNetworkVariables } from "../../networkConfig";
import { DepositDeepBookForm } from "../../recipe_action/deepbook/deposit/DepositDeepBookForm";
import { SwapDeepBookForm } from "../../recipe_action/deepbook/swap/SwapDeepBookForm";
import { WithdrawBaseForm } from "../../recipe_action/deepbook/withdraw/WithdrawBaseForm";
import { Cetus } from "../../Cetus";
import { Turbo } from "../../Turbo";
import {
  QUOTE_COIN_TYPE,
  BASE_COIN_TYPE,
  POOL_ID,
  CLOCK_OBJECT_ID,
} from "../../constants";

const ACTIONS = [
  {
    id: 1,
    type: ActionType.SwapAftermath,
    args: {
      isSuiToUsdc: true,
      amount: 0,
    },
  },
  {
    id: 2,
    type: ActionType.DepositDeepBook,
    args: {
      amount: 0,
    },
  },
  {
    id: 3,
    type: ActionType.SwapDeepBook,
    args: {
      amount: 0,
    },
  },
  {
    id: 4,
    type: ActionType.WithdrawBase,
    args: {
      amount: 0,
    },
  },
];

export const RecipeManagement = (): JSX.Element => {
  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();
  const { deepbookPackageId } = useNetworkVariables();

  const [selectedAction, setSelectedAction] = useState<number>(0);
  const [actions, setActions] = useState(ACTIONS);
  const [custodianAccount, setCustodianAccount] = useState<string>("");
  const [response, setResponse] = useState<any[]>([]);

  const handleCreateCustodianAccount = () => {
    const txb = new TransactionBlock();
    txb?.moveCall({
      arguments: [],
      target: `${deepbookPackageId}::book::new_custodian_account`,
    });

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
          setCustodianAccount((tx?.objectChanges?.[1] as any).objectId);
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };

  const handleArgsForEachAction = (id: number, args: any) => {
    setActions(
      actions.map((action) => {
        if (action.id === id) {
          return {
            ...action,
            component: (
              <SwapAftermath
                isSuiToUsdc={args.isSuiToUsdc}
                amount={args.amount}
              />
            ),
            args,
          };
        }
        return action;
      }),
    );
  };

  const handleExecute = async () => {
    let txb = new TransactionBlock();

    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      if (action.type === ActionType.SwapAftermath) {
        let swapTxb = new TransactionBlock();
        if (action.args.isSuiToUsdc) {
          swapTxb = (await createTxbSwap(
            BigInt(action.args.amount * 1_000_000_000),
            currentAccount?.address,
          ))!;
        } else {
          swapTxb = (await createTxbSwapOposite(
            BigInt(action.args.amount * 1_000_000_000),
            currentAccount?.address,
          ))!;
        }

        signAndExecute(
          {
            transactionBlock: swapTxb,
            options: {
              showEffects: true,
              showObjectChanges: true,
            },
          },
          {
            onSuccess: (tx) => {
              console.log(tx);

              setResponse((prev) => [
                ...prev,
                `https://suiscan.xyz/testnet/tx/${tx.digest}`,
              ]);

              txb.setGasBudget(10_000_000_000n);

              signAndExecute(
                {
                  transactionBlock: txb!,
                  options: {
                    showEffects: true,
                    showObjectChanges: true,
                  },
                },
                {
                  onSuccess: (tx2) => {
                    console.log(tx2);
                    setResponse((prev) => [
                      ...prev,
                      `https://suiscan.xyz/testnet/tx/${tx2.digest}`,
                    ]);
                  },
                  onError: (error) => {
                    console.log(error);
                  },
                },
              );
            },
            onError: (error) => {
              console.log(error);
            },
          },
        );
      } else if (action.type === ActionType.DepositDeepBook) {
        const [coin] = txb.splitCoins(txb.gas, [
          action.args.amount * 1_000_000_000,
        ]);

        txb?.moveCall({
          arguments: [txb.object(POOL_ID), coin, txb.object(custodianAccount)],
          target: `${deepbookPackageId}::book::make_base_deposit`,
          typeArguments: [BASE_COIN_TYPE, QUOTE_COIN_TYPE],
        });
      } else if (action.type === ActionType.SwapDeepBook) {
        const [coin] = txb.splitCoins(txb.gas, [
          action.args.amount * 1_000_000_000,
        ]);

        txb?.moveCall({
          arguments: [
            txb.object(POOL_ID),
            txb.pure(100),
            txb.object(custodianAccount),
            txb.pure(1500),
            txb.object(coin),
            txb.object(CLOCK_OBJECT_ID),
          ],
          target: `${deepbookPackageId}::book::swap_exact_base_for_quote`,
          typeArguments: [BASE_COIN_TYPE, QUOTE_COIN_TYPE],
        });
      } else if (action.type === ActionType.WithdrawBase) {
        txb?.moveCall({
          arguments: [
            txb.object(POOL_ID),
            txb.pure(action.args.amount * 1_000_000_000),
            txb.object(custodianAccount),
          ],
          target: `${deepbookPackageId}::book::withdraw_base`,
          typeArguments: [BASE_COIN_TYPE, QUOTE_COIN_TYPE],
        });
      }
    }

    // signAndExecute(
    //   {
    //     transactionBlock: txb!,
    //     options: {
    //       showEffects: true,
    //       showObjectChanges: true,
    //     },
    //   },
    //   {
    //     onSuccess: (tx) => {
    //       console.log(tx)
    //     },
    //     onError: (error) => {
    //       console.log(error)
    //     }
    //   },
    // );
  };

  // const handleExecute = async () => {
  //   const txb = await createTxbSwap(BigInt(1_000_000_000))

  //   txb?.moveCall({
  //     arguments: [],
  //     target: `${deepbookPackageId}::book::new_custodian_account`,
  //   });

  //   signAndExecute(
  //     {
  //       transactionBlock: txb!,
  //       options: {
  //         showEffects: true,
  //         showObjectChanges: true,
  //       },
  //     },
  //     {
  //       onSuccess: (tx) => {
  //         console.log(tx)
  //       },
  //       onError: (error) => {
  //         console.log(error)
  //       }
  //     },
  //   );
  // }

  useEffect(() => {
    getSpotPrice();
    console.log("Br");
    getSpotPriceOposite();
  }, []);

  const handleDone = () => {
    setSelectedAction(0);
  };

  const renderFormForEachAction = () => {
    switch (selectedAction) {
      case 1:
        return (
          <SwapAftermathForm
            handleDone={handleDone}
            handleArgsForEachAction={handleArgsForEachAction}
          />
        );
      case 2:
        return (
          <DepositDeepBookForm
            handleDone={handleDone}
            handleArgsForEachAction={handleArgsForEachAction}
          />
        );
      case 3:
        return (
          <SwapDeepBookForm
            handleDone={handleDone}
            handleArgsForEachAction={handleArgsForEachAction}
          />
        );
      case 4:
        return (
          <WithdrawBaseForm
            handleDone={handleDone}
            handleArgsForEachAction={handleArgsForEachAction}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex w-[577px] items-center justify-center gap-[var(--collection-1-1)] pt-[var(--collection-1-1)] pb-[var(--collection-1-1)] px-[12px] absolute top-[244px] left-[406px] rounded-[13px] border border-dashed border-[#8d8b8c]">
        <ArrowDown className="!relative !w-[24px] !h-[24px]" />
        <p className="relative w-fit font-subtitle font-[number:var(--subtitle-font-weight)] text-[#8d8b8c] text-[length:var(--subtitle-font-size)] tracking-[var(--subtitle-letter-spacing)] leading-[var(--subtitle-line-height)] whitespace-nowrap [font-style:var(--subtitle-font-style)]">
          Drag, drop, change the order of actions in the box
        </p>
      </div>
      <div className="absolute top-[350px] left-[406px] w-[1150px] h-screen">
        <DndProvider backend={HTML5Backend}>
          <Actions
            setSelectedAction={setSelectedAction}
            actions={actions}
            setActions={setActions}
          />
        </DndProvider>
        <button
          className="w-[577px] my-4 rounded-[31px] py-3"
          onClick={handleExecute}
        >
          Execute
        </button>

        {response && (
          <div>
            {response.map((link, index) => {
              return (
                <div>
                  <a href={link}>Transaction {index + 1}</a>
                </div>
              );
            })}
          </div>
        )}
        {custodianAccount ? (
          <></>
        ) : (
          <button
            className="block w-[577px] py-3 rounded-[13px]"
            style={{
              backgroundColor: "blueviolet",
            }}
            onClick={handleCreateCustodianAccount}
          >
            Create Custodian Account
          </button>
        )}
      </div>
      <div className="inline-flex items-end gap-[140px] absolute top-[155px] left-[406px]">
        <div className="flex items-center justify-between w-[420px]">
          <img src="/img/deepbook.png" className="h-[30px]" alt="" />

          <img src="/img/aftermath.png" alt="" className="h-[30px] ml-4" />

          <img
            src="https://www.cetus.zone/_nuxt/img/img-logo@2x.89d6434.png"
            className="h-[30px] ml-4"
            alt=""
          />

          <img
            src="https://turbos.finance/image/logo.2d97feb4.png"
            className="h-[30px] ml-4"
            alt=""
          />
        </div>
        <div className="inline-flex items-start gap-[16px] relative flex-[0_0_auto]">
          <div className="inline-flex h-[40px] items-center justify-center gap-[8px] px-[16px] py-0 relative flex-[0_0_auto] rounded-[8px] border border-solid border-white">
            <SwapIcon className="!relative !w-[24px] !h-[24px]" />
            <div className="inline-flex items-center justify-center gap-[10px] relative flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'BT_Beau_Sans-Medium',Helvetica] font-medium text-white text-[18px] tracking-[-0.36px] leading-[21.6px] whitespace-nowrap">
                Swap
              </div>
            </div>
          </div>
          <div className="inline-flex h-[40px] items-center justify-center gap-[8px] px-[16px] py-0 relative flex-[0_0_auto] rounded-[8px] border border-solid border-white">
            <AddElementIcon className="!relative !w-[24px] !h-[24px]" />
            <div className="inline-flex items-center justify-center gap-[10px] relative flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'BT_Beau_Sans-Medium',Helvetica] font-medium text-white text-[18px] tracking-[-0.36px] leading-[21.6px] whitespace-nowrap">
                Create pool
              </div>
            </div>
          </div>
          <div className="inline-flex h-[40px] items-center justify-center gap-[8px] px-[16px] py-0 relative flex-[0_0_auto] rounded-[8px] border border-solid border-white">
            <BarcodeIcon className="!relative !w-[24px] !h-[24px]" />
            <div className="inline-flex items-center justify-center gap-[10px] relative flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'BT_Beau_Sans-Medium',Helvetica] font-medium text-white text-[18px] tracking-[-0.36px] leading-[21.6px] whitespace-nowrap">
                Deposit
              </div>
            </div>
          </div>
          <div className="inline-flex h-[40px] items-center justify-center gap-[8px] px-[16px] py-0 relative flex-[0_0_auto] rounded-[8px] border border-solid border-white">
            <ExchangeIcon className="!relative !w-[24px] !h-[24px]" />
            <div className="inline-flex items-center justify-center gap-[10px] relative flex-[0_0_auto]">
              <div className="relative w-fit mt-[-1.00px] [font-family:'BT_Beau_Sans-Medium',Helvetica] font-medium text-white text-[18px] tracking-[-0.36px] leading-[21.6px] whitespace-nowrap">
                Orders
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute w-[653px] h-[748px] top-[347px] left-[1050px]">
        {selectedAction !== 0 && renderFormForEachAction()}
      </div>
    </>
  );
};
