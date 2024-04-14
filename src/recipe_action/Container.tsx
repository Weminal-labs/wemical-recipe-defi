import update from 'immutability-helper'
import type { FC, ReactElement } from 'react'
import React, { memo, useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'

import { Action } from './Action'
import { ItemTypes } from './ItemTypes'
import { Swap } from '../Swap'
import { Deposit } from '../Deposit'

const style = {

}

export interface ContainerState {
    actions: any[]
}

const ITEMS = [
    {
        id: 1,
        component: <Swap />
    },
    {
        id: 2,
        component: <Deposit />
    },
    {
        id: 3,
        component: <Deposit />
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
