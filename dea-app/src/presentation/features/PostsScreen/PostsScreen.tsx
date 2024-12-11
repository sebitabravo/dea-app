import { AppStackParamList } from '@/app/navigation/navigation';
import { ButtonUI2 } from '@/componentsUI/Button2';
import { PrimaryLayout } from '@/presentation/layouts/PrimaryLayout';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { PostListContainer } from './components/PostListContainer';


type AppScreenNavigationProp = NativeStackNavigationProp<AppStackParamList>;

export function PostsScreen() {

    const navigation = useNavigation<AppScreenNavigationProp>();


    return (
        <PrimaryLayout>

            <PostListContainer />

            <ButtonUI2
                className='absolute bottom-4 self-center bg-myBlack2 py-2 mx-4'
                onPress={() => navigation.navigate('CreatePost')}
            >
                Crear Post
            </ButtonUI2>
        </PrimaryLayout>
    )
}
