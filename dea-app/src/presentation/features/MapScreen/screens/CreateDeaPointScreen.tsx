import { AppStackParamList } from '@/app/navigation/navigation';
import { ButtonUI2 } from '@/componentsUI/Button2';
import { InputUI } from '@/componentsUI/InputUI';
import { apiCreateDeaPoint } from '@/data/services/deaPointsServices';
import { GoBackStack } from '@/presentation/components/GoBackStack';
import { PrimaryLayout } from '@/presentation/layouts/PrimaryLayout';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

type AppScreenNavigationProp = NativeStackNavigationProp<AppStackParamList>;

type InputFields = {
  title: string;
  description: string;
  latitude: number;
  longitude: number;
};

type PlaceDetails = {
  geometry?: {
    location?: {
      lat?: number;
      lng?: number;
    };
  };
};

export function CreateDeaPointScreen() {
  const navigation = useNavigation<AppScreenNavigationProp>();

  const [inputFields, setInputFields] = React.useState<InputFields>({
    title: '',
    description: '',
    latitude: 0,
    longitude: 0,
  });

  const handlePlaceSelect = (_data: unknown, details: PlaceDetails | null = null) => {
    const lat = details?.geometry?.location?.lat;
    const lng = details?.geometry?.location?.lng;

    if (typeof lat !== 'number' || typeof lng !== 'number') return;

    setInputFields((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
  };

  const handleInputChange = (value: string, field: 'title' | 'description') => {
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

    await apiCreateDeaPoint({
      user_id: 1,
      title: inputFields.title,
      description: inputFields.description,
      latitude: inputFields.latitude,
      longitude: inputFields.longitude,
    });

    navigation.navigate('Main');
  };

  return (
    <PrimaryLayout>
      <GoBackStack title="Crear punto DEA" titleClassName="text-center font-bold text-[24px]" />

      <View style={s.contentContainer}>
        <Text className="text-start font-semibold text-[16px]">Direccion</Text>

        <View className="mt-2" style={s.googlePlacesContainer}>
          <GooglePlacesAutocomplete
            placeholder="Ingresa una dirección"
            fetchDetails
            onPress={handlePlaceSelect}
            query={{
              key: 'AIzaSyDnjMYiWwRaoIGegAq5IAWFvJsgAAidwEw',
              language: 'es',
              types: 'address',
            }}
            styles={{
              textInput: s.textInput,
              listView: s.listView,
            }}
          />
        </View>

        <InputUI
          label="Nombre"
          placeholder="Ingrese un nombre"
          value={inputFields.title}
          onChangeText={(value: string) => handleInputChange(value, 'title')}
        />

        <InputUI
          label="Descripcion"
          placeholder="Ingrese una Descripcion"
          value={inputFields.description}
          onChangeText={(value: string) => handleInputChange(value, 'description')}
        />

        <ButtonUI2 className="bg-primaryGreen py-4 px-10 text-white mt-4" onPress={handleSubmit}>
          Crear Punto DEA
        </ButtonUI2>
      </View>
    </PrimaryLayout>
  );
}

const s = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  googlePlacesContainer: {
    width: '100%',
    height: 200,
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
