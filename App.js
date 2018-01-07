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
import AppStatusBar from './components/AppStatusBar'

import { setLocalNotification, clearLocalNotification } from './util'

const Tabs = TabNavigator({
  DeckListScreen: {
    screen: DeckListScreen,

  },
  NewDeckScreen: {
    screen: NewDeckScreen
  },
}, {
  navigationOptions: {
    header: null}
});

const MainNavigator = StackNavigator({
  Tabs: {
    screen: Tabs,
    navigationOptions: {
      headerMode: 'none'
    }
  },
  IndividualDeckView: {screen: IndividualDeckView},
  QuizScreen: { screen: QuizScreen},
  AddCardScreen: { screen: AddCardScreen}
});


export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <AppStatusBar />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
