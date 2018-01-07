import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { Constants } from 'expo'

class AppStatusBar extends Component {
    render() {
        return (
            <View style={{ height: Constants.statusBarHeight }}>
                <StatusBar translucent />
            </View>
        )
    }
}

export default AppStatusBar