import { restoreToken } from '@/domain/features/auth/auth';
import { setUserData } from '@/domain/features/user/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { Text, View } from 'react-native';
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
        (async () => {
            try {
                const token = await AsyncStorage.getItem('@token');
                const userData = await AsyncStorage.getItem('@user');

                if (token) {
                    dispatch(restoreToken(token));
                    if (userData) {
                        try {
                            const parsedUserData = JSON.parse(userData);
                            dispatch(setUserData(parsedUserData));
                        } catch (error) {
                            console.log('Error al analizar los datos del usuario:', error);
                        }
                    }
                } else {
                    dispatch(restoreToken(null));
                }
            } catch (error) {
                console.log('Error al recuperar los datos:', error);
                dispatch(restoreToken(null));
            }
        })();
    }, [dispatch]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Cargando...</Text>
                </View>
            );
        }

        return userToken ? <MyStack /> : <AuthStack />;
    };

    return (
        <NavigationContainer>
            {renderContent()}
        </NavigationContainer>
    );
}
