import { signOut } from '@/domain/features/auth/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";

export function useLogout() {
    const dispatch = useDispatch();

    const logout = async () => {
        try {
            // Eliminar el token de AsyncStorage
            await AsyncStorage.removeItem('@token');
            console.log('Token eliminado con éxito');
            
            // Despachar la acción de cerrar sesión
            dispatch(signOut());
        } catch (error) {
            console.log('Error cerrando sesión: ', error);
        }
    };

    return logout;
}
