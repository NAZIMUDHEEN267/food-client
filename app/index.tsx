import { Redirect } from 'expo-router';
import { useSelector } from 'react-redux';
import RootState from '@/types/rootState';

if (__DEV__) {
  require('../utils/reactotron');
}


const RootIndex = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return <Redirect href={user ? '/home' : '/(auth)'} />
}

export default RootIndex