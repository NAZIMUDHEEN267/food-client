import { Redirect, useLocalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import RootState from '@/types/rootState';
import { useEffect, useRef, useState } from 'react';
import { useVersionCheckMutation } from '@/redux/rtk/authQuery';
import Constants from 'expo-constants'
import { Platform } from 'react-native';
import UiBlocker from '@/components/UiBlocker';
import { addUser } from '@/redux/slices/authSlice';
import * as SplashScreen from 'expo-splash-screen';
import useUser from '@/hooks/useUser';



if (__DEV__) {
  require('../utils/reactotron');
}




const RootIndex = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { seenUpdate } = useLocalSearchParams();
  const dispatch = useDispatch();
  const { getItem } = useUser();


  const [triggerVersion, { data, isLoading, error }] = useVersionCheckMutation();


  useEffect(() => {

    triggerVersion({ platform: Platform.OS })
      .then(res => getItem()).
      then(res => {
        const parse = JSON.parse(res);
        dispatch(addUser(parse || { user: null, token: null }));
      })
      .then(res => SplashScreen.hideAsync())
      .catch(err => console.error({ err }))

  }, [])


  if (isLoading) {
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

  return <Redirect href={'/(auth)'} />
}

export default RootIndex