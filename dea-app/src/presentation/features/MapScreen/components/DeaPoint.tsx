import * as React from 'react'
import { StyleSheet, View } from 'react-native'

import DeaIcon from '@/app/assets/icons/MingcuteHeartbeat2Line.svg'
export function DeaPoint() {
    return (
        <View style={s.container}>
            <DeaIcon width={26} height={26} />  
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        padding: 6,
        backgroundColor: 'white',
        borderRadius: 50,
    }
})