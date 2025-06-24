import { View, Text, StatusBar } from 'react-native'
import React, { useCallback } from 'react'
import { useAppState } from '@/types/redux'
import { useFocusEffect } from 'expo-router'

const Home = () => {
  const { type } = useAppState(state => state.auth)

  useFocusEffect(useCallback(() => {
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('white')
  }, []))

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Text>Home</Text>
    </View>
  )
}

export default Home