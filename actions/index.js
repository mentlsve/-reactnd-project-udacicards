export const RECEIVE_DECKS_ACTION = 'RECEIVE_DECKS'
export const ADD_CARD_TO_DECK_ACTION = 'ADD_CARD_TO_DECK'
export const SAVE_DECK_ACTION = 'SAVE_DECK_ACTION'

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS_ACTION,
        decks
    }
}

export function addCardToDeckActionCreator(deckTitle, card) {
    return {
        type: ADD_CARD_TO_DECK_ACTION,
        deckTitle,
        card
    }
}

export function saveDeckActionCreator(deck) {
    return {
        type: SAVE_DECK_ACTION,
        deck
    }
}