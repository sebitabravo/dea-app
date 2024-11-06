import { GoBackStack } from '@/presentation/components/GoBackStack'
import { PrimaryLayout } from '@/presentation/layouts/PrimaryLayout'
import * as React from 'react'
import { StyleSheet, Text } from 'react-native'

export function CreateDeaPointStack() {
    return (
        <PrimaryLayout>
            <GoBackStack />
            <Text className='text-2xl font-bold'>Crear punto de DEA</Text>
        </PrimaryLayout>
    )
}

const s = StyleSheet.create({
    
})