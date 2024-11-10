import { ButtonUI } from '@/componentsUI/ButtonUI';
import * as React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';

export function InfoBottomSheet({ point, origin }) {
    const [distance, setDistance] = React.useState(null);

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radio de la Tierra en km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    React.useEffect(() => {
        if (origin && point) {
            const dist = calculateDistance(origin.latitude, origin.longitude, point.latitude, point.longitude);
            setDistance(dist.toFixed(2));
        }
    }, [origin, point]);

    const handleNavigateWithWaze = () => {
        if (point) {
            const wazeUrl = `https://waze.com/ul?ll=${point.latitude},${point.longitude}&navigate=yes`;
            Linking.openURL(wazeUrl);
        }
    };

    return (
        <View
            className='flex items-center mt-5 space-y-2'
        >

            <Text className='font-semibold text-[18px]'>{point.title}</Text>

            <Text className='font-semibold text-[14px]'>{point.description}</Text>


            {distance !== null && (
                <Text>Distancia: {distance} km</Text>
            )}

            <View className='mt-5'>
            <ButtonUI
                onPress={handleNavigateWithWaze}
                className='bg-blue-500 py-3 px-4 text-white'
            >
                <Text>Ir con Waze</Text>

            </ButtonUI>
            </View>

        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        gap: 10,
    },
});
