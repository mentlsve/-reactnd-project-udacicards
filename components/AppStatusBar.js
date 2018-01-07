import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { Constants } from 'expo'

class AppStatusBar extends Component {
    render() {
        return (
            <View style={{ height: Constants.statusBarHeight }} backgroundColor={'blue'}>
                <StatusBar backgroundColor={'black'} barStyle="light-content" />
            </View>
        )
    }
}

export default AppStatusBar