import { ButtonUI } from '@/componentsUI/ButtonUI'
import { InputUI } from '@/componentsUI/InputUI'
import { apiLogin } from '@/data/services/authServices'
import { signIn } from '@/domain/features/auth/auth'
import { setUserData } from '@/domain/features/user/user'
import { GoBackStack } from '@/presentation/components/GoBackStack'
import { PrimaryLayout } from '@/presentation/layouts/PrimaryLayout'
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

    const handleInputChange = (value: any, field: any) => {
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
            const user = res.user

            // Guardar token y datos de usuario en AsyncStorage
            await AsyncStorage.setItem('@token', token)
            await AsyncStorage.setItem('@user', JSON.stringify(user))

            // Guardar token y datos de usuario en el estado de Redux
            dispatch(signIn(token))
            dispatch(setUserData(user))

            console.log('Datos guardados:', user)
            setErrorMessage('') // Limpiar mensaje de error al iniciar sesión correctamente
        } catch (error) {
            console.log(error)
            setErrorMessage('Error en el inicio de sesión. Inténtelo de nuevo.')
        }
    }


    return (
        <PrimaryLayout>
            <View className='flex justify-center items-center'>

                <GoBackStack />

                <Text className='dark:text-white font-bold text-2xl'>Inicia sesión</Text>

                <Text className='dark:text-white font-normal text-md'>continua para disfrutar de la aplicacion</Text>

                <View className='w-full flex items-center'>

                    <InputUI
                        label={'Email'}
                        value={inputFields.email}
                        onChangeText={(value) => handleInputChange(value, 'email')}
                    />

                    <InputUI
                        label={'Contraseña'}
                        secureText={true}
                        value={inputFields.password}
                        onChangeText={(value) => handleInputChange(value, 'password')}
                    />

                    {errorMessage ? <Text className='mt-4' style={{ color: 'red' }}>{errorMessage}</Text> : null}

                    <View className='w-screen px-10
                '>
                        <ButtonUI
                            className='h-12 mt-6 bg-myYellow'
                            onPress={handleLogin}
                        >
                            <Text className='text-black'>Iniciar sesión</Text>
                        </ButtonUI>
                    </View>

                </View>

            </View>
        </PrimaryLayout>
    )
}
