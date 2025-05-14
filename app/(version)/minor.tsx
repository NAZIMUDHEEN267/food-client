import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import CommonButton from '@/components/common/CommonButton'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import * as Webbrowser from 'expo-web-browser'


const MinorModal = () => {

  const navToInitial = () => {
    router.replace('/?seenUpdate=1')
  }

  return (
    <View style={styles.container}>
      <View style={styles.modal}>


        <TouchableOpacity style={styles.closeStyle}>
          <Ionicons name='close-circle-sharp' size={28} onPress={navToInitial} />
        </TouchableOpacity>

        <Image
          source={require('@/assets/images/burger.png')}
          style={styles.image}
        />
        <Text style={styles.headline}>App Maintenance Update</Text>
        <Text style={styles.text}>
          This release includes routine maintenance, minor fixes, and performance enhancements.
          We recommend updating to the latest version for the smoothest experience.
        </Text>

        <CommonButton
          onClick={() => {
            Webbrowser.openBrowserAsync('https://play.google.com/store/apps/details?id=com.whatsapp&hl=en_IN&pli=1')
          }}
          text='Update'
        />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    height: '40%',
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    position: 'relative',
  },
  image: {
    height: 120,
    width: 120,
    alignSelf: 'center',
    position: 'absolute',
    top: -50
  },
  headline: {
    fontSize: 17,
    marginTop: 70,
    color: '#222',
    fontFamily: 'winkyRough',
    textAlign: 'center'
  },
  text: {
    fontSize: 13,
    marginTop: 8,
    fontWeight: '500',
    fontFamily: 'openSans',
    lineHeight: 17,
    color: '#666',
    textAlign: 'center',
    marginBottom: 'auto'
  },
  closeStyle: {
    position: 'absolute',
    zIndex: 1,
    color: '#000',
    top: -8,
    right: -9
  }
})

export default MinorModal