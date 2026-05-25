import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

// Screens and Stacks
import { BottomSheetProvider } from '@/presentation/context/BottomSheetContext';
import { CreateDeaPointScreen } from '@/presentation/features/MapScreen/screens/CreateDeaPointScreen';
import { CreatePostScreen } from '@/presentation/features/PostsScreen/screens/CreatePostScreen';
import { MyBottomTab } from './MyBottomTab';
import { MyStackParamList } from './navigation';

const Stack = createNativeStackNavigator<MyStackParamList>();

export function MyStack() {
    return (
        <>
            <BottomSheetProvider>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="Home" component={MyBottomTab} />
                    <Stack.Screen
                        name="CreateDeaPoint"
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
