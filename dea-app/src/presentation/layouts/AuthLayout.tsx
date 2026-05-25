import * as React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

interface PrimaryLayoutProps extends ViewProps {
    children: React.ReactNode;
}

export function AuthLayout({ children, ...props }: PrimaryLayoutProps) {
    return (
        <View style={s.container} {...props}>
            {children}
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
    },
});
