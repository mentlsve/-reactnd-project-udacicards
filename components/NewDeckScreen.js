import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import  AppStatusBar  from './AppStatusBar';


class NewDeckScreen extends Component {

    static navigationOptions = {
        tabBarLabel: 'New Deck',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons
            name='cards' size={30} color={tintColor}/>
        ),
      };

    render(){
        return (
            <View>
                <AppStatusBar />
                <Text> the card question </Text>
                <Text> View Answer </Text>
                <Text> Correct </Text>
                <Text> Incorrect </Text>
            </View>
        )
    }
}

export default NewDeckScreen