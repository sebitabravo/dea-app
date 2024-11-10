import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';

// Screens and Stacks
import { BottomSheetProvider } from '@/presentation/context/BottomSheetContext';
import { CreateDeaPointStack } from '@/presentation/features/MapScreen/stacks/CreateDeaPointStack';
import { MyBottomTab } from './MyBottomTab';

const Stack = createNativeStackNavigator();

export function MyStack() {
    return (
        <>
            <BottomSheetProvider>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="Main" component={MyBottomTab} />
                    <Stack.Screen
                        name="CreatePoint"
                        component={CreateDeaPointStack}
                        options={{
                            presentation: 'fullScreenModal',
                        }}
                    />
                </Stack.Navigator>
            </BottomSheetProvider>
        </>
    )
}

const s = StyleSheet.create({

})