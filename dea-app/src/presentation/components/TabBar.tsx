
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import HomeIcono from '@/app/assets/icons/MingcuteHome4Line.svg'
import InfoIcon from '@/app/assets/icons/MingcuteInformationLine.svg'
import MapIcon from '@/app/assets/icons/MingcuteMapPinLine.svg'
import UserIcon from '@/app/assets/icons/MingcuteUser2Line.svg'



export const TabBar = ({ state, navigation }: BottomTabBarProps) => {
    return (
        <View
            className='bg-white dark:bg-gray-800'
            style={s.tabBar}>
            {
                state.routes.map((route, index) => {
                    const focused = state.index === index
                    const isActions = route.name === 'Actions'
                    const itemColor = focused ? 'red' : 'blue'

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true
                        })
                        if (!focused && !event.defaultPrevented) {
                            navigation.navigate(route.name)
                        }
                    }

                    const animatedValue = new Animated.Value(1)

                    const onPressIn = () => {
                        Animated.spring(animatedValue, {
                            toValue: 0.9,
                            useNativeDriver: true
                        }).start()
                    }

                    const onPressOut = () => {
                        Animated.spring(animatedValue, {
                            toValue: 1,
                            useNativeDriver: true
                        }).start()
                    }

                    const animatedStyle = {
                        transform: [{ scale: animatedValue }]
                    }

                    // Custom SVG icons for each tab
                    const renderSvgIcon = () => {
                        switch (route.name) {
                            case 'Maps':
                                return (
                                    <MapIcon width={26} height={26} />
                                )
                            case 'Profile':
                                return (
                                    <UserIcon width={26} height={26} />
                                )
                            case 'Posts':
                                return (
                                    <InfoIcon width={26} height={26} />
                                )
                            default:
                                return (
                                    <HomeIcono width={26} height={26} />

                                )
                        }
                    }

                    return (
                        <Animated.View
                            style={[s.tabItem, animatedStyle, isActions ? { marginTop: 7 } : { marginTop: 10 }]}
                            key={route.name}
                        >
                            <TouchableOpacity
                                onPress={onPress}
                                onPressIn={onPressIn}
                                onPressOut={onPressOut}
                            >
                                <View style={{ alignItems: 'center' }}>
                                    {renderSvgIcon()}
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    )
                })
            }
        </View>
    )
}

const s = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        height: 80,
        borderColor: 'white',
        justifyContent: 'space-evenly'
    },
    tabItem: {
        width: 60
    },
    actionsButton: {
        width: 20,
        height: 20,
        backgroundColor: 'blue',
        borderRadius: 21,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
