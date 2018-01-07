import { AsyncStorage } from 'react-native'

import { insertCard, insertDeck} from '../util'

initialData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'Does React Native work with Android?',
        answer: 'Yes'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'No'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'Yes'
      }
    ]
  }
}

export function getDecks() {
  return AsyncStorage.getItem('decks').then(value => {
    if(value === null)
      return initialData
    else
      return JSON.parse(value)
  })
}

export function saveNewDeck(decks, deck) {
  const modifiedDecks = insertDeck(decks, deck)
  console.log("modifiedDecks", modifiedDecks)
  return AsyncStorage.setItem('decks', JSON.stringify(modifiedDecks))

}

export function addCardToDeck(decks, title, card) {
  const modifiedDeck = insertCard(decks, title, card)
  console.log("modifiedDeck", modifiedDeck)
  const modifiedDecks = insertDeck(decks, modifiedDeck)
  console.log("modifiedDecks", modifiedDecks)
  return AsyncStorage.setItem('decks', JSON.stringify(modifiedDecks))
}