import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native'
import React from 'react'

interface Props {
    text: string,
    onClick: (e: GestureResponderEvent) => void,
    isLoading?: boolean
}

const CommonButton = ({ text, onClick, isLoading }: Props) => {
    return (
        <TouchableOpacity disabled={isLoading} onPress={onClick} style={styles.button}>
            {
                isLoading ? (
                    null
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
        backgroundColor: 'orange',
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