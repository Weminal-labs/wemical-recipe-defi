import update from 'immutability-helper'
import type { FC, ReactElement } from 'react'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'

import { Action } from './Action'
import { ItemTypes } from './ItemTypes'
import { Swap } from '../Swap'
import { Deposit } from '../Deposit'
import { SwapAftermath } from './aftermath/swap/SwapAftermath'
import { DepositDeepBook } from './deepbook/deposit/DepositDeepBook'
import { SwapDeepBook } from './deepbook/swap/SwapDeepBook'
import { WithdrawBase } from './deepbook/withdraw/WithdrawBase'

const style = {
    width: "580px"
}

export interface ContainerState {
    actions: any[]
}

export enum ActionType {
    SwapAftermath = 1,
    DepositDeepBook = 2,
    SwapDeepBook = 3,
    WithdrawBase = 4

}

const ITEMS = [
    {
        id: 1,
        type: ActionType.SwapAftermath,
        component: <SwapAftermath isSuiToUsdc={true} amount={10} />
    },
    {
        id: 2,
        type: ActionType.DepositDeepBook,
        component: <DepositDeepBook />
    },
    {
        id: 3,
        type: ActionType.SwapDeepBook,
        component: <SwapDeepBook />
    },
    {
        id: 4,
        type: ActionType.SwapDeepBook,
        component: <WithdrawBase />
    },
]

interface ContainerProps {
    setSelectedAction: React.Dispatch<React.SetStateAction<number>>
    actionsArgs: any[]
}

export const Container = memo(function Container({ setSelectedAction, actionsArgs }: ContainerProps) {
    const [actions, setActions] = useState(ITEMS)

    useEffect(() => {

    }, [actionsArgs])

    const selectAction = useCallback(
        (id: string) => {
            setSelectedAction(Number(id))
        },
        [setSelectedAction],
    )

    const findAction = useCallback(
        (id: string) => {
            const action = actions.filter((a) => `${a.id}` === id)[0] as {
                id: number
                type: ActionType
                component: ReactElement
            }
            return {
                action,
                index: actions.indexOf(action),
            }
        },
        [actions],
    )

    const moveAction = useCallback(
        (id: string, atIndex: number) => {
            const { action, index } = findAction(id)
            setActions(
                update(actions, {
                    $splice: [
                        [index, 1],
                        [atIndex, 0, action],
                    ],
                }),
            )
        },
        [findAction, actions, setActions],
    )

    const [, drop] = useDrop(() => ({ accept: ItemTypes.ACTION }))
    return (
        <div ref={drop} style={style}>
            {actions.map((action) => (
                <Action
                    component={action.component}
                    key={action.id}
                    id={`${action.id}`}
                    moveAction={moveAction}
                    findAction={findAction}
                    selectAction={selectAction}
                />
            ))}
        </div>
    )
})
