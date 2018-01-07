import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Button } from 'react-native'
import styled from 'styled-components/native'
import { getDeck } from '../data'
import { connect } from 'react-redux'
import { DefaultScreenContainer, BottomButtonContainer } from './DefaultScreenContainer'
import AppStatusBar from './AppStatusBar';

const AddCardButton = styled.TouchableOpacity`
    background-color: white;
    border-radius: 7;
    border-color: black;
    borderWidth: 2;
    height: 45;
    margin-left: 40;
    margin-right: 40;
    margin-top: 10;
    align-items: center;
    justify-content: center;
`

const AddCardButtonText = styled.Text`
    font-size: 20;
    font-weight: bold;
    color: black;
`

const StartQuizButton = styled.TouchableOpacity`
    background-color: black;
    border-radius: 7;
    height: 45;
    margin-left: 40;
    margin-right: 40;
    margin-top: 10;
    align-items: center;
    justify-content: center;
`

const StartQuizButtonText = styled.Text`
    font-size: 20;
    font-weight: bold;
    color: white;
`
const DeckTitle = styled.Text`
    font-size: 30;
    font-weight: bold;
`

const CardCount = styled.Text`
    font-size: 20;
    font-weight: bold;
    color: grey;
`

const MetadataContainer = styled.View`
    margin-top: 120;
    justify-content: center;
    align-items: center;
`

class IndividualDeckView extends Component {

    state = {}

    static navigationOptions = ({ navigation }) => {
        const { key } = navigation.state.params

        return {
            title: key
        }
    }

    render() {
        return (
            <DefaultScreenContainer>
                <MetadataContainer >
                    <DeckTitle>{this.props.deck.title}</DeckTitle>
                    <CardCount>{this.props.deck.questions.length} {this.props.deck.questions.length === 1 ? 'card' : 'cards'}</CardCount>
                </MetadataContainer>
                <BottomButtonContainer >
                    <AddCardButton onPress={() =>
                        this.props.navigation.navigate(
                            'AddCardScreen',
                            { deck: this.props.deck }
                        )
                    }>
                        <AddCardButtonText>Add card</AddCardButtonText>
                    </AddCardButton>
                    {
                        this.props.deck.questions.length > 0 &&
                        <StartQuizButton title='Start Quiz' onPress={() =>
                            this.props.navigation.navigate(
                                'QuizScreen',
                                { deck: this.props.deck }
                            )
                        }>
                        <StartQuizButtonText>Start Quiz</StartQuizButtonText>
                        </StartQuizButton>
                    }
                </BottomButtonContainer>
            </DefaultScreenContainer>
        )
    }
}

mapStateToProps = (state, ownProps) => {

    console.log('IndividualDeckView mapStateToProps', {
        key: ownProps.navigation.state.params.key,
        decks: state.decks
    })
    return {
        deck: state.decks[ownProps.navigation.state.params.key]
    }
}

export default connect(mapStateToProps)(IndividualDeckView)