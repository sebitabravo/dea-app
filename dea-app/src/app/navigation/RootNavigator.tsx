import { restoreToken } from '@/domain/features/auth/auth';
import { setUserData } from '@/domain/features/user/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AuthStack } from './AuthStack';
import { MyStack } from './MyStack';

interface AuthState {
    userToken: string | null;
    isLoading: boolean;
}

interface RootState {
    auth: AuthState;
}

export function RootNavigator() {
    const { userToken, isLoading } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    React.useEffect(() => {
        const getValue = async () => {
            try {
                // Recuperar el token y los datos del usuario
                const token = await AsyncStorage.getItem('@token');
                const userData = await AsyncStorage.getItem('@user');

                if (token) {
                    dispatch(restoreToken(token));
                    if (userData) {
                        dispatch(setUserData(JSON.parse(userData))); // Restaurar datos del usuario
                    }
                } else {
                    dispatch(restoreToken(null)); // No hay token
                }
            } catch (error) {
                console.log(error);
                dispatch(restoreToken(null)); // En caso de error, restaurar sin token
            }
        };

        getValue();
    }, [dispatch]);

    return (
        <NavigationContainer>
            {
                isLoading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Cargando...</Text>
                    </View>
                ) : userToken ? (
                    <MyStack />
                ) : (
                    <AuthStack />
                )
            }
        </NavigationContainer>
    )
}

const s = StyleSheet.create({

})