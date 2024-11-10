import { RegisterScreen } from "@/presentation/features/Auth/screens/RegisterScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from 'react';

// Screens
import { AuthScreen } from "@/presentation/features/Auth/AuthScreen";
import { LoginScreen } from "@/presentation/features/Auth/screens/LoginScreen";
import { AuthStackParamList } from "./navigation";

const Auth = createNativeStackNavigator<AuthStackParamList>()

export function AuthStack() {
    return (
        <Auth.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Auth.Screen name="Auth" component={AuthScreen} />
            <Auth.Screen name="Register" component={RegisterScreen} />
            <Auth.Screen name="Login" component={LoginScreen} />
        </Auth.Navigator>
    )
}