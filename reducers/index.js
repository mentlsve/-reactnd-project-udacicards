import {
    RECEIVE_DECKS,
    ADD_CARD_TO_DECK
} from '../actions'

import { insertCard } from '../util'

function deckReducer(state = {}, action) {
    console.log(action)
    switch(action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                decks: action.decks
            }
        case ADD_CARD_TO_DECK:
            return {
                ...state,
                decks: {
                    ...state.decks,
                    [action.deckTitle]: {
                        ...state.decks[action.deckTitle],
                        questions: insertCard(state.decks, action.deckTitle, action.card)
                    }
                }
            }
        default:
            return state
    }
}

export default deckReducer