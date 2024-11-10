import * as Haptics from 'expo-haptics'
import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

type RadioButtonOption = {
    label: string
    value: string
}

type RadioGroupProps = {
    options: RadioButtonOption[]
    onValueChange: (value: string) => void
    selectedValue?: string
    haptics?: boolean
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
    options,
    onValueChange,
    selectedValue,
    haptics = false,
}) => {
    const [currentValue, setCurrentValue] = useState<string | undefined>(selectedValue)

    const handlePress = (value: string) => {
        setCurrentValue(value)
        onValueChange(value)
        haptics && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
    }

    return (
        <View
            style={styles.container}>
            {options.map((option) => (
                <Pressable
                    className='bg-white px-4 py-4 rounded-full w-screen flex flex-row justify-between items-center'
                    key={option.value}
                    style={styles.optionContainer}
                    onPress={() => handlePress(option.value)}
                >
                    <Text style={styles.label}>{option.label}</Text>
                    <View
                        style={[styles.radioCircle, currentValue === option.value && styles.selectedCircle]} />
                </Pressable>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    radioCircle: {
        height: 24,
        width: 24,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#555',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    selectedCircle: {
        borderWidth: 7,
    },
    label: {
        fontSize: 16,
        fontWeight: 'semibold',
        color: '#333',
    },
})
