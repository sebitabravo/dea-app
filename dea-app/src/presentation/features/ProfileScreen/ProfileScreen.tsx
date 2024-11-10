
import { PrimaryLayout } from '@/presentation/layouts/PrimaryLayout';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

export function ProfileScreen() {
    const { navigate } = useNavigation();

    const image: string = 'https://img.freepik.com/free-photo/front-view-man-posing-outdoors_23-2151038654.jpg?t=st=1724008996~exp=1724012596~hmac=b2c9895fe3c78239801f8b06b16e2e13ed4eb8f4f13b89c0d93eb8c8d68f2bc8&w=1060'

    return (
        <PrimaryLayout>
            <ScrollView
                vertical
                className='flex-1 w-screen'
            >
                <View
                    className='flex-row self-end px-6 mt-10'
                >

                </View>

                <View className="flex-row -mt-10 space-x-4 justify-center items-center">
                    <Image
                        className="rounded-xl mt-6"
                        style={{
                            width: 100,
                            height: 100,
                            marginBottom: 25,
                            backgroundColor: "gray",
                            transform: [{ rotate: "-20deg" }],
                        }}
                        source={{ uri: image }}

                    />
                    <Image
                        className="rounded-xl mt-6"
                        style={{
                            width: 160,
                            height: 160,
                            marginBottom: 25,
                            backgroundColor: "gray",
                        }}
                        source={{ uri: image }}
                    />
                    <Image
                        className="rounded-xl mt-6"
                        style={{
                            width: 100,
                            height: 100,
                            marginBottom: 25,
                            backgroundColor: "gray",
                            transform: [{ rotate: "20deg" }],

                        }}
                        source={{ uri: image }}
                    />

                    <Image
                        className="rounded-full mt-6 absolute h-10 w-10"
                        style={{
                            backgroundColor: "gray",
                            bottom: 0,
                        }}
                        source={{ uri: image }}
                    />
                </View>


                <View className="flex-col space-x-4 justify-center items-center">


                </View>


                <View className='w-[90%] flex flex-row justify-evenly items-center bg-myYellow self-center rounded-2xl h-14'>

                    <View className='flex items-center space-y-2'>
                        <Text className=''>posts</Text>
                        <Text className='font-bold'>23</Text>
                    </View>

                    <View className='flex items-center space-y-2'>
                        <Text className=''>seguidores</Text>
                        <Text className='font-bold'>230</Text>
                    </View>

                    <View className='flex items-center space-y-2'>
                        <Text className=''>likes</Text>
                        <Text className='font-bold'>234</Text>
                    </View>

                </View>

                <View className='flex flex-row flex-wrap px-2 py-4 gap-1 self-cente mt-2'>

                    <Image
                        className='w-28 h-28 rounded-lg'
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/find-you-10755.appspot.com/o/image_949ba60c-a48e-4ad5-baf9-2e725de82fd2.jpg?alt=media&token=04380662-0ba2-45ba-b139-ac0705279a6a' }} />

                    <Image
                        className='w-28 h-28 rounded-lg'
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/find-you-10755.appspot.com/o/image_55a47886-9507-45d3-b912-af198e6c93a7.jpg?alt=media&token=8f6105a3-2645-4abb-9f4d-1094f062f223' }} />

                    <Image
                        className='w-28 h-28 rounded-lg'
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/find-you-10755.appspot.com/o/image_98b2a849-4797-4716-8edd-0dd32978a41b.jpg?alt=media&token=496fe4d4-38da-4253-a38a-0d8927124268' }} />


                </View>



            </ScrollView>



        </PrimaryLayout >
    );
}
