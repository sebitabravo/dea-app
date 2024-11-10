import * as React from 'react';
import { GestureResponderEvent, PressableProps, View } from 'react-native';

interface ButtonUIProps extends Omit<PressableProps, 'onPress' | 'onPressIn' | 'onPressOut'> {
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    radius?: 'full' | 'lg' | 'md' | 'sm' | 'none';
    variant?: 'solid' | 'bordered' | 'shadow';
    haptics?: 'none' | 'soft' | 'light' | 'medium' | 'heavy' | 'rigid';
    animation?: 'spring' | 'timing';
    children: React.ReactNode;
    onPress?: (event?: GestureResponderEvent) => void;
    onPressIn?: (event?: GestureResponderEvent) => void;
    onPressOut?: (event?: GestureResponderEvent) => void;
    className?: string;
}

export function CardUI({
    radius = 'lg',
    children,
}: ButtonUIProps) {
    return (
        <View
            className={`bg-background-dark p-6
                ${radius === 'none' && 'rounded-none'}
                ${radius === 'sm' && 'rounded-sm'}
                ${radius === 'md' && 'rounded-md'}
                ${radius === 'lg' && 'rounded-xl'}
                `}
        >
            {children}
        </View>
    )
}