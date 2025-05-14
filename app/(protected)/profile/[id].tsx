import { View, Text } from 'react-native'
import React, { useState } from 'react'
import CommonButton from '@/components/common/CommonButton'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { useRouter } from 'expo-router';
import { useAppDispatch } from '@/types/redux';
import { resetState } from '@/redux/actions/reset';



const Profile = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const signOut = async () => {
    setLoading(true);

    await GoogleSignin.signOut();
    LoginManager.logOut();
    dispatch(resetState())

    setLoading(false);
    router.replace('/(auth)');
  }

  return (
    <View>
      <CommonButton
        onClick={signOut}
        style={{ backgroundColor: 'red' }}
        text='Sign out'
        isLoading={loading}
      />
    </View>
  )
}

export default Profile