import { View, Text } from 'react-native'
import React from 'react'
import { useAppState } from '@/types/redux'

const Home = () => {
  const { type } = useAppState(state => state.auth)
  console.log({ type });

  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home