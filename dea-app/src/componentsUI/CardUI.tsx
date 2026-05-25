import * as React from 'react';
import { View, ViewProps } from 'react-native';

interface CardUIProps extends ViewProps {
    radius?: 'none' | 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export function CardUI({
    radius = 'lg',
    children,
    ...props
}: CardUIProps) {
    return (
        <View
            {...props}
            className={`bg-background-dark p-6
                ${radius === 'none' && 'rounded-none'}
                ${radius === 'sm' && 'rounded-sm'}
                ${radius === 'md' && 'rounded-md'}
                ${radius === 'lg' && 'rounded-xl'}
            `}
        >
            {children}
        </View>
    );
}
