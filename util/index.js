export function insertCard(decks, deckTitle, card) {
    let newArray = decks[deckTitle].questions.slice();
    newArray.splice(0, 0, card);
    return newArray;
}