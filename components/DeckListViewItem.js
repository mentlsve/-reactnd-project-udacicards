import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Divider } from 'react-native-elements';

const DeckListViewItemStyled = styled.View`
    align-items: stretch;
    justify-content: center;
    height: 200;
    padding-top: 40;
    padding-bottom: 40;
    border-bottom-width: 1;
    border-bottom-color: blue;
    border-top-color: blue;
    border-top-width: 1;
`;

const DeckTitle = styled.Text`
    font-size: 30;
    font-weight: bold;
    text-align: center;
`

const CardCount = styled.Text`
    font-size: 20;
    font-weight: bold;
    color: grey;
    text-align: center;
`


class DeckListViewItem extends Component {

    onPress = () => { this.props.navigate('IndividualDeckView', {key: this.props.deck.title}) }
    render() {
        console.log('DeckListViewItem', this.props)
        return (
            <DeckListViewItemStyled>
                <TouchableOpacity onPress={this.onPress}>
                    <DeckTitle>{this.props.deck.title}</DeckTitle>
                    <CardCount>{this.props.deck.questions.length}</CardCount>
                </TouchableOpacity>
            </DeckListViewItemStyled>
        )
    }
}

export default DeckListViewItem