import { signOut } from '@/domain/features/auth/auth';
import { User } from '@/domain/models/user/User';
import { PrimaryLayout } from '@/presentation/layouts/PrimaryLayout';
import { Image } from 'expo-image';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

interface RootState {
    user: User;
}

export function SettingsScreen() {
    const { colorScheme, setColorScheme } = useColorScheme();

    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    // Cerrar sesión
    const handleLogout = async () => {
        dispatch(signOut());
    };

    return (
        <PrimaryLayout className='items-center bg-white dark:bg-gray-800 flex-1'>
            <View className='w-[92%] mt-6'>
                {/* Tarjeta de perfil */}
                <View className='bg-primaryGreen flex-row items-center p-4 rounded-2xl shadow-lg'>

                    <Image
                        source={{
                            uri:
                                'https://firebasestorage.googleapis.com/v0/b/find-you-10755.appspot.com/o/image_abf8dafa-39bd-4bf3-a263-1830c6ff3aed.jpg?alt=media&token=d65c781f-5e9b-46ea-bbd9-b8a35170d3c9'
                        }}
                        className='w-20 h-20 rounded-full mr-4'
                    />
                    <View>
                        <Text className='text-white text-2xl font-semibold'>
                            {user.username ? `${user.username}` : 'Usuario Invitado'}
                        </Text>
                        <Text className='text-white'>{user.email}</Text>
                    </View>
                </View>

                {/* Opciones de configuración */}
                <View className='mt-8'>
                    {/* Modo Oscuro */}
                    <View className='flex-row justify-between items-center mb-6'>
                        <Text className='text-lg font-medium text-gray-700 dark:text-gray-200'>Modo Oscuro</Text>
                        <Switch
                            value={colorScheme === 'dark'}
                            onValueChange={(value) => setColorScheme(value ? 'dark' : 'light')}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={colorScheme ? '#f5dd4b' : '#f4f3f4'}
                        />
                    </View>

                    {/* Otras opciones */}
                    <TouchableOpacity className='mb-6'>
                        <Text className='text-lg font-medium text-gray-700 dark:text-gray-200'>Notificaciones</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='mb-6'>
                        <Text className='text-lg font-medium text-gray-700 dark:text-gray-200'>Cuenta</Text>
                    </TouchableOpacity>

                    {/* Cerrar Sesión */}
                    <TouchableOpacity onPress={handleLogout}>
                        <Text className='text-lg font-medium text-red-500'>Cerrar Sesión</Text>
                    </TouchableOpacity>

                    {/* Version */}
                    <Text className='text-gray-600 text-sm mt-4'>v1.0.0</Text>

                </View>
            </View>
        </PrimaryLayout>
    );
}
