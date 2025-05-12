import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider } from 'react-redux'
import { useColorScheme } from '@/hooks/useColorScheme';
import store from '@/redux/store';
import Toast from 'react-native-toast-message';





SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const [loaded] = useFonts({
    openSans: require('@/assets/fonts/OpenSans-Regular.ttf'),
    winkyRough: require("@/assets/fonts/WinkyRough-Bold.ttf")
  });


  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <StatusBar style='light' backgroundColor='black' translucent={false} />
      <Stack screenOptions={{ animation: 'none', headerShown: false }}>
        <Stack.Screen name='(version)/minor' options={{ animation: 'fade' }} />
      </Stack>

      <Toast
        position='bottom'
        swipeable={false}
        visibilityTime={2000}
        autoHide
      />
    </Provider >
  );
}
