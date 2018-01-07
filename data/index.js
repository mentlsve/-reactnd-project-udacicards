import { AsyncStorage } from 'react-native'

import { insertCard } from '../util'

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
  return Promise.resolve(initialData)
}

export function getDeck(id) {
  return Promise.resolve(initialData[id])
}

export function saveDeckTitle(title) {

}

export function addCardToDeck(decks, title, card) {
  const modifiedDecks = insertCard(decks, title, card)
  return AsyncStorage.setItem('decks', JSON.stringify(modifiedDecks))
}