import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'
import DeckListViewItem from './DeckListViewItem'
import { connect } from 'react-redux'
import { getDecks } from '../data'
import { receiveDecks } from '../actions'
import { StackNavigator } from 'react-navigation';
import IndividualDeckView from '../components/IndividualDeckView';
import { MaterialCommunityIcons } from '@expo/vector-icons'

const DeckListViewStyled = styled.View`
    flex: 1;
    align-items: stretch;
    height: 50;
    justify-content: space-around
`;

const DeckTitle = styled.Text`
    font-size: 30;
    font-weight: bold;
`


class DeckListScreen extends Component {

    static navigationOptions = {
        title: 'DeckListView',
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
            <MaterialCommunityIcons
              name='cards' size={30} color={tintColor}/>
          ),
        };

    state = {
        ready: false,
        decks: {}
      }

    componentDidMount () {
        const { navigate } = this.props.navigation
        console.log(navigate)
        const { dispatch } = this.props

        getDecks()
          .then((decks) => this.props.dispatch(receiveDecks(decks)))
          .then(({ decks }) => this.setState({
              ready: true,
              decks: decks
            }))
    }

    render() {
        return (

            <DeckListViewStyled>
            {
                Object.keys(this.state.decks).map((key) =>
                <DeckListViewItem key={key} deck={this.state.decks[key]} navigate={this.props.navigation.navigate} />)
            }
            </DeckListViewStyled>
        )
    }
}

export default connect()(DeckListScreen)