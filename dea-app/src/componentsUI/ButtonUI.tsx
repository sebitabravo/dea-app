import * as Haptics from 'expo-haptics';
import React, { ReactNode } from 'react';
import { GestureResponderEvent, Pressable, PressableProps, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

interface ButtonUIProps extends Omit<PressableProps, 'onPress' | 'onPressIn' | 'onPressOut'> {
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    radius?: 'full' | 'lg' | 'md' | 'sm' | 'none';
    variant?: 'solid' | 'outline' | 'flat' | 'bordered' | 'shadow';
    haptics?: 'none' | 'soft' | 'light' | 'medium' | 'heavy' | 'rigid';
    animation?: 'none' | 'spring' | 'timing';
    children: ReactNode;
    startContent?: ReactNode;
    endContent?: ReactNode;
    onPress?: (event?: GestureResponderEvent) => void;
    onPressIn?: (event?: GestureResponderEvent) => void;
    onPressOut?: (event?: GestureResponderEvent) => void;
    className?: string;
    isDisabled?: boolean;
}

export function ButtonUI({
    color = 'default',
    size = 'sm',
    radius = 'lg',
    variant = 'solid',
    haptics = 'none',
    animation = 'spring',
    children,
    startContent,
    endContent,
    onPress,
    onPressIn,
    onPressOut,
    className,
    isDisabled = false,
    ...rest
}: ButtonUIProps) {
    const animatedValue = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: animatedValue.value }],
        };
    });

    const handlePressIn = (event?: GestureResponderEvent) => {
        if (onPressIn) onPressIn(event);
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

    const handlePressOut = (event?: GestureResponderEvent) => {
        if (onPressOut) onPressOut(event);
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

    const handleOnPress = (event?: GestureResponderEvent) => {
        if (isDisabled) return;
        if (onPress) onPress(event);
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
                disabled={isDisabled}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handleOnPress}
                className={className || `
                    flex flex-row justify-center items-center m-1 space-x-1
                    ${color === 'default' && 'bg-default'}
                    ${color === 'primary' && 'bg-primary'}
                    ${color === 'secondary' && 'bg-secondary'}
                    ${color === 'success' && 'bg-success'}
                    ${color === 'warning' && 'bg-warning'}
                    ${color === 'danger' && 'bg-danger'}
                    ${size === 'sm' && 'px-2 py-1 min-h-[44px] min-w-[44px]'}
                    ${size === 'md' && 'px-3 py-2 min-h-[44px] min-w-[44px]'}
                    ${size === 'lg' && 'px-4 py-3 min-h-[44px] min-w-[44px]'}
                    ${radius === 'full' && 'rounded-full'}
                    ${radius === 'lg' && 'rounded-2xl'}
                    ${radius === 'md' && 'rounded-xl'}
                    ${radius === 'sm' && 'rounded-md'}
                    ${radius === 'none' && 'rounded-none'}
                    ${variant === 'solid' && ''}
                    ${variant === 'outline' && color === 'primary' && 'bg-transparent border-2 border-primary'}
                    ${variant === 'outline' && color === 'secondary' && 'bg-transparent border-2 border-secondary'}
                    ${variant === 'flat' && color === 'primary' && 'bg-primaryLight'}
                    ${variant === 'flat' && color === 'secondary' && 'bg-secondaryLight'}
                    ${variant === 'bordered' && `bg-transparent border-2 border-${color}`}
                    ${variant === 'shadow' && 'shadow-sm shadow-opacity-50 shadow-offset-2 shadow-radius-4'}
                    ${isDisabled ? 'opacity-50' : ''}
                `}
            >
                {startContent}
                <Text
                    className={`
                        font-semibold
                        ${variant === 'solid' && 'text-white'}
                        ${variant === 'outline' && color === 'primary' && 'text-primary font-bold'}
                        ${variant === 'outline' && color === 'secondary' && 'text-secondary font-bold'}
                        ${variant === 'flat' && color === 'primary' && 'text-primaryDark font-bold'}
                        ${variant === 'flat' && color === 'secondary' && 'text-secondaryDark font-bold'}
                        ${variant === 'bordered' && `text-${color}`}
                        ${variant === 'shadow' && 'text-white'}
                    `}
                >
                    {children}
                </Text>
                {endContent}
            </Pressable>
        </Animated.View>
    );
}
