import * as React from 'react';
import { SafeAreaView, ViewProps } from 'react-native';

interface PrimaryLayoutProps extends ViewProps {
    children: React.ReactNode;
}

export function PrimaryLayout({ children, ...props }: PrimaryLayoutProps) {
    return (
        <SafeAreaView
            className='flex-1'
            {...props}>
            {children}
        </SafeAreaView>
    );
}