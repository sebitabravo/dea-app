import { RootNavigator } from '@/app/navigation/RootNavigator';
import { store } from '@/app/store/store';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>


        <RootNavigator />

        <StatusBar style="auto" />
      </Provider>


    </GestureHandlerRootView>
  );
}

