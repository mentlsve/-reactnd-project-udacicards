import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = "udacicards:notification"

export function insertCard(decks, deckTitle, card) {
    let cards = decks[deckTitle].questions.slice();
    cards.splice(0, 0, card);
    let newDeck = {
        title: deckTitle,
        questions: cards
    }
    return newDeck;
}

export function insertDeck(decks, deck) {
    let newDecks = {
        ...decks,
        [deck.title]: deck
    }
    console.log(newDecks);
    return newDecks;
}

export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  }

  function createNotification () {
    return {
      title: "Let's play a quiz today",
      body: "You have not completed a quiz today so far.",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
      }
    }
  }

  export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()

                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(20)
                tomorrow.setMinutes(0)

                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                )

                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      })
  }