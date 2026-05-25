import { AuthStackParamList } from '@/app/navigation/navigation';
import { ButtonUI } from '@/componentsUI/ButtonUI';
import { AuthLayout } from '@/presentation/layouts/AuthLayout';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import * as React from 'react';
import { Text, View } from 'react-native';

type AuthScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export function AuthScreen() {
    const { navigate } = useNavigation<AuthScreenNavigationProp>();

    return (
        <AuthLayout
            className='flex flex-1 items-center justify-center'
        >
            <Image source={require('@/app/assets/images/dea-logo.jpg')} style={{ width: 200, height: 200 }} />

            <Text
                className='text-6xl font-extrabold text-myOrange mt-5'
            >Puntos DEA</Text>

            <View className='flex items-center m-4'>
                <Text className='font-bold text-xl dark:text-white'>Encuentra puntos cercanos</Text>
            </View>

            <View className='flex space-y-4'>
                <View className='w-screen px-10'>
                    <ButtonUI
                        className='h-12 bg-primaryGreen'
                        onPress={() => navigate('Register')}
                        accessibilityLabel="Continuar al registro"
                    >
                        <Text className='text-white font-bold text-lg'>Continuar</Text>
                    </ButtonUI>
                </View>
            </View>
        </AuthLayout>
    )
}
