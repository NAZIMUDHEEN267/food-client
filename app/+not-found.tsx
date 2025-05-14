import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import CommonButton from '@/components/common/CommonButton'
import { useAppState } from '@/types/redux'
import { useRouter } from 'expo-router'

const NotFound = () => {

  const { user } = useAppState(state => state.auth);
  const router = useRouter();

  const navToHome = () => {
    router.replace(user ? '/(protected)/home' : '/(auth)')
  }

  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <Image
        source={require('@/assets/images/404.jpg')}
        style={styles.image}
      />

      <CommonButton
        text='Back To Home'
        style={styles.button}
        onClick={navToHome}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  image: {
    height: 300,
    width: 300
  },
  button: {
    marginTop: 20,
    width: '80%'
  }
})

export default NotFound