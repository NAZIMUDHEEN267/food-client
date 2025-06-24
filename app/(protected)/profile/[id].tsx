import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CommonButton from '@/components/common/CommonButton'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppState } from '@/types/redux';
import { resetState } from '@/redux/actions/reset';
import { Image } from 'expo-image';
import Constants from 'expo-constants';
import ProfileCard from '../../../components/profile/ProfileCard';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Profile = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useAppState((state) => state.auth);

  const signOut = async () => {
    setLoading(true);

    await GoogleSignin.signOut();
    LoginManager.logOut();
    await AsyncStorage.clear()
    dispatch(resetState())

    setLoading(false);
    router.replace('/(auth)');
  }


  return (
    <View style={styles.container}>

      <View style={styles.profileContainer}>
        <View>
          <Text style={styles.user}>{user?.username}</Text>
          <Text style={styles.email}>{user?.email}</Text>

          <TouchableOpacity onPress={() => { }} style={styles.edit_btn}>
            <Text style={styles.edit}>Edit profile</Text>
            <Ionicons name='chevron-forward-sharp' color={'orange'} size={15} style={{ marginTop: 8 }} />
          </TouchableOpacity>

        </View>

        <View>
          <Image
            source={user?.provider === 'password' ? `${process.env.EXPO_PUBLIC_IMAGE_URL}${user?.profile_image}` : user?.profile_image}
            style={styles.image}
          />
        </View>
      </View>


      <View style={styles.boxContainer}>
        <TouchableOpacity style={styles.box}>
          <Ionicons name='heart-outline' color={'orange'} size={19} style={{ marginTop: 8 }} />
          <Text style={styles.edit}>Favorites</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.box}>
          <Ionicons name='wallet-outline' color={'orange'} size={19} style={{ marginTop: 8 }} />
          <Text style={styles.edit}>Wallet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.box}>
          <Ionicons name='receipt-outline' color={'orange'} size={19} style={{ marginTop: 8 }} />
          <Text style={styles.edit}>Orders</Text>
        </TouchableOpacity>

      </View>

      <ProfileCard name={'address-book'} text={'Address Book'} />
      <ProfileCard name={'credit-card'} text={'Payments & Refund'} />
      <ProfileCard name={'life-ring'} text={'Help'} />
      <ProfileCard name={'eye-low-vision'} text={'Privacy'} />
      <ProfileCard name={'arrow-right-from-bracket'} text={'Logout Options'} />


      {/* <CommonButton
        onClick={signOut}
        style={{ backgroundColor: 'red' }}
        text='Sign out'
        isLoading={loading}
      /> */}

      <Text style={styles.version}>Version: {Constants.expoConfig?.version}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 70,
    objectFit: 'contain'
  },
  email: {
    fontWeight: '400',
    color: '#555',
    fontSize: 16
  },
  boxContainer: { flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 15, marginBottom: 25 },
  user: {
    fontWeight: '700',
    color: '#222',
    fontSize: 20,
    textTransform: 'capitalize'
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: '#8888',
    marginVertical: 10,
    marginTop: 'auto'
  },
  edit: {
    marginTop: 6,
    color: 'orange',
    fontWeight: '600'
  },
  profileContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: 'rgba(0,0,0,0.08)'
  },
  edit_btn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    borderRadius: 10,
    flex: .25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#f2e3d5',
  }
})

export default Profile