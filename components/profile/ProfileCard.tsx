import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons'

const ProfileCard = ({ name, text, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <FontAwesome6 name={name} size={18} color={'orange'} />
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        paddingVertical: 14,
        gap: 18,
        alignItems: 'center',
        paddingHorizontal: 16,
        marginVertical: 3,
    },
    text: {
        fontWeight: '600',
        color: '#666'
    }
})

export default ProfileCard