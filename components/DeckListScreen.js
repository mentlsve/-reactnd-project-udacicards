import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import styled from 'styled-components/native'
import DeckListViewItem from './DeckListViewItem'
import { connect } from 'react-redux'
import { getDecks } from '../data'
import { receiveDecks } from '../actions'
import { StackNavigator } from 'react-navigation';
import IndividualDeckView from '../components/IndividualDeckView';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { DefaultScreenContainer, BottomButtonContainer } from './DefaultScreenContainer'
import AppStatusBar from './AppStatusBar';
import { Divider } from 'react-native-elements';

class DeckListScreen extends Component {

    static navigationOptions = {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
            <MaterialCommunityIcons
                name='cards' size={30} color={tintColor} />
        ),
    };

    state = {
        ready: false,
        decks: {}
    }

    componentDidMount() {
        const { navigate } = this.props.navigation
        console.log(navigate)
        const { dispatch } = this.props

        console.log('this.props.decks', this.props.decks)
        getDecks()
            .then((decks) => this.props.dispatch(receiveDecks(decks)))

    }

    render() {
        return (
            <DefaultScreenContainer>
                <ScrollView>
                    { this.props.decks &&
                        Object.keys(this.props.decks).map((key) =>
                            <DeckListViewItem key={key} deck={this.props.decks[key]} navigate={this.props.navigation.navigate} />
                        )
                    }
                </ScrollView>
            </DefaultScreenContainer>
        )
    }
}

mapStateToProps = (state) => ({
    decks: state.decks
})

export default connect(mapStateToProps)(DeckListScreen)