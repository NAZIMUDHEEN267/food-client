import { StyleSheet, ImageBackground, ScrollView } from 'react-native'
import { Slot } from 'expo-router'
import React from 'react'



const AuthLayout = () => {
    return (
        <React.Fragment>
            <ImageBackground source={require('@/assets/images/auth-bg.jpg')} style={StyleSheet.absoluteFill}>
                <ScrollView keyboardShouldPersistTaps={'handled'} showsVerticalScrollIndicator={false} contentContainerStyle={styles.containerStyle} style={styles.container} >
                    <Slot />
                </ScrollView>
            </ImageBackground>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 15,
        paddingVertical: 20,
        // flex: 1,
    },
    containerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1
    }
})

export default AuthLayout;