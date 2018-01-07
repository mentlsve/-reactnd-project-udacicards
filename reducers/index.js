import {
    RECEIVE_DECKS_ACTION,
    ADD_CARD_TO_DECK_ACTION,
    SAVE_DECK_ACTION
} from '../actions'

import { insertCard, insertDeck } from '../util'

function deckReducer(state = {}, action) {
    console.log('deckReducer action', action)
    let newState = {}
    switch(action.type) {
        case RECEIVE_DECKS_ACTION:
            newState = {
                ...state,
                decks: action.decks
            }
            console.log(JSON.stringify(newState))
            return newState
        case ADD_CARD_TO_DECK_ACTION:
            newState = {
                ...state,
                decks: {
                    ...state.decks,
                    [action.deckTitle]: {
                        ...state.decks[action.deckTitle],
                        questions: insertCard(state.decks, action.deckTitle, action.card)
                    }
                }
            }
            console.log(JSON.stringify(newState))
            return newState
        case SAVE_DECK_ACTION:
            newState = {
                ...state,
                decks: insertDeck(state.decks, action.deck)
            }
            console.log(JSON.stringify(newState))
            return newState
        default:
            return state
    }
}

export default deckReducer