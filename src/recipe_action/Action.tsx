import type { CSSProperties, FC } from 'react'
import React, { memo } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { ItemTypes } from './ItemTypes'
import { ActionType } from './Container'
import { SwapAftermath } from './aftermath/swap/SwapAftermath'
import { DepositDeepBook } from './deepbook/deposit/DepositDeepBook'
import { SwapDeepBook } from './deepbook/swap/SwapDeepBook'
import { WithdrawBase } from './deepbook/withdraw/WithdrawBase'

const style: CSSProperties = {
}

export interface ActionProps {
    id: string,
    type: ActionType,
    args: any,
    moveAction: (id: string, to: number) => void
    findAction: (id: string) => { index: number }
    selectAction: (id: string) => void
}

interface Item {
    id: string
    originalIndex: number
}

export const Action: FC<ActionProps> = memo(function Action({
    id,
    type,
    args,
    moveAction,
    findAction,
    selectAction
}) {
    const originalIndex = findAction(id).index
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.ACTION,
            item: { id, originalIndex },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
            end: (item, monitor) => {
                const { id: droppedId, originalIndex } = item
                const didDrop = monitor.didDrop()
                if (!didDrop) {
                    moveAction(droppedId, originalIndex)
                }
            },
        }),
        [id, originalIndex, moveAction],
    )

    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.ACTION,
            hover({ id: draggedId }: Item) {
                if (draggedId !== id) {
                    const { index: overIndex } = findAction(id)
                    moveAction(draggedId, overIndex)
                }
            },
        }),
        [findAction, moveAction],
    )

    const opacity = isDragging ? 0 : 1
    return (
        <div onClick={() => selectAction(id)} ref={(node) => drag(drop(node))} style={{ ...style, opacity }}>
            {type === ActionType.SwapAftermath && <SwapAftermath amount={args.amount} isSuiToUsdc={args.isSuiToUsdc} />}
            {type === ActionType.DepositDeepBook && <DepositDeepBook amount={args.amount} />}
            {type === ActionType.SwapDeepBook && <SwapDeepBook amount={args.amount} />}
            {type === ActionType.WithdrawBase && <WithdrawBase amount={args.amount} />}
        </div>
    )
})
