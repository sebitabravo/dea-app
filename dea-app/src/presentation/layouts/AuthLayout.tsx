import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

interface PrimaryLayoutProps extends ViewProps {
    children: React.ReactNode;
}


export function AuthLayout({ children, ...props }: PrimaryLayoutProps) {
    const { colorScheme } = useColorScheme();

    const colors = colorScheme === 'dark' ?
        ["#0D0D0D", "#47126b"] :
        ["#FFFFFF", "#47126b"];

    return (
        <LinearGradient
            colors={colors}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 11.3, y: 1 }}
            style={{ flex: 1 }}
        >
            <View style={s.container}
                {...props}
            >
                {children}
            </View>
        </LinearGradient>
    )
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
    },
})