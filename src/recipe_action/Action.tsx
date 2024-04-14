import type { CSSProperties, FC } from 'react'
import React, { memo } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { ItemTypes } from './ItemTypes'

const style: CSSProperties = {

}

export interface ActionProps {
    id: string
    component: React.ReactNode,
    moveAction: (id: string, to: number) => void
    findAction: (id: string) => { index: number }
}

interface Item {
    id: string
    originalIndex: number
}

export const Action: FC<ActionProps> = memo(function Action({
    id,
    component,
    moveAction,
    findAction,
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
        <div ref={(node) => drag(drop(node))} style={{ ...style, opacity }}>
            {component}
        </div>
    )
})
