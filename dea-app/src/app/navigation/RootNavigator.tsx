import { NavigationContainer } from '@react-navigation/native'
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { MyBottomTab } from './MyBottomTab'

export function RootNavigator() {
    return (
        <NavigationContainer>
            <MyBottomTab />
        </NavigationContainer>
    )
}

const s = StyleSheet.create({

})