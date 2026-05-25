import { MyStackParamList } from '@/app/navigation/navigation';
import { useFetchData } from '@/data/hooks/useFetchData';
import { getGetDeaPoints } from '@/data/services/deaPointsServices';
import { DeaPoints } from '@/domain/models/DeaPoints';
import { useBottomSheet } from '@/presentation/context/BottomSheetContext';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import * as React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { InfoBottomSheet } from './bottomSheets/InfoBottomSheet';
import { DeaPoint } from './components/DeaPoint';

type AppScreenNavigationProp = NativeStackNavigationProp<MyStackParamList>;

export function MapScreen() {
    const { openBottomSheet } = useBottomSheet();
    const navigation = useNavigation<AppScreenNavigationProp>();
    const [origin, setOrigin] = React.useState({ latitude: -38.7359, longitude: -72.5908 });
    const [modeGo, setModeGo] = React.useState(false);
    const mapRef = React.useRef<MapView | null>(null);

    const initialRegion: Region = {
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    };

    const { data: deaPointsData, refetch } = useFetchData(getGetDeaPoints);

    React.useEffect(() => {
        void requestLocationPermission();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            refetch();
            return () => {};
        }, [refetch])
    );

    const requestLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permisos denegados', 'No se puede acceder a la ubicacion.');
            return;
        }
        const location = await Location.getCurrentPositionAsync({});
        setOrigin({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });
    };

    const centerMapOnUser = () => {
        if (mapRef.current) {
            mapRef.current.animateToRegion(
                {
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                },
                1000
            );
        }
    };

    const handlePressMarker = (point: DeaPoints) => {
        openBottomSheet(<InfoBottomSheet point={point} origin={origin} />, ['30%']);
        setModeGo(true);
    };

    return (
        <View>
            <MapView ref={mapRef} style={s.map} initialRegion={initialRegion} showsUserLocation followsUserLocation={modeGo}>
                <Marker coordinate={origin} title="Origen" description="Tu ubicacion actual" anchor={{ x: 0.5, y: 0.5 }} />

                {deaPointsData?.map((point: DeaPoints) => (
                    <Marker
                        key={point.id}
                        coordinate={{
                            latitude: point.latitude,
                            longitude: point.longitude,
                        }}
                        title={point.title}
                        description={point.description}
                        onPress={() => handlePressMarker(point)}
                    >
                        <DeaPoint />
                    </Marker>
                ))}
            </MapView>

            <TouchableOpacity
                style={s.centerButton}
                onPress={centerMapOnUser}
                accessibilityLabel="Centrar mapa en mi ubicacion"
                accessibilityRole="button"
            >
                <Ionicons name="locate" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
                style={s.goButton}
                onPress={() => navigation.navigate('CreateDeaPoint')}
                accessibilityLabel="Crear punto DEA"
                accessibilityRole="button"
            >
                <Text style={s.goButtonText}>Crear punto</Text>
            </TouchableOpacity>
        </View>
    );
}

const s = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%',
    },
    centerButton: {
        position: 'absolute',
        bottom: 100,
        right: 10,
        backgroundColor: 'black',
        borderRadius: 50,
        padding: 10,
        minWidth: 44,
        minHeight: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    goButton: {
        position: 'absolute',
        bottom: 50,
        left: '50%',
        marginLeft: -50,
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        minHeight: 44,
        justifyContent: 'center',
    },
    goButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
