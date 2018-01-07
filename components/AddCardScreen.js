import React, { Component } from 'react'

import { DefaultScreenContainer, DefaultScreenContainerForInput, BottomButtonContainer} from './DefaultScreenContainer'
import { View, Text, TextInput, Picker, Button } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import DefaultButton from './DefaultButton'
import AppStatusBar from './AppStatusBar';

import styled from 'styled-components/native'

import { addCardToDeck } from '../data'
import { connect } from 'react-redux'
import { addCardToDeckActionCreator } from '../actions'

const QuestionInput = styled.TextInput`
    margin-left: 20;
    margin-right: 20;
    height: 120;
    max-height: 120;
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
        question: '',
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
            question: '',
            answer: 'Yes'
        })

        this.props.navigation.goBack()

    }

    render() {
        return (
            <DefaultScreenContainer>
                <DefaultScreenContainerForInput behavior='padding'>
                <QuestionText>1. Enter your question:</QuestionText>
                <QuestionInput required
                    multiline={true}
                    numberOfLines={4}
                    maxLength={200}
                    onChangeText={(question) => this.setState({ question })}
                    value={this.state.question}
                    placeholder='Write a question which can be answered with yes or no'
                />
                <CharactersRemainingText>{this.state.question.length}/200 characters</CharactersRemainingText>
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
                    <Button
                        onPress={() => this.handleSubmit()}
                        disabled={this.state.question.length === 0} title="Submit">
                    </Button>
                </BottomButtonContainer>
                </DefaultScreenContainerForInput>
            </DefaultScreenContainer>
        )
    }
}
mapStateToProps = (state, ownProps) => ({
    decks: state.decks,
    currentDeck: ownProps.navigation.state.params.deck
})

export default connect(mapStateToProps)(AddCardScreen)