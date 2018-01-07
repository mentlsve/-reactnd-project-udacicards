export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function addCardToDeckActionCreator(deckTitle, card) {
    return {
        type: ADD_CARD_TO_DECK,
        deckTitle,
        card
    }
}