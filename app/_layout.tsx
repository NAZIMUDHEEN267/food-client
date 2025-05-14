import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring } from 'react-native-reanimated';
import { Provider } from 'react-redux'
import store from '@/redux/store';
import Toast from 'react-native-toast-message';




SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
      <Stack screenOptions={{ animation: 'none', headerShown: false }} />
      <Toast
        position='bottom'
        swipeable={false}
        visibilityTime={2000}
        autoHide
      />
    </Provider >
  );
}
