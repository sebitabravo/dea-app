import * as React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

export function OptionCard({ children, onPress, ...props }) {

    return (
        <Pressable
            className='items-center w-[100%]'
            onPress={onPress}
        >
            <View
                className='flex flex-row justify-between items-center space-x-6 bg-white dark:bg-myGray w-[90%] h-14 px-6 rounded-full'
                {...props}
            >
                {children}
            </View>
        </Pressable>
    )
}

const s = StyleSheet.create({

})