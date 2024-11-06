import ArrowIcon from '@/app/assets/icons/MingcuteLeftLine.svg'
import { useNavigation } from '@react-navigation/native'
import * as Haptics from 'expo-haptics'
import * as React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

export function GoBackStack() {
    const { goBack } = useNavigation()

    return (
        <View
            style={s.container}
        >
            <TouchableOpacity
                style={s.button}
                onPress={() => {
                    goBack()
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                }}
            >
                <ArrowIcon width={26} height={26}
                    color={'black'} />
            </TouchableOpacity>
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        marginTop: 12,
        paddingLeft: 18,
        paddingRight: 18,
        zIndex: 20,
    },
    button: {
        borderRadius: 50,
        height: 50,
        width: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    }
})