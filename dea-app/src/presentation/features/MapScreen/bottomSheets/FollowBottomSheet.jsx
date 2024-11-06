import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export function FollowBottomSheet() {
    return (
        <View className='flex items-center justify-center mt-10 gap-10 dark:bg-myGray4 h-full'>

            <Text className='font-bold w-[70%] text-center text-lg dark:text-white'>Si sigues a esta persona le revelaras tu indentidad!</Text>

            <View className='flex justify-center flex-row space-x-10 w-[70%]'>
                <Text className='font-bold text-lg dark:text-white'>Cancelar</Text>
                <Text className='font-bold text-lg dark:text-white'>Seguir</Text>
            </View>


        </View>
    )
}

const s = StyleSheet.create({

})