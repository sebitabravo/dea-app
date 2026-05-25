import * as React from 'react';
import { Text, View, ViewProps } from 'react-native';

interface ChipUIProps extends ViewProps {
    color?: 'default' | 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    radius?: 'full' | 'lg' | 'md' | 'sm' | 'none';
    variant?: 'solid' | 'outline' | 'flat';
    children: React.ReactNode;
}

export function ChipUI({
    color = 'default',
    size = 'md',
    radius = 'lg',
    variant = 'solid',
    children,
    ...props
}: ChipUIProps) {
    return (
        <View
            {...props}
            className={`
                flex justify-center items-center m-1
                ${color === 'default' && 'bg-default'}
                ${color === 'primary' && 'bg-primary'}
                ${color === 'secondary' && 'bg-secondary'}
                ${size === 'sm' && 'px-2 py-1 min-h-[44px]'}
                ${size === 'md' && 'px-3 py-2 min-h-[44px]'}
                ${size === 'lg' && 'px-4 py-3 min-h-[44px]'}
                ${radius === 'full' && 'rounded-full'}
                ${radius === 'lg' && 'rounded-2xl'}
                ${radius === 'md' && 'rounded-xl'}
                ${radius === 'sm' && 'rounded-md'}
                ${variant === 'solid' && 'bg-opacity-100'}
                ${variant === 'outline' && color === 'primary' && 'bg-transparent border-2 border-primary'}
                ${variant === 'outline' && color === 'secondary' && 'bg-transparent border-2 border-secondary'}
                ${variant === 'flat' && color === 'primary' && 'bg-primaryLight'}
                ${variant === 'flat' && color === 'secondary' && 'bg-secondaryLight'}
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
        </View>
    );
}
