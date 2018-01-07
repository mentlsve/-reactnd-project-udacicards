import React, { Component } from 'react'
import { View, KeyboardAvoidingView } from 'react-native'
import AppStatusBar from './AppStatusBar';
import styled from 'styled-components/native'

export const DefaultScreenContainer = styled.View`
    justify-content: space-between;
    align-items: stretch;
    flex: 1;
    padding-left: 10;
    padding-right: 10;
    background-color: white;
`
export const DefaultScreenContainerForInput = styled.KeyboardAvoidingView`
    justify-content: space-between;
    align-items: stretch;
    flex: 1;
    padding-left: 10;
    padding-right: 10;
    background-color: white;
`

export const BottomButtonContainer = styled.View`
    margin-bottom: 120;
`

export const LargeCenteredText = styled.Text`
    margin-top: 20;
    font-size: 30;
    font-weight: bold;
    text-align: center;
`