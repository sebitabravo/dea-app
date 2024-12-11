import ArrowIcon from '@/app/assets/icons/MingcuteLeftLine.svg'
import { useNavigation } from '@react-navigation/native'
import * as Haptics from 'expo-haptics'
import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type GoBackStackProps = {
    title?: string
    titleClassName?: string
}

export function GoBackStack({ title, titleClassName }: GoBackStackProps) {
    const { goBack } = useNavigation()

    return (
        <View className={`flex-row items-center px-4 py-4 ${title  || 'w-screen'}`}>

            <TouchableOpacity
                className='justify-center items-center bg-myBlack3 rounded-full h-12 w-12 overflow-hidden z-10'
                onPress={() => {
                    goBack()
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                }}
            >

                <ArrowIcon width={26} height={26} color={'white'} />
            </TouchableOpacity>

            <View className='absolute left-0 right-0 z-0'>
                <Text className={`text-center font-semibold text-[18px] ${titleClassName}`}>{title}</Text>
            </View>
        </View>
    )
}
