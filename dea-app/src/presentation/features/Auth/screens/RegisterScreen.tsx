import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { AuthStackParamList } from '@/app/navigation/navigation';
import { ButtonUI } from '@/componentsUI/ButtonUI';
import { InputUI } from '@/componentsUI/InputUI';
import { registerUser } from '@/domain/features/auth/auth';
import { setUserData } from '@/domain/features/user/user';
import { GoBackStack } from '@/presentation/components/GoBackStack';
import { PrimaryLayout } from '@/presentation/layouts/PrimaryLayout';
import type { AppDispatch } from '@/app/store/store';

type ScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export function RegisterScreen() {
    const dispatch = useDispatch<AppDispatch>();
    const { navigate } = useNavigation<ScreenNavigationProp>();

    const [inputFields, setInputFields] = React.useState({
        email: '',
        username: '',
        password: '',
        repeatPassword: '',
    });

    const [errorMessage, setErrorMessage] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleRegister = async () => {
        setErrorMessage('');

        if (!inputFields.email || !inputFields.username || !inputFields.password || !inputFields.repeatPassword) {
            setErrorMessage('Por favor, complete todos los campos.');
            return;
        }

        if (inputFields.password !== inputFields.repeatPassword) {
            setErrorMessage('Las contrasenas no coinciden');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputFields.email)) {
            setErrorMessage('Por favor, ingrese un correo electronico valido');
            return;
        }

        if (inputFields.password.length < 6) {
            setErrorMessage('La contrasena debe tener al menos 6 caracteres');
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await dispatch(registerUser({
                username: inputFields.username,
                email: inputFields.email,
                password: inputFields.password,
            })).unwrap();

            dispatch(setUserData(result.user));
        } catch (error: unknown) {
            const message = typeof error === 'string' ? error : 'Ocurrio un error al registrar el usuario. Intentelo de nuevo.';
            setErrorMessage(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (value: string, field: string) => {
        setInputFields({
            ...inputFields,
            [field]: value,
        });
    };

    return (
        <PrimaryLayout>
            <View className="flex justify-center items-center">
                <GoBackStack />
                <Text className="dark:text-white font-bold text-2xl -mt-8">Registrate</Text>
                <View className="w-full flex items-center">
                    <InputUI label="Email" value={inputFields.email} onChangeText={(value) => handleInputChange(value, 'email')} />
                    <InputUI label="Usuario" value={inputFields.username} onChangeText={(value) => handleInputChange(value, 'username')} />
                    <InputUI label="Contrasena" secureText value={inputFields.password} onChangeText={(value) => handleInputChange(value, 'password')} />
                    <InputUI
                        label="Repite tu contrasena"
                        secureText
                        value={inputFields.repeatPassword}
                        onChangeText={(value) => handleInputChange(value, 'repeatPassword')}
                    />

                    {errorMessage ? (
                        <Text
                            className="mt-2 text-center"
                            style={{ color: 'red' }}
                            accessibilityRole="alert"
                        >
                            {errorMessage}
                        </Text>
                    ) : null}

                    <View className="w-screen px-10">
                        <ButtonUI
                            className="h-12 mt-6 bg-primaryGreen"
                            onPress={handleRegister}
                            isDisabled={isSubmitting}
                            accessibilityLabel="Registrarse"
                        >
                            <Text className="text-white">
                                {isSubmitting ? 'Registrando...' : 'Siguiente'}
                            </Text>
                        </ButtonUI>
                    </View>
                    <View className="mt-5 flex flex-row space-x-2 items-center">
                        <Text className="dark:text-white">Ya tienes cuenta?</Text>
                        <Pressable
                            onPress={() => navigate('Login')}
                            accessibilityRole="button"
                            accessibilityLabel="Ir a inicio de sesion"
                        >
                            <Text className="font-bold text-lg text-myGray6 dark:text-background-light">Entrar</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </PrimaryLayout>
    );
}
