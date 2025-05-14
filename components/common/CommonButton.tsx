import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'

interface Props {
    text: string,
    onClick: (e: GestureResponderEvent) => void,
    isLoading?: boolean,
    style?: StyleProp<ViewStyle>
}

const CommonButton = ({ text, onClick, isLoading, style }: Props) => {
    return (
        <TouchableOpacity disabled={isLoading} onPress={onClick} style={[styles.button, { backgroundColor: isLoading ? '#e3a27f' : 'orange' }, style]}>
            {
                isLoading ? (
                    <LottieView
                        source={require('@/assets/lottie/loader.json')}
                        style={{ height: 30, width: 30 }}
                        autoPlay
                        loop
                    />

                ) : <Text style={styles.text}>{text}</Text>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    text: {
        fontWeight: '600',
        fontSize: 19,
        color: '#fff',
        fontFamily: 'winkyRough'
    }
})

export default CommonButton