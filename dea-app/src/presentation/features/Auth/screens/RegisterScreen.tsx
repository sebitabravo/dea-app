import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { AuthStackParamList } from '@/app/navigation/navigation';
import { ButtonUI } from '@/componentsUI/ButtonUI';
import { InputUI } from '@/componentsUI/InputUI';
import { apiRegister } from '@/data/services/authServices';
import { signIn } from '@/domain/features/auth/auth';
import { setUserData } from '@/domain/features/user/user';
import { GoBackStack } from '@/presentation/components/GoBackStack';
import { PrimaryLayout } from '@/presentation/layouts/PrimaryLayout';

type ScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export function RegisterScreen() {
    const dispatch = useDispatch();
    const { navigate } = useNavigation<ScreenNavigationProp>();

    const [inputFields, setInputFields] = React.useState({
        email: "",
        username: "",
        password: "",
        repeatPassword: ""
    });

    const handleRegister = async () => {
        // Validación de campos vacíos
        if (!inputFields.email || !inputFields.username || !inputFields.password || !inputFields.repeatPassword) {
            Alert.alert('Error', 'Por favor, complete todos los campos.');
            return;
        }

        // Validación de coincidencia de contraseñas
        if (inputFields.password !== inputFields.repeatPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        // Validación del formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputFields.email)) {
            Alert.alert('Error', 'Por favor, ingrese un correo electrónico válido');
            return;
        }

        // Validación de longitud de contraseña
        if (inputFields.password.length < 6) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
            return;
        }

        // Llamada a la API para registrar al usuario
        try {
            const res: any = await apiRegister(inputFields);

            if (res.message === 'Email is already registered') {
                Alert.alert('Error', 'El email ya está registrado');
                return;
            }

            const { token, user } = res;

            // Guardar token y datos de usuario en AsyncStorage
            await AsyncStorage.setItem('@token', token);
            await AsyncStorage.setItem('@user', JSON.stringify(user));

            // Guardar token y datos de usuario en el estado de Redux
            dispatch(signIn(token));
            dispatch(setUserData(user));

        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al registrar el usuario. Inténtelo de nuevo.');
        }
    };

    const handleInputChange = (value: string, field: string) => {
        setInputFields({
            ...inputFields,
            [field]: value
        });
    };

    return (
        <PrimaryLayout>
            <View className='flex justify-center items-center'>
                <GoBackStack />
                <Text className='dark:text-white font-bold text-2xl -mt-8'>Regístrate</Text>
                <View className='w-full flex items-center'>
                    <InputUI
                        label={'Email'}
                        value={inputFields.email}
                        onChangeText={(value) => handleInputChange(value, 'email')}
                    />
                    <InputUI
                        label={'Usuario'}
                        value={inputFields.username}
                        onChangeText={(value) => handleInputChange(value, 'username')}
                    />
                    <InputUI
                        label={'Contraseña'}
                        secureTextEntry={true}
                        value={inputFields.password}
                        onChangeText={(value) => handleInputChange(value, 'password')}
                    />
                    <InputUI
                        label={'Repite tu contraseña'}
                        secureTextEntry={true}
                        value={inputFields.repeatPassword}
                        onChangeText={(value) => handleInputChange(value, 'repeatPassword')}
                    />
                    <View className='w-screen px-10'>
                        <ButtonUI
                            className='h-12 mt-6 bg-myYellow'
                            onPress={handleRegister}
                        >
                            <Text className='text-black'>Siguiente</Text>
                        </ButtonUI>
                    </View>
                    <View className='mt-5 flex flex-row space-x-2 items-center'>
                        <Text className='dark:text-white'>¿Ya tienes cuenta?</Text>
                        <Pressable onPress={() => navigate('Login')}>
                            <Text className='font-bold text-lg text-myGray6 dark:text-background-light'>Entrar</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </PrimaryLayout>
    );
}
