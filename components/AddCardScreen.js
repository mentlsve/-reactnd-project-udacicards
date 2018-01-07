import React, { Component } from 'react'

import { DefaultScreenContainer, BottomButtonContainer} from './DefaultScreenContainer'
import { View, Text, TextInput, Picker } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import DefaultButton from './DefaultButton'
import AppStatusBar from './AppStatusBar';

import styled from 'styled-components/native'

import { addCardToDeck } from '../data'
import { connect } from 'react-redux'
import { addCardToDeckActionCreator } from '../actions'

const QuestionInput = styled.TextInput`
    border-color: black;
    border-width: 1;
    margin-left: 20;
    margin-right: 20;
    height: 160;
    max-height: 160;
`

const QuestionText = styled.Text`
    font-size: 20;
    font-weight: bold;
`

const CharactersRemainingText = styled.Text`
    font-size: 10;
    text-align: right;
`

class AddCardScreen extends Component {

    static navigationOptions = {
        headerBackTitle: null,
        label: null,
    };

    state = {
        text: '',
        answer: 'Yes'
    }

    handleSubmit = () => {
        console.log('AddCardScreen:handleSubmit', {
            currentDeckTitle: this.props.currentDeck.title,
            question: this.state.question,
            answer: this.state.answer,
            decks: this.props.decks
        })

        const card = {
            question: this.state.question,
            answer: this.state.answer
        }

        addCardToDeck(this.props.decks, this.props.currentDeck.title, card).then(
            () => this.props.dispatch(addCardToDeckActionCreator(this.props.currentDeck.title, card)))

        this.setState({
            text: '',
            answer: 'Yes'
        })

        this.props.navigation.goBack()

    }

    render() {
        return (
            <DefaultScreenContainer>
                <AppStatusBar />
                <QuestionText>1. Enter your question:</QuestionText>
                <QuestionInput required
                    multiline={true}
                    numberOfLines={4}
                    maxLength={200}
                    onChangeText={(question) => this.setState({ question })}
                    value={this.state.question}
                    placeholder='Write a question which can be answered with yes or no'
                />
                <CharactersRemainingText>{this.state.text.length}/200 characters</CharactersRemainingText>
                <View>
                <QuestionText>2. Select the right answer:</QuestionText>
                <Picker
                    selectedValue={this.state.answer}
                    onValueChange={(itemValue, itemIndex) => this.setState({ answer: itemValue })}>
                    <Picker.Item label="Yes" value="Yes" />
                    <Picker.Item label="No" value="No" />
                </Picker>
                </View>
                <BottomButtonContainer>
                    <DefaultButton backgroundColor='black' color='white' onPress={() => this.handleSubmit()}>
                        Submit
                    </DefaultButton>
                </BottomButtonContainer>
            </DefaultScreenContainer>
        )
    }
}
mapStateToProps = (state, ownProps) => ({
    decks: state.decks,
    currentDeck: ownProps.navigation.state.params.deck
})

export default connect(mapStateToProps)(AddCardScreen)