import { ButtonUI } from '@/componentsUI/ButtonUI'
import { InputUI } from '@/componentsUI/InputUI'
import { loginUser } from '@/domain/features/auth/auth'
import { setUserData } from '@/domain/features/user/user'
import { GoBackStack } from '@/presentation/components/GoBackStack'
import { PrimaryLayout } from '@/presentation/layouts/PrimaryLayout'
import * as React from 'react'
import { Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/app/store/store'

export function LoginScreen() {
    const dispatch = useDispatch<AppDispatch>()

    const [inputFields, setInputFields] = React.useState({
        email: "",
        password: ""
    })

    const [errorMessage, setErrorMessage] = React.useState('')
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const handleInputChange = (value: string, field: string) => {
        setInputFields((prev) => ({
            ...prev,
            [field]: value
        }))
    }

    const handleLogin = async () => {
        if (!inputFields.email || !inputFields.password) {
            setErrorMessage('Por favor, complete todos los campos.')
            return
        }

        setIsSubmitting(true)
        try {
            const result = await dispatch(loginUser(inputFields)).unwrap()
            dispatch(setUserData(result.user))
            setErrorMessage('')
        } catch (error) {
            console.error(error)
            setErrorMessage('Error en el inicio de sesion. Intentelo de nuevo.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <PrimaryLayout>
            <View className='flex justify-center items-center'>

                <GoBackStack />

                <Text className='dark:text-white font-bold text-2xl'>Inicia sesion</Text>

                <Text className='dark:text-white font-normal text-md'>continua para disfrutar de la aplicacion</Text>

                <View className='w-full flex items-center'>

                    <InputUI
                        placeholder=''
                        label={'Email'}
                        value={inputFields.email}
                        onChangeText={(value) => handleInputChange(value, 'email')}
                    />

                    <InputUI
                        placeholder=''
                        label={'Contrasena'}
                        secureText={true}
                        value={inputFields.password}
                        onChangeText={(value) => handleInputChange(value, 'password')}
                    />

                    {errorMessage ? (
                        <Text
                            className='mt-4'
                            style={{ color: 'red' }}
                            accessibilityRole="alert"
                        >
                            {errorMessage}
                        </Text>
                    ) : null}

                    <View className='w-screen px-10'>
                        <ButtonUI
                            className='h-12 mt-6 bg-primaryGreen'
                            onPress={handleLogin}
                            isDisabled={isSubmitting}
                            accessibilityLabel="Iniciar sesion"
                        >
                            <Text className='text-white'>
                                {isSubmitting ? 'Ingresando...' : 'Iniciar sesion'}
                            </Text>
                        </ButtonUI>
                    </View>

                </View>

            </View>
        </PrimaryLayout>
    )
}
