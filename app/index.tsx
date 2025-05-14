import { Redirect, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { useVersionCheckMutation } from '@/redux/rtk/authQuery';
import Constants from 'expo-constants'
import { Platform } from 'react-native';
import { addUser } from '@/redux/slices/authSlice';
import * as SplashScreen from 'expo-splash-screen';
import useUser from '@/hooks/useUser';
import { useAppDispatch, useAppState } from '@/types/redux';
import * as QuickActions from "expo-quick-actions";
import { RouterAction, useQuickActionRouting } from "expo-quick-actions/router";



if (__DEV__) {
  require('../utils/reactotron');
}



const RootIndex = () => {

  useQuickActionRouting()


  const { user } = useAppState((state) => state.auth);
  const { seenUpdate } = useLocalSearchParams();
  const dispatch = useAppDispatch();
  const { getItem } = useUser();


  const [triggerVersion, { data }] = useVersionCheckMutation();

  if (user) {
    QuickActions.isSupported()
      .then(res => {
        QuickActions.setItems<RouterAction>([
          {
            "title": "Profile",
            "subtitle": "View your profile",
            icon: "profile",
            id: "0",
            params: { href: "/profile" },
          },
          {
            "title": "Cart",
            "subtitle": "View your cart",
            icon: "profile",
            id: "1",
            params: { href: "/cart" },
          },
        ]);
      })
  } else {

  }


  useEffect(() => {

    const initialFunction = async () => {
      const getUser = await getItem();
      const parse = await JSON.parse(getUser);

      await triggerVersion({ platform: Platform.OS });
      dispatch(addUser(parse || { user: null, token: null }));
    }

    initialFunction()

  }, [])


  if (data) {
    SplashScreen.hideAsync()

    if (parseInt(String(Constants.expoConfig?.version)) < parseInt(String(data?.version))) {
      return <Redirect href={{
        pathname: '/(version)/major',
        params: { version: data?.version }
      }} />
    } else if (!seenUpdate && Constants.expoConfig?.version !== data?.version) {
      return <Redirect href={'/(version)/minor'} />
    }


    return <Redirect href={user ? '/(protected)/home' : '/(auth)'} />
  }
}

export default RootIndex