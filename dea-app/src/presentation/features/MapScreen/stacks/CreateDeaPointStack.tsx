import { ButtonUI } from '@/componentsUI/ButtonUI';
import { InputUI } from '@/componentsUI/InputUI';
import { apiCreateDeaPoint } from '@/data/services/deaPointsServices';
import { GoBackStack } from '@/presentation/components/GoBackStack';
import { PrimaryLayout } from '@/presentation/layouts/PrimaryLayout';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import uuid from 'react-native-uuid';

export function CreateDeaPointStack() {

    const navigation = useNavigation();

    const [inputFields, setInputFields] = React.useState({
        title: '',
        description: '',
        latitude: 0,
        longitude: 0,
    });

    const handlePlaceSelect = (data: any, details: any) => {
        setInputFields({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
        });
    };

    const handleInputChange = (value: any, field: string) => {
        setInputFields((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        if (!inputFields.latitude || !inputFields.longitude) {
            Alert.alert('Error', 'Por favor ingresa una dirección válida y selecciona una sugerencia.');
            return;
        }

        const newDEAId = uuid.v4(); // Genera un UUID único

        // Alert.alert(
        //     'Punto de DEA creado',
        //     `ID: ${newDEAId}\nDirección: ${inputFields.title}\nLatitud: ${inputFields.latitude}\nLongitud: ${inputFields.longitude}`
        // );

        // crear punto de DEA
        await apiCreateDeaPoint({
            user_id: 1,
            title: inputFields.title,
            description: inputFields.description,
            latitude: inputFields.latitude,
            longitude: inputFields.longitude,
        });

        navigation.navigate('Map');



    };

    return (
        <PrimaryLayout>
            <GoBackStack />

            <Text style={s.headerText}>Crear punto de DEA</Text>

            <View style={s.contentContainer}>

                {/* Contenedor fijo para GooglePlacesAutocomplete */}

                <Text className='text-start font-semibold text-[16px]'>Direccion</Text>

                <View
                   className='mt-2'
                    style={s.googlePlacesContainer}>
                    <GooglePlacesAutocomplete
                        placeholder="Ingresa una dirección"
                        fetchDetails={true}
                        onPress={handlePlaceSelect}
                        query={{
                            key: 'AIzaSyDnjMYiWwRaoIGegAq5IAWFvJsgAAidwEw',
                            language: 'es', // Idioma de las sugerencias
                            types: 'address', // Limita los resultados a direcciones
                        }}
                        styles={{
                            textInput: s.textInput,
                            listView: s.listView,
                        }}
                    />
                </View>

                <InputUI 
                    label={'Nombre '}
                    placeholder={'Ingrese un nombre'}
                    value={inputFields.title}
                    onChangeText={(value: any) => handleInputChange(value, 'title')}
                />

                <InputUI
                    label={'Descripcion '}
                    placeholder={'Ingrese una Descripcion'}
                    value={inputFields.description}
                    onChangeText={(value: any) => handleInputChange(value, 'description')}
                />



                <ButtonUI
                    className='h-12 my-2 mt-6 bg-myOrange'
                    onPress={handleSubmit}
                >
                    <Text className='text-black'>Crear punto de DEA</Text>
                </ButtonUI>
            </View>
        </PrimaryLayout>
    );
}

const s = StyleSheet.create({
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    googlePlacesContainer: {
        width: '100%',
        height: 200, // Altura fija para evitar conflictos de desplazamiento
        marginBottom: 20,
    },
    textInput: {
        height: 60,
        borderColor: '#ccc',
        paddingLeft: 10,
    },
    listView: {
        backgroundColor: '#fff',
    },
});
