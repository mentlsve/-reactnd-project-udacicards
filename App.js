import React from 'react';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

import { StackNavigator, TabNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';

import DeckListScreen from './components/DeckListScreen'
import IndividualDeckView from './components/IndividualDeckView'
import NewDeckScreen from './components/NewDeckScreen'
import QuizScreen from './components/QuizScreen'
import AddCardScreen from './components/AddCardScreen'


export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <MainNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


const Tabs = TabNavigator({
  DeckListScreen: {
    screen: DeckListScreen
  },
  NewDeckScreen: {
    screen: NewDeckScreen
  },
});

const MainNavigator = StackNavigator({
  Tabs: {screen: Tabs},
  IndividualDeckView: {screen: IndividualDeckView},
  QuizScreen: { screen: QuizScreen},
  AddCardScreen: { screen: AddCardScreen}
});
