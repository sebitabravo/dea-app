import { TabBar } from '@/presentation/components/TabBar';
import { MapScreen } from '@/presentation/features/MapScreen/MapScreen';
import { PostsScreen } from '@/presentation/features/PostsScreen/PostsScreen';
import { SettingsScreen } from '@/presentation/features/SettingsScreen/SettingsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

const MyTab = createBottomTabNavigator();

export function MyBottomTab() {
    return (
        <View style={s.container}>
            <MyTab.Navigator
                    tabBar={(props) => <TabBar {...props} />}
                    screenOptions={{
                        headerShown: false,
                        tabBarStyle: {
                            height: 80,
                        },
                        unmountOnBlur: false,
                        lazy: true,
                    }}
                >
                <MyTab.Screen name="Map" component={MapScreen} />
                <MyTab.Screen name="Posts" component={PostsScreen} />
                <MyTab.Screen name="Settings" component={SettingsScreen} />
            </MyTab.Navigator>
        </View>
    )
}


const s = StyleSheet.create({
    container: {
        flex: 1,
    },
});
