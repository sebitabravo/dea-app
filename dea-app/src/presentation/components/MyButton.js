import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export function MyButton({ title, onPress }) {
    return (
        <TouchableOpacity
            style={s.button}
            onPress={onPress}>
            <Text style={s.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const s = StyleSheet.create({
    button: {
        backgroundColor: '#4500D9',
        padding: 16,
        borderRadius: 8,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
})