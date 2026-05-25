import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';

import HomeIcono from '@/app/assets/icons/MingcuteHome4Line.svg';
import InfoIcon from '@/app/assets/icons/MingcuteInformationLine.svg';
import MapIcon from '@/app/assets/icons/MingcuteMapPinLine.svg';
import UserIcon from '@/app/assets/icons/MingcuteUser2Line.svg';

export const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const animatedValues = React.useRef<Record<string, Animated.Value>>({}).current;

    const getAnimatedValue = (key: string): Animated.Value => {
        if (!animatedValues[key]) {
            animatedValues[key] = new Animated.Value(1);
        }
        return animatedValues[key];
    };

    return (
        <View className="bg-white dark:bg-gray-800" style={s.tabBar}>
            {state.routes.map((route, index) => {
                const focused = state.index === index;
                const { options } = descriptors[route.key];
                const animatedValue = getAnimatedValue(route.key);

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!focused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onPressIn = () => {
                    Animated.spring(animatedValue, {
                        toValue: 0.9,
                        useNativeDriver: true,
                    }).start();
                };

                const onPressOut = () => {
                    Animated.spring(animatedValue, {
                        toValue: 1,
                        useNativeDriver: true,
                    }).start();
                };

                const animatedStyle = {
                    transform: [{ scale: animatedValue }],
                };

                const renderSvgIcon = () => {
                    switch (route.name) {
                        case 'Map':
                            return <MapIcon width={26} height={26} />;
                        case 'Posts':
                            return <InfoIcon width={26} height={26} />;
                        case 'Profile':
                            return <UserIcon width={26} height={26} />;
                        default:
                            return <HomeIcono width={26} height={26} />;
                    }
                };

                const label = options.tabBarAccessibilityLabel ?? route.name;

                return (
                    <Animated.View
                        style={[s.tabItem, animatedStyle, { marginTop: 10 }]}
                        key={route.key}
                    >
                        <Pressable
                            onPress={onPress}
                            onPressIn={onPressIn}
                            onPressOut={onPressOut}
                            accessibilityLabel={label}
                            accessibilityRole="tab"
                            accessibilityState={{ selected: focused }}
                            style={s.touchArea}
                        >
                            <View style={s.iconContainer}>
                                {renderSvgIcon()}
                            </View>
                        </Pressable>
                    </Animated.View>
                );
            })}
        </View>
    );
};

const s = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        height: 80,
        borderColor: 'white',
        justifyContent: 'space-evenly',
    },
    tabItem: {
        width: 60,
    },
    touchArea: {
        minWidth: 44,
        minHeight: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        alignItems: 'center',
    },
    actionsButton: {
        width: 20,
        height: 20,
        backgroundColor: 'blue',
        borderRadius: 21,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
