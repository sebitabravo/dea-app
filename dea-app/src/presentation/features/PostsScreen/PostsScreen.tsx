import { AppStackParamList } from '@/app/navigation/navigation';
import { ButtonUI2 } from '@/componentsUI/Button2';
import { PrimaryLayout } from '@/presentation/layouts/PrimaryLayout';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, Text } from 'react-native';


type AppScreenNavigationProp = NativeStackNavigationProp<AppStackParamList>;

export function PostsScreen() {

    const navigation = useNavigation<AppScreenNavigationProp>();


    return (
        <PrimaryLayout>
            <Text>PostsScreen</Text>

            <ButtonUI2
                onPress={() => navigation.navigate('CreatePost')}
            
            >
                Create Post
            </ButtonUI2>
        </PrimaryLayout>
    )
}

const s = StyleSheet.create({
    
})