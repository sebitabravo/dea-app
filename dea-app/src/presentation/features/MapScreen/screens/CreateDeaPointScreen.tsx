import { MyStackParamList } from '@/app/navigation/navigation';
import { ButtonUI } from '@/componentsUI/ButtonUI';
import { InputUI } from '@/componentsUI/InputUI';
import { apiCreateDeaPoint } from '@/data/services/deaPointsServices';
import { GoBackStack } from '@/presentation/components/GoBackStack';
import { PrimaryLayout } from '@/presentation/layouts/PrimaryLayout';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store/store';

type AppScreenNavigationProp = NativeStackNavigationProp<MyStackParamList>;

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
  const user = useSelector((state: RootState) => state.user);

  const [inputFields, setInputFields] = React.useState<InputFields>({
    title: '',
    description: '',
    latitude: 0,
    longitude: 0,
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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
    if (!user.id) {
      Alert.alert('Error', 'Debes iniciar sesion para crear un punto DEA.');
      return;
    }

    if (!inputFields.latitude || !inputFields.longitude) {
      Alert.alert('Error', 'Por favor ingresa una direccion valida y selecciona una sugerencia.');
      return;
    }

    setIsSubmitting(true);
    try {
      await apiCreateDeaPoint({
        user_id: user.id,
        title: inputFields.title,
        description: inputFields.description,
        latitude: inputFields.latitude,
        longitude: inputFields.longitude,
      });

      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrio un error al crear el punto DEA. Intentelo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PrimaryLayout>
      <GoBackStack title="Crear punto DEA" titleClassName="text-center font-bold text-[24px]" />

      <View style={s.contentContainer}>
        <Text className="text-start font-semibold text-[16px]">Direccion</Text>

        <View className="mt-2" style={s.googlePlacesContainer}>
          <GooglePlacesAutocomplete
            placeholder="Ingresa una direccion"
            fetchDetails
            onPress={handlePlaceSelect}
            query={{
              key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY || '',
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

        <ButtonUI
          className="bg-primaryGreen py-4 px-10 text-white mt-4"
          onPress={handleSubmit}
          isDisabled={isSubmitting}
          accessibilityLabel="Crear punto DEA"
        >
          <Text className="text-white">
            {isSubmitting ? 'Creando...' : 'Crear Punto DEA'}
          </Text>
        </ButtonUI>
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
