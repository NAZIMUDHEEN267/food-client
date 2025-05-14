import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { StyleSheet } from 'react-native'

const UiBlocker = () => {
  return (
    <View style={[StyleSheet.absoluteFill, { justifyContent: 'center', backgroundColor: '#fff', position: 'absolute', zIndex: 1000, top: 0, left: 0, alignItems: 'center' }]}>
        <LottieView 
            source={require('@/assets/lottie/loader.json')}
            style={{ height: 70, width: 70 }}
            autoPlay
            loop
        />
    </View>
  )
}

export default UiBlocker