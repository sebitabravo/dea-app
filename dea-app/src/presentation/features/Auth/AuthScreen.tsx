
import { AuthStackParamList } from '@/app/navigation/navigation';
import { ButtonUI2 } from '@/componentsUI/Button2';
import { AuthLayout } from '@/presentation/layouts/AuthLayout';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { Text, View } from 'react-native';

type AuthScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export function AuthScreen() {
    const { navigate } = useNavigation<AuthScreenNavigationProp>();

    return (
        <AuthLayout
            className='flex flex-1 items-center justify-center'
        >

            <Text
                className='text-6xl font-extrabold text-myOrange mt-5'
            >Puntos DEA</Text>

            <View className='flex items-center m-4'>
                <Text className='font-bold text-2xl dark:text-white'>Chisme,</Text>
                <Text className='font-bold text-2xl dark:text-white'>Amor,</Text>
                <Text className='font-bold text-2xl dark:text-white'>Comercio</Text>
            </View>

            <View className='flex space-y-4'>
                <View className='w-screen px-10
                '>
                    <ButtonUI2
                        className='h-12 bg-myYellow'
                        onPress={() => navigate('Login')}
                    >
                        <Text className='text-black font-bold text-lg'>Continuar</Text>
                    </ButtonUI2>
                </View>
            </View>

            <View>
                <View className='w-screen px-10
                '>
                    <ButtonUI2
                        className='h-12 bg-myYellow'
                        onPress={() => navigate('Register')}
                    >
                        <Text className='text-black font-bold text-lg'>Registrarse</Text>
                    </ButtonUI2>
                </View>
            </View>

        </AuthLayout>
    )
}
