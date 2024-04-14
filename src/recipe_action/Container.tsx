import update from 'immutability-helper'
import type { FC, ReactElement } from 'react'
import React, { memo, useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'

import { Action } from './Action'
import { ItemTypes } from './ItemTypes'
import { Swap } from '../Swap'
import { Deposit } from '../Deposit'
import { SwapAftermath } from './aftermath/SwapAftermath'
import { DepositDeepBook } from './deepbook/DepositDeepBook'
import { SwapDeepBook } from './deepbook/SwapDeepBook'
import { WithdrawBase } from './deepbook/WithdrawBase'

const style = {
    width: "580px"
}

export interface ContainerState {
    actions: any[]
}

const ITEMS = [
    {
        id: 1,
        component: <SwapAftermath />
    },
    {
        id: 2,
        component: <DepositDeepBook />
    },
    {
        id: 3,
        component: <SwapDeepBook />
    },
    {
        id: 4,
        component: <WithdrawBase />
    },
]

export const Container: FC = memo(function Container() {
    const [actions, setActions] = useState(ITEMS)

    const findAction = useCallback(
        (id: string) => {
            const action = actions.filter((a) => `${a.id}` === id)[0] as {
                id: number
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
                />
            ))}
        </div>
    )
})
