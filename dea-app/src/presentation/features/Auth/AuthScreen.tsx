
import { AuthStackParamList } from '@/app/navigation/navigation';
import { MyButton } from '@/presentation/components/MyButton';
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
            className='flex-1 flex items-center justify-center'
        >

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
                <View>
                    <MyButton
                        title='Registrarse'
                        onPress={() => navigate('Register')}
                    />
                </View>
            </View>

        </AuthLayout>
    )
}
