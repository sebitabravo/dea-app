import * as React from 'react';
import { SafeAreaView, StyleSheet, ViewProps } from 'react-native';

interface PrimaryLayoutProps extends ViewProps {
    children: React.ReactNode;
}

export function PrimaryLayout({ children, ...props }: PrimaryLayoutProps) {
    return (
        <SafeAreaView style={[s.container, props.style]} {...props}>
            {children}
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
});
