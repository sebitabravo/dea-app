import { MyStackParamList } from '@/app/navigation/navigation'
import { CreatePostDto } from '@/domain/models/post/CreateProductDto'
import { ButtonUI } from '@/componentsUI/ButtonUI'
import { InputUI } from '@/componentsUI/InputUI'
import { apiCreatePost } from '@/data/services/postsServices'
import { GoBackStack } from '@/presentation/components/GoBackStack'
import { PrimaryLayout } from '@/presentation/layouts/PrimaryLayout'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import * as React from 'react'
import { Alert, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import type { RootState } from '@/app/store/store'

type AppScreenNavigationProp = NativeStackNavigationProp<MyStackParamList>;

export function CreatePostScreen() {
    const navigation = useNavigation<AppScreenNavigationProp>();
    const user = useSelector((state: RootState) => state.user);

    const [inputFields, setInputFields] = React.useState<CreatePostDto>({
        user_id: 0,
        title: '',
        content: '',
        image: '',
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSavePost = async () => {
        if (!user.id) {
            Alert.alert('Error', 'Debes iniciar sesion para publicar.');
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await apiCreatePost({
                ...inputFields,
                user_id: user.id,
            });
            if (result) {
                navigation.goBack();
            } else {
                Alert.alert('Error', 'No se pudo crear la publicacion.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Ocurrio un error al crear la publicacion. Intentelo de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (value: string, field: string) => {
        setInputFields((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <PrimaryLayout>
            <GoBackStack
                title='Crear Publicacion'
            />

            <View className='flex justify-center items-center'>
                <InputUI
                    label='Titulo'
                    value={inputFields.title}
                    onChangeText={(text) => handleInputChange(text, 'title')}
                />

                <InputUI
                    label='Publicacion'
                    value={inputFields.content}
                    onChangeText={(text) => handleInputChange(text, 'content')}
                />
            </View>

            <ButtonUI
                className='bg-myBlack3 py-4 mt-8 w-[60%] self-center'
                onPress={handleSavePost}
                isDisabled={isSubmitting}
                accessibilityLabel="Subir publicacion"
            >
                <Text className="text-white">
                    {isSubmitting ? 'Subiendo...' : 'Subir Publicacion!'}
                </Text>
            </ButtonUI>
        </PrimaryLayout>
    )
}
