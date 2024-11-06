import { useFetchData } from '@/data/hooks/useFetchData';
import { getGetDeaPoints } from '@/data/services/deaPointsServices';
import { Ionicons } from '@expo/vector-icons'; // Para los iconos
import * as Location from 'expo-location'; // Si usas expo
import { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { DeaPoint } from './components/DeaPoint';

export function MapScreen() {
    const [origin, setOrigin] = useState<{ latitude: number; longitude: number }>({
        latitude: -38.7359,
        longitude: -72.5908,
    });
    const [destination, setDestination] = useState<{ latitude: number; longitude: number } | null>(null);
    const [modeGo, setModeGo] = useState(false);
    const mapRef = useRef<MapView | null>(null); // Referencia al mapa

    const initialRegion: Region = {
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    };

    const { data, loading } = useFetchData(getGetDeaPoints);

    console.log(data)

    // Puntos DEA
    const deaPoints = [
        { id: 1, latitude: -38.7409, longitude: -72.5918, title: "DEA 1", description: "Punto DEA 1" },
        { id: 2, latitude: -38.7375, longitude: -72.5932, title: "DEA 2", description: "Punto DEA 2" },
        { id: 3, latitude: -38.7388, longitude: -72.5889, title: "DEA 3", description: "Punto DEA 3" },
        { id: 4, latitude: -38.7367, longitude: -72.5902, title: "DEA 4", description: "Punto DEA 4" },
        { id: 5, latitude: -38.7395, longitude: -72.5925, title: "DEA 5", description: "Punto DEA 5" },
    ];

    // Solicitar permisos de ubicación y obtener la posición del usuario
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permisos denegados', 'No se puede acceder a la ubicación.');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setOrigin({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        })();
    }, []);

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

    // Función para manejar la selección de un DEA y trazar la ruta
    const handlePressMarker = (point: { latitude: number; longitude: number, title: string }) => {
        setDestination({
            latitude: point.latitude,
            longitude: point.longitude,
        });
        // Alert.alert('Iniciar ruta', `Has seleccionado el ${point.title}`);
    };

    // Seguir la ubicación del usuario en tiempo real en modo "Ir"
    useEffect(() => {
        if (modeGo) {
            const subscription = Location.watchPositionAsync(
                { accuracy: Location.Accuracy.High, distanceInterval: 1 },
                (location) => {
                    setOrigin({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    });
                }
            );
            // return () => subscription?.remove();
        }
    }, [modeGo]);

    // Función para iniciar el modo "Ir" 
    const startNavigation = () => {
        if (!destination) {
            Alert.alert('Error', 'Selecciona un punto DEA primero.');
            return;
        }
        setModeGo(true);
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
                {/* Marcador de origen */}
                <Marker
                    coordinate={origin}
                    title="Origen"
                    description="Tu ubicación actual"
                    anchor={{ x: 0.5, y: 0.5 }}
                />

                {/* Marcadores de los puntos DEA */}
                {deaPoints.map(point => (
                    <Marker
                        key={point.id}
                        coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                        title={point.title}
                        description={point.description}
                        onPress={() => handlePressMarker(point)}
                    >
                        <DeaPoint />
                    </Marker>
                ))}

                <MapViewDirections
                    origin={origin}
                    destination={destination || origin}
                    apikey='AIzaSyDnjMYiWwRaoIGegAq5IAWFvJsgAAidwEw'
                    strokeWidth={3}
                    strokeColor="#FF0000"
                />
            </MapView>


            {/* Botón para centrar la vista en la ubicación del usuario */}
            <TouchableOpacity style={s.centerButton} onPress={centerMapOnUser}>
                <Ionicons name="locate" size={24} color="white" />
            </TouchableOpacity>

            {/* Botón para iniciar el modo "Ir" */}
            <TouchableOpacity style={s.goButton} onPress={startNavigation}>
                <Text style={s.goButtonText}>Iniciar</Text>
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
});
