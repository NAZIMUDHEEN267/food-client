import { Redirect, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { useVersionCheckMutation } from '@/redux/rtk/authQuery';
import Constants from 'expo-constants'
import { Platform } from 'react-native';
import UiBlocker from '@/components/UiBlocker';
import { addUser } from '@/redux/slices/authSlice';
import * as SplashScreen from 'expo-splash-screen';
import useUser from '@/hooks/useUser';
import { useAppDispatch, useAppState } from '@/types/redux';



if (__DEV__) {
  require('../utils/reactotron');
}



const RootIndex = () => {



  const { user } = useAppState((state) => state.auth);
  const { seenUpdate } = useLocalSearchParams();
  const dispatch = useAppDispatch();
  const { getItem } = useUser();


  const [triggerVersion, { data }] = useVersionCheckMutation();
  console.log({ data });
  

  useEffect(() => {

    const initialFunction = async () => {
      const getUser = await getItem();
      const parse = await JSON.parse(getUser);

      await triggerVersion({ platform: Platform.OS });

      dispatch(addUser(parse || { user: null, token: null }));

      SplashScreen.hideAsync()
    }

    initialFunction()

  }, [])


  if (!data) {
    return <UiBlocker />
  }


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

export default RootIndex