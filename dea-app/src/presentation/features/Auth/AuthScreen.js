
import { MyButton } from '@/presentation/components/MyButton';
import { AuthLayout } from '@/presentation/layouts/AuthLayout';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Image, Text, View } from 'react-native';


export function AuthScreen() {
    const { navigate } = useNavigation();

    return (
        <AuthLayout>

            <Image
                className='w-full h-96 object-cover mt-16'
                source={require('@/app/assets/backgrounds/auth.jpg')} />

            <Text
                className='text-6xl font-extrabold text-[#4500D9] mt-5'
            >FindYou</Text>

            <View className='flex items-center m-4'>
                <Text className='font-bold text-2xl'>Chisme,</Text>
                <Text className='font-bold text-2xl'>Amor,</Text>
                <Text className='font-bold text-2xl'>Comercio</Text>
            </View>

            <View className='flex space-y-4'>
                <View className='w-screen px-10
                '>
                    <MyButton title='Continuar'
                        onPress={() => navigate('Login')}
                    />
                </View>
                {/* <View>
                    <MyButton title='Registrarse' />
                </View> */}
            </View>

        </AuthLayout>
    )
}
