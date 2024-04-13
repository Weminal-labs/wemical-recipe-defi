import update from 'immutability-helper'
import type { FC, ReactElement } from 'react'
import React, { memo, useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'

import { Card } from './Card'
import { ItemTypes } from './ItemTypes'
import { Swap } from '../Swap'
import { Deposit } from '../Deposit'

const style = {

}

export interface ContainerState {
    cards: any[]
}

const ITEMS = [
    {
        id: 1,
        text: 'Write a cool JS library',
        component: <Swap />
    },
    {
        id: 2,
        text: 'Make it generic enough',
        component: <Deposit />
    },
    {
        id: 3,
        text: 'Write README',
        component: <Deposit />
    },
]

export const Container: FC = memo(function Container() {
    const [cards, setCards] = useState(ITEMS)

    const findCard = useCallback(
        (id: string) => {
            const card = cards.filter((c) => `${c.id}` === id)[0] as {
                id: number
                text: string
                component: ReactElement
            }
            return {
                card,
                index: cards.indexOf(card),
            }
        },
        [cards],
    )

    const moveCard = useCallback(
        (id: string, atIndex: number) => {
            const { card, index } = findCard(id)
            setCards(
                update(cards, {
                    $splice: [
                        [index, 1],
                        [atIndex, 0, card],
                    ],
                }),
            )
        },
        [findCard, cards, setCards],
    )

    const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }))
    return (
        <div ref={drop} style={style}>
            {cards.map((card) => (
                <Card
                    component={card.component}
                    key={card.id}
                    id={`${card.id}`}
                    text={card.text}
                    moveCard={moveCard}
                    findCard={findCard}
                />
            ))}
        </div>
    )
})
