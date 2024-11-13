import { InputUI } from '@/componentsUI/InputUI'
import { GoBackStack } from '@/presentation/components/GoBackStack'
import { PrimaryLayout } from '@/presentation/layouts/PrimaryLayout'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'

export function CreatePostStack() {

    const [inputFields, setInputFields] = React.useState({
        title: '',
        content: '',
    });


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
                title='Create Post'
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

        </PrimaryLayout>
    )
}

const s = StyleSheet.create({

})