import { apiLogin } from '@/data/services/apiAuthServices'
import { signIn } from '@/domain/features/auth/auth'
import { setUserData } from '@/domain/features/user/user'
import { MyButton } from '@/presentation/components/MyButton'
import { MyInput } from '@/presentation/components/MyInput'
import { AuthLayout } from '@/presentation/layouts/AuthLayout'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as React from 'react'
import { Text, View } from 'react-native'
import { useDispatch } from 'react-redux'

export function LoginScreen() {
    const dispatch = useDispatch()

    const [inputFields, setInputFields] = React.useState({
        email: "",
        password: ""
    })

    const [errorMessage, setErrorMessage] = React.useState('')

    const handleInputChange = (value, field) => {
        setInputFields((prev) => ({
            ...prev,
            [field]: value
        }))
    }

    const handleLogin = async () => {
        // Validación de campos vacíos
        if (!inputFields.email || !inputFields.password) {
            setErrorMessage('Por favor, complete todos los campos.')
            return
        }

        try {
            const res = await apiLogin(inputFields)
            const token = res.token
            await AsyncStorage.setItem('@token', token)
            dispatch(signIn(token))
            dispatch(setUserData(res.user))
            console.log('data saved')
            setErrorMessage('') // Limpiar mensaje de error al iniciar sesión correctamente
        } catch (error) {
            console.log(error)
            setErrorMessage('Error en el inicio de sesión. Inténtelo de nuevo.')
        }
    }

    return (
        <AuthLayout>
            <Text>Login Screen</Text>

            {errorMessage ? <Text style={{ color: 'red' }}>{errorMessage}</Text> : null}

            <View className='w-full flex items-center'>
                <MyInput
                    label={'Email'}
                    value={inputFields.email}
                    onChangeText={(value) => handleInputChange(value, 'email')}
                />
                <MyInput
                    label={'Contraseña'}
                    secureTextEntry={true}
                    value={inputFields.password}
                    onChangeText={(value) => handleInputChange(value, 'password')}
                />

                <MyButton
                    title={'Iniciar Sesión'}
                    onPress={handleLogin}
                />
            </View>
        </AuthLayout>
    )
}
