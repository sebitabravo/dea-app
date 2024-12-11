import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';

// Screens and Stacks
import { BottomSheetProvider } from '@/presentation/context/BottomSheetContext';
import { CreateDeaPointScreen } from '@/presentation/features/MapScreen/screens/CreateDeaPointScreen';
import { CreatePostScreen } from '@/presentation/features/PostsScreen/screens/CreatePostScreen';
import { MyBottomTab } from './MyBottomTab';
import { AppStackParamList } from './navigation';

const Stack = createNativeStackNavigator<AppStackParamList>();

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
                        component={CreateDeaPointScreen}
                        options={{
                            presentation: 'fullScreenModal',
                        }}
                    />
                    <Stack.Screen
                        name="CreatePost"
                        component={CreatePostScreen}
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