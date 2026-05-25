import { useColorScheme } from 'nativewind';
import React from 'react';
import { Image, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

import { ButtonUI } from '@/componentsUI/ButtonUI';
import { useLogout } from '@/domain/useCases/auth/hooks/useLogout';
import { PrimaryLayout } from '@/presentation/layouts/PrimaryLayout';
import type { RootState } from '@/app/store/store';

export function ProfileScreen() {
    const logout = useLogout();
    const user = useSelector((state: RootState) => state.user);
    const { colorScheme, setColorScheme } = useColorScheme();
    const image: string = 'https://img.freepik.com/free-photo/front-view-man-posing-outdoors_23-2151038654.jpg?t=st=1724008996~exp=1724012596~hmac=b2c9895fe3c78239801f8b06b16e2e13ed4eb8f4f13b89c0d93eb8c8d68f2bc8&w=1060';

    return (
        <PrimaryLayout>
            <ScrollView className="flex-1 w-screen">
                {/* Profile images section */}
                <View className="flex-row self-end px-6 mt-10" />

                <View className="flex-row -mt-10 space-x-4 justify-center items-center">
                    <Image
                        className="rounded-xl mt-6"
                        style={{
                            width: 100,
                            height: 100,
                            marginBottom: 25,
                            backgroundColor: 'gray',
                            transform: [{ rotate: '-20deg' }],
                        }}
                        source={{ uri: image }}
                    />
                    <Image
                        className="rounded-xl mt-6"
                        style={{
                            width: 160,
                            height: 160,
                            marginBottom: 25,
                            backgroundColor: 'gray',
                        }}
                        source={{ uri: image }}
                    />
                    <Image
                        className="rounded-xl mt-6"
                        style={{
                            width: 100,
                            height: 100,
                            marginBottom: 25,
                            backgroundColor: 'gray',
                            transform: [{ rotate: '20deg' }],
                        }}
                        source={{ uri: image }}
                    />
                    <Image
                        className="rounded-full mt-6 absolute h-10 w-10"
                        style={{
                            backgroundColor: 'gray',
                            bottom: 0,
                        }}
                        source={{ uri: image }}
                    />
                </View>

                {/* User info */}
                <View className="flex-col justify-center items-center mt-4">
                    <Text className="text-2xl font-bold dark:text-white">
                        {user.username || 'Usuario'}
                    </Text>
                    <Text className="text-md text-gray-500 dark:text-gray-300 mt-1">
                        {user.email || ''}
                    </Text>
                </View>

                {/* Stats */}
                <View className="w-[90%] flex flex-row justify-evenly items-center bg-myYellow self-center rounded-2xl h-14">
                    <View className="flex items-center space-y-2">
                        <Text>posts</Text>
                        <Text className="font-bold">23</Text>
                    </View>
                    <View className="flex items-center space-y-2">
                        <Text>seguidores</Text>
                        <Text className="font-bold">230</Text>
                    </View>
                    <View className="flex items-center space-y-2">
                        <Text>likes</Text>
                        <Text className="font-bold">234</Text>
                    </View>
                </View>

                {/* Settings section */}
                <View className="mt-6 px-6">
                    <Text className="text-lg font-semibold dark:text-white mb-4">
                        Configuracion
                    </Text>

                    {/* Dark Mode */}
                    <View className="flex-row justify-between items-center mb-6">
                        <Text className="text-lg font-medium text-gray-700 dark:text-gray-200">
                            Modo Oscuro
                        </Text>
                        <Switch
                            value={colorScheme === 'dark'}
                            onValueChange={(value) =>
                                setColorScheme(value ? 'dark' : 'light')
                            }
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={colorScheme === 'dark' ? '#f5dd4b' : '#f4f3f4'}
                            accessibilityLabel="Alternar modo oscuro"
                        />
                    </View>

                    {/* Notifications */}
                    <TouchableOpacity
                        className="mb-6"
                        accessibilityRole="button"
                        accessibilityLabel="Notificaciones"
                    >
                        <Text className="text-lg font-medium text-gray-700 dark:text-gray-200">
                            Notificaciones
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="mb-6"
                        accessibilityRole="button"
                        accessibilityLabel="Cuenta"
                    >
                        <Text className="text-lg font-medium text-gray-700 dark:text-gray-200">
                            Cuenta
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Gallery */}
                <View className="flex flex-row flex-wrap px-2 py-4 gap-1 self-center mt-2">
                    <Image
                        className="w-28 h-28 rounded-lg"
                        source={{
                            uri: 'https://firebasestorage.googleapis.com/v0/b/find-you-10755.appspot.com/o/image_949ba60c-a48e-4ad5-baf9-2e725de82fd2.jpg?alt=media&token=04380662-0ba2-45ba-b139-ac0705279a6a',
                        }}
                    />
                    <Image
                        className="w-28 h-28 rounded-lg"
                        source={{
                            uri: 'https://firebasestorage.googleapis.com/v0/b/find-you-10755.appspot.com/o/image_55a47886-9507-45d3-b912-af198e6c93a7.jpg?alt=media&token=8f6105a3-2645-4abb-9f4d-1094f062f223',
                        }}
                    />
                    <Image
                        className="w-28 h-28 rounded-lg"
                        source={{
                            uri: 'https://firebasestorage.googleapis.com/v0/b/find-you-10755.appspot.com/o/image_98b2a849-4797-4716-8edd-0dd32978a41b.jpg?alt=media&token=496fe4d4-38da-4253-a38a-0d8927124268',
                        }}
                    />
                </View>

                {/* Version */}
                <Text className="text-gray-600 text-sm text-center mt-4">
                    v1.0.0
                </Text>
            </ScrollView>

            <View className="px-6 pb-4">
                <ButtonUI
                    onPress={logout}
                    color="danger"
                    size="md"
                    className="w-full"
                    accessibilityLabel="Cerrar sesion"
                >
                    Salir
                </ButtonUI>
            </View>
        </PrimaryLayout>
    );
}
