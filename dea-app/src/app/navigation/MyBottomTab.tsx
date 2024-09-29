import { MapScreen } from '@/presentation/features/MapScreen/MapScreen';
import { ProfileScreen } from '@/presentation/features/ProfileScreen/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

const MyTab = createBottomTabNavigator();

export function MyBottomTab() {
    return (
        <View style={s.container}>
            <MyTab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        height: 80,
                    },
                }}
            >
                <MyTab.Screen name="Map" component={MapScreen} />
                <MyTab.Screen name="Profile" component={ProfileScreen} />
            </MyTab.Navigator>
        </View>
    )
}


const s = StyleSheet.create({
    container: {
        flex: 1,
    },
});
