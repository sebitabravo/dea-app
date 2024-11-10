import { NavigationContainer } from '@react-navigation/native'
import * as React from 'react'
import { StyleSheet } from 'react-native'
import { MyStack } from './MyStack'

export function RootNavigator() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}

const s = StyleSheet.create({

})