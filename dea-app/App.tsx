import { RootNavigator } from '@/app/navigation/RootNavigator';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-get-random-values';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <RootNavigator />

      <StatusBar style="auto" />

    </GestureHandlerRootView>
  );
}

