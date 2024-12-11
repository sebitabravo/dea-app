import { AppStackParamList } from '@/app/navigation/navigation'
import { ButtonUI2 } from '@/componentsUI/Button2'
import { InputUI } from '@/componentsUI/InputUI'
import { apiCreatePost } from '@/data/services/postsServices'
import { GoBackStack } from '@/presentation/components/GoBackStack'
import { PrimaryLayout } from '@/presentation/layouts/PrimaryLayout'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'

type AppScreenNavigationProp = NativeStackNavigationProp<AppStackParamList>;


export function CreatePostScreen() {
    const navigation = useNavigation<AppScreenNavigationProp>();
    const user = useSelector((state: any) => state.user)

    const [inputFields, setInputFields] = React.useState({
        user_id: user.id,
        title: '',
        content: '',
    });

    const handleSavePost = async () => {
        const result = await apiCreatePost(inputFields);

        if (result) {
            navigation.goBack();
        }
    };


    const handleInputChange = (value: string, field: string) => {
        setInputFields((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <PrimaryLayout
        >

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


                <ButtonUI2
                    className='bg-myBlack3 py-4 mt-8 w-[60%] self-center '
                    onPress={handleSavePost}
                >
                    Subir Publicacion!
                </ButtonUI2>

        </PrimaryLayout>
    )
}

const s = StyleSheet.create({

})