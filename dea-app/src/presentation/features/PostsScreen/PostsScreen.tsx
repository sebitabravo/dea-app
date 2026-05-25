import { MyStackParamList } from '@/app/navigation/navigation';
import { ButtonUI } from '@/componentsUI/ButtonUI';
import { PrimaryLayout } from '@/presentation/layouts/PrimaryLayout';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { Text } from 'react-native';
import { PostListContainer } from './components/PostListContainer';

type AppScreenNavigationProp = NativeStackNavigationProp<MyStackParamList>;

export function PostsScreen() {
    const navigation = useNavigation<AppScreenNavigationProp>();

    return (
        <PrimaryLayout>
            <PostListContainer />

            <ButtonUI
                className="absolute bottom-4 self-center bg-myBlack2 py-2 mx-4"
                onPress={() => navigation.navigate('CreatePost')}
                accessibilityLabel="Crear post"
            >
                <Text className="text-white">Crear Post</Text>
            </ButtonUI>
        </PrimaryLayout>
    );
}
