import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Divider } from 'react-native-elements';

const DeckListViewItemStyled = styled.View`
`;

const DeckTitle = styled.Text`
    font-size: 30;
    font-weight: bold;
`

const CardCount = styled.Text`
    font-size: 20;
    font-weight: bold;
    color: grey;
`


class DeckListViewItem extends Component {

    onPress = () => { this.props.navigate('IndividualDeckView', {key: this.props.deck.title}) }

    render() {
        return (
            <DeckListViewItemStyled>
                <TouchableOpacity onPress={this.onPress}>
                    <DeckTitle>{this.props.deck.title}</DeckTitle>
                    <CardCount>{this.props.deck.questions.length}</CardCount>
                    <Divider style={{ backgroundColor: 'blue' }} />
                </TouchableOpacity>
            </DeckListViewItemStyled>
        )
    }
}

export default DeckListViewItem