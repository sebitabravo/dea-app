import * as React from 'react';
import { Pressable, View, ViewProps } from 'react-native';

interface OptionCardProps extends ViewProps {
    children: React.ReactNode;
    onPress?: () => void;
}

export function OptionCard({ children, onPress, ...props }: OptionCardProps) {
    return (
        <Pressable
            className="items-center w-full"
            onPress={onPress}
            accessibilityRole="button"
        >
            <View
                className="flex flex-row justify-between items-center space-x-6 bg-white dark:bg-myGray w-[90%] h-14 px-6 rounded-full min-h-[44px]"
                {...props}
            >
                {children}
            </View>
        </Pressable>
    );
}
