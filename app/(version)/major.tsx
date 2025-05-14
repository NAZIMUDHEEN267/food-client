import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect } from 'react'
import CommonButton from '@/components/common/CommonButton'
import { useLocalSearchParams } from 'expo-router'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated'
import LottieView from 'lottie-react-native'
import * as Webbrowser from 'expo-web-browser'


const MajorModal = () => {

  const { version } = useLocalSearchParams();

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);
  const zoom = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.ease)
    })

    translateY.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.ease)
    })

    zoom.value = withTiming(1, {
      duration: 500,
      easing: Easing.inOut(Easing.linear)
    })
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }))

  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: zoom.value }]
  }))

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.modal, animatedStyle]}>

        <Animated.View style={imageStyle}>

          <LottieView
            autoPlay
            loop
            source={require('@/assets/lottie/burger.json')}
            style={styles.image}
          />
        </Animated.View>

        <Text style={styles.headline}>🚀 Major Release ({version})</Text>
        <Text style={styles.text}>
          We’re excited to announce a major update packed with new features, performance enhancements, and important improvements across the app
        </Text>
        <Text style={styles.text}>
          Please update now to enjoy the latest experience and improvements.
        </Text>
        <CommonButton
          onClick={() => {
            Webbrowser.openBrowserAsync('https://play.google.com/store/apps/details?id=com.whatsapp&hl=en_IN&pli=1')
          }}
          text='Update'
        />
      </Animated.View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5e6d7',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    height: 'auto',
    width: '80%',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    position: 'relative',
  },
  image: {
    height: 190,
    width: 190,
    alignSelf: 'center',
  },
  headline: {
    fontSize: 25,
    marginTop: 30,
    flexWrap: 'nowrap',
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
    marginBottom: 23
  },
})

export default MajorModal