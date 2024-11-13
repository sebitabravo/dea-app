import { useFetchData } from '@/data/hooks/useFetchData';
import { getGetDeaPoints } from '@/data/services/deaPointsServices';
import { DeaPoints } from '@/domain/models/DeaPoints';
import { useBottomSheet } from '@/presentation/context/BottomSheetContext';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as React from 'react';
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { InfoBottomSheet } from './bottomSheets/InfoBottomSheet';
import { DeaPoint } from './components/DeaPoint';

export function MapScreen() {
    const { openBottomSheet } = useBottomSheet();

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [origin, setOrigin] = React.useState({ latitude: -38.7359, longitude: -72.5908 });
    const [selectedPoint, setSelectedPoint] = React.useState<{ latitude: number; longitude: number } | null>(null);
    const [modeGo, setModeGo] = React.useState(false);
    const mapRef = React.useRef<MapView | null>(null);

    const initialRegion: Region = {
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    };

    const { data: deaPointsData, loading, refetch } = useFetchData(getGetDeaPoints);

    React.useEffect(() => {
        requestLocationPermission();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            refetch(); 
            return () => {
            };
        }, [])
    );

    // Solicitar permisos de ubicación y obtener la posición del usuario
    const requestLocationPermission = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permisos denegados', 'No se puede acceder a la ubicación.');
            return;
        }
        const location = await Location.getCurrentPositionAsync({});
        setOrigin({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });
    };

    // Función para centrar la vista en la ubicación actual
    const centerMapOnUser = () => {
        if (mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: origin.latitude,
                longitude: origin.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }, 1000);
        }
    };

    // Maneja el evento de presionar un marcador
    const handlePressMarker = (point: DeaPoints) => {
        openBottomSheet(<InfoBottomSheet point={point} origin={origin}  />, ['30%']);
        setSelectedPoint({
            latitude: point.latitude,
            longitude: point.longitude
        });
        // setModalVisible(true);
    };

    // Navegación dentro de la aplicación
    const handleNavigate = () => {
        setModalVisible(false);
        if (selectedPoint) {
            setModeGo(true);
        }
    };

    // Navegación con Waze
    const handleNavigateWithWaze = () => {
        setModalVisible(false);
        if (selectedPoint) {
            const wazeUrl = `https://waze.com/ul?ll=${selectedPoint.latitude},${selectedPoint.longitude}&navigate=yes`;
            Linking.openURL(wazeUrl);
        }
    };

    return (
        <View>
            <MapView
                ref={mapRef}
                style={s.map}
                initialRegion={initialRegion}
                showsUserLocation={true}
                followsUserLocation={modeGo}
            >
                <Marker
                    coordinate={origin}
                    title="Origen"
                    description="Tu ubicación actual"
                    anchor={{ x: 0.5, y: 0.5 }}
                />

                {/* Marcadores de los puntos DEA */}
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

                {/* <MapViewDirections
                    origin={origin}
                    destination={selectedPoint || origin}
                    apikey='AIzaSyDnjMYiWwRaoIGegAq5IAWFvJsgAAidwEw'
                    strokeWidth={3}
                    strokeColor="#FF0000"
                /> */}
            </MapView>

            {/* <TouchableOpacity style={s.createPointButton} onPress={() => navigation.navigate('CreatePoint')}>
                <Text>Mapa</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={s.centerButton} onPress={centerMapOnUser}>
                <Ionicons name="locate" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={s.goButton} onPress={() => navigation.navigate('CreatePoint')}>
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
    createPointButton: {
        position: 'absolute',
        top: 50,
        right: 10,
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 10,
    },
    centerButton: {
        position: 'absolute',
        bottom: 100,
        right: 10,
        backgroundColor: 'black',
        borderRadius: 50,
        padding: 10,
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
    },
    goButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});
