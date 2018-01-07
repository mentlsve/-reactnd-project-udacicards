import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'

const TouchableOpacityStyled = styled.TouchableOpacity`
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
const TextStyled = styled.Text`
font-size: 20;
font-weight: bold;
`

class DefaultButton extends Component {
    render() {
        return (
            <TouchableOpacityStyled onPress={this.props.onPress} style={{ backgroundColor: this.props.backgroundColor }}>
                <TextStyled style={{ color: this.props.color }}>{this.props.children}</TextStyled>
            </TouchableOpacityStyled>
        )
    }
}

export default DefaultButton