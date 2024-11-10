import * as Haptics from 'expo-haptics';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

export function ButtonUI({
    color = 'default',
    size = 'sm',
    radius = 'lg',
    variant = 'solid',
    haptics = 'none',
    animation = 'spring',
    children,
    onPress,
    ...rest
}) {
    // Usar useSharedValue para animaciones
    const animatedValue = useSharedValue(1);

    // Definir estilo animado usando useAnimatedStyle
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: animatedValue.value }],
        };
    });

    // Definir funciones para manejar las animaciones
    const onPressIn = () => {
        switch (animation) {
            case 'spring':
                animatedValue.value = withSpring(0.9, {
                    damping: 10,
                    stiffness: 100,
                });
                break;
            case 'timing':
                animatedValue.value = withTiming(0.9, {
                    duration: 100,
                });
                break;
            default:
                break;
        }
    };

    const onPressOut = () => {
        switch (animation) {
            case 'spring':
                animatedValue.value = withSpring(1, {
                    damping: 5,
                    stiffness: 100,
                });
                break;
            case 'timing':
                animatedValue.value = withTiming(1, {
                    duration: 100,
                });
                break;
            default:
                break;
        }
    };

    // Manejar presiones del botón y activar haptics si es necesario
    const handleOnPress = () => {
        onPress();
        switch (haptics) {
            case 'soft':
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
                break;
            case 'light':
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                break;
            case 'medium':
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                break;
            case 'heavy':
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                break;
            case 'rigid':
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
                break;
            default:
                break;
        }
    };

    return (
        <Animated.View style={animatedStyle}>
            <Pressable
                {...rest}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onPress={handleOnPress}
                className={`
          flex justify-center items-center m-1
          ${color === 'default' && 'bg-default'} 
          ${color === 'primary' && 'bg-primary'}
          ${color === 'secondary' && 'bg-secondary'}
          ${color === 'success' && 'bg-success'}
          ${color === 'warning' && 'bg-warning'}
          ${color === 'danger' && 'bg-danger'}
          ${size === 'sm' && 'px-2 py-1'}
          ${size === 'md' && 'px-3 py-2'}
          ${size === 'lg' && 'px-4 py-3'}
          ${radius === 'full' && 'rounded-full'}
          ${radius === 'lg' && 'rounded-2xl'}
          ${radius === 'md' && 'rounded-xl'}
          ${radius === 'sm' && 'rounded-md'}
          ${radius === 'none' && 'rounded-none'}
        `}
            >
                <Text
                    className={`
            font-semibold
            ${variant === 'solid' && 'text-white'}
            ${variant === 'outline' && color === 'primary' && 'text-primary font-bold'}
            ${variant === 'outline' && color === 'secondary' && 'text-secondary font-bold'}
            ${variant === 'flat' && color === 'primary' && 'text-primaryDark font-bold'}
            ${variant === 'flat' && color === 'secondary' && 'text-secondaryDark font-bold'}
          `}
                >
                    {children}
                </Text>
            </Pressable>
        </Animated.View>
    );
}

const s = StyleSheet.create({});
