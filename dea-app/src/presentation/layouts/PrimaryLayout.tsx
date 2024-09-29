import * as React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

export function PrimaryLayout({ children }: { children: React.ReactNode }) {
    return (
        <SafeAreaView>
            {children}
        </SafeAreaView>
    )
}

const s = StyleSheet.create({

})