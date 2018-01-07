import React, { Component } from 'react'
import { View, Text, Button, TextInput, KeyboardAvoidingView } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import AppStatusBar from './AppStatusBar';
import { DefaultScreenContainer, DefaultScreenContainerForInput, LargeCenteredText, BottomButtonContainer } from './DefaultScreenContainer'
import styled from 'styled-components/native'
import { saveNewDeck } from '../data'
import { connect } from 'react-redux'
import { saveDeckActionCreator } from '../actions'

const TitleInput = styled.TextInput`
    margin-left: 20;
    margin-right: 20;
`

class NewDeckScreen extends Component {

    static navigationOptions = {
        tabBarLabel: 'New Deck',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Entypo
                name='circle-with-plus' size={30} color={tintColor} />
        ),
    };

    state = {
        title: ''
    }

    componentDidMount() {
        this.setState({ title: '' })
    }


    handleSubmit = () => {
        console.log('NewDeckScreen:handleSubmit', {
            title: this.state.title,
            decks: this.props.decks
        })

        let deck = {
            title: this.state.title,
            questions: []
        }

        saveNewDeck(this.props.decks, deck).then(
            () => this.props.dispatch(saveDeckActionCreator(deck)))

        this.setState({
            title: '',
        })

        this.props.navigation.goBack()
    }

    render() {
        return (
            <DefaultScreenContainer>
                <DefaultScreenContainerForInput behavior='padding'>
                <LargeCenteredText> What is the title of your new deck? </LargeCenteredText>
                <TitleInput placeholder='Deck title' value={this.state.title}
                    onChangeText={(title) => this.setState({ title })}
                />
                <BottomButtonContainer>
                    <Button
                        onPress={() => this.handleSubmit()}
                        disabled={this.state.title.length === 0} title="Submit">
                    </Button>
                </BottomButtonContainer>
                </DefaultScreenContainerForInput>
            </DefaultScreenContainer>
        )
    }
}

mapStateToProps = (state) => ({
    decks: state.decks
})

export default connect(mapStateToProps)(NewDeckScreen)