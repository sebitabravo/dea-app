import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';

// Screens and Stacks
import { MapScreen } from '@/presentation/features/MapScreen/MapScreen';
import { CreateDeaPointStack } from '@/presentation/features/MapScreen/stacks/CreateDeaPointStack';

const Stack = createNativeStackNavigator();

export function MyStack() {
    return (
        <>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Map" component={MapScreen} />
                <Stack.Screen
                    name="CreatePoint"
                    component={CreateDeaPointStack}
                    options={{
                        presentation: 'fullScreenModal',
                    }}
                />
            </Stack.Navigator>
        </>
    )
}

const s = StyleSheet.create({
    
})