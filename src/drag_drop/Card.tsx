import type { CSSProperties, FC } from 'react'
import React, { memo } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { ItemTypes } from './ItemTypes'
import { Swap } from '../Swap'
import { Deposit } from '../Deposit'


const style: CSSProperties = {
  
}


export interface CardProps {
    id: string
    text: string
    component: React.ReactNode,
    moveCard: (id: string, to: number) => void
    findCard: (id: string) => { index: number }
}

interface Item {
    id: string
    originalIndex: number
}

export const Card: FC<CardProps> = memo(function Card({
    id,
    text,
    component,
    moveCard,
    findCard,
}) {
    const originalIndex = findCard(id).index
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.CARD,
            item: { id, originalIndex },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
            end: (item, monitor) => {
                const { id: droppedId, originalIndex } = item
                const didDrop = monitor.didDrop()
                if (!didDrop) {
                    moveCard(droppedId, originalIndex)
                }
            },
        }),
        [id, originalIndex, moveCard],
    )

    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.CARD,
            hover({ id: draggedId }: Item) {
                if (draggedId !== id) {
                    const { index: overIndex } = findCard(id)
                    moveCard(draggedId, overIndex)
                }
            },
        }),
        [findCard, moveCard],
    )

    const opacity = isDragging ? 0 : 1
    return (
        <div ref={(node) => drag(drop(node))} style={{ ...style, opacity }}>
            {text}
            {component}
        </div>
    )
})
