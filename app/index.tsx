import { Redirect, useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';
import RootState from '@/types/rootState';
import { useEffect, useRef } from 'react';
import { useVersionCheckMutation } from '@/redux/rtk/authQuery';
import { Platform } from 'react-native';
import Constants from 'expo-constants'

if (__DEV__) {
  require('../utils/reactotron');
}




const RootIndex = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { seenUpdate } = useLocalSearchParams();


  const [triggerVersion, { data, isLoading, error }] = useVersionCheckMutation();



  // if (parseFloat(String(Constants.expoConfig?.version)) < parseFloat(String(data?.version))) {
  //   return <Redirect href={{
  //     pathname: '/(version)/major',
  //     params: { version: '0.0.0' }
  //   }} />
  // } else if (!seenUpdate && Constants.expoConfig?.version !== data?.version) {
  //   return <Redirect href={'/(version)/minor'} />
  // }

  return <Redirect href={user ? '/(protected)/home' : '/(auth)'} />
}

export default RootIndex