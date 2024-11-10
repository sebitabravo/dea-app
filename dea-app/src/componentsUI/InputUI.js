import * as Haptics from 'expo-haptics';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

// Icons
import CloseIcon from '@/app/assets/icons/MingcuteCloseLine.svg';

export function InputUI({
    label,
    labelPlacement = 'outside',
    placeholder,
    variant = 'flat',
    radius = 'lg',
    value,
    onChangeText,
    secureText = false,
    keyboardType = 'default',
}) {


    const { colorScheme } = useColorScheme();

    const labelPosition = useSharedValue(placeholder ? 1 : 0);

    const animatedLabelStyle = useAnimatedStyle(() => {

        switch (labelPlacement) {
            case 'outside':
                return {
                    top: withTiming(labelPosition.value === 1 ? 0 : 40, { duration: 240 }),
                    left: withTiming(labelPosition.value === 1 ? 18 : 24, { duration: 240 }),
                }
            case 'inside':
                return {
                    top: withTiming(labelPosition.value === 1 ? 27 : 40, { duration: 240 }),
                    left: withTiming(labelPosition.value === 1 ? 16 : 16, { duration: 240 }),
                }

        }

    });

    const handleFocus = () => {
        labelPosition.value = 1;
    };

    const handleBlur = () => {
        if (!value && !placeholder) {
            labelPosition.value = 0;
        }
    };

    const clearText = () => {
        onChangeText('');
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    return (
        <View className='w-[90%] py-2 relative'>
            <Animated.Text
                className={`text-[16px] font-bold text-black dark:text-white z-10 pb-1
                    `}
                style={animatedLabelStyle}
                pointerEvents="none"
            >
                {label}
            </Animated.Text>

            {
                value &&
                <Pressable
                    className='absolute right-4 top-11 z-10 bg-default/20 rounded-full w-6 h-6 flex justify-center items-center'
                    onPress={clearText}
                >
                    <CloseIcon height={16} width={16} fill={colorScheme === 'dark' ? 'white' : 'black'} />
                </Pressable>
            }

            <TextInput
                className={`bg-white dark:bg-myGray h-14 p-4 dark:text-white
                ${radius === 'full' && 'rounded-full'}
                ${radius === 'lg' && 'rounded-2xl'}
                ${radius === 'md' && 'rounded-xl'}
                ${radius === 'sm' && 'rounded-md'}
                ${radius === 'none' && 'rounded-none'}
                ${variant === 'flat' && 'bg-white dark:bg-myGray'}
                ${variant === 'bordered' && 'border-2 border-gray-300 bg-transparent'}
                ${variant === 'faded' && 'border-2 border-gray-300 bg-white'}
                ${labelPlacement === 'inside' && 'pb-[1px]'}

                    `}
                placeholder={placeholder ? placeholder : null}
                value={value}
                onChangeText={onChangeText}
                onFocus={handleFocus}
                onBlur={handleBlur}
                secureTextEntry={secureText}
                keyboardType={keyboardType}
            >

            </TextInput>
        </View>
    );
}

const s = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
});
