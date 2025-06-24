import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Feather, FontAwesome, FontAwesome6, Ionicons, Octicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import Header from '@/components/common/Header'

const _layout = () => {
    return (
        <Tabs screenOptions={({ navigation, route }) => ({
            header: () => <Header route={route?.name} />,
            title: '',
            tabBarButton: ({ accessibilityState, onPress }) => {

                const focused = accessibilityState?.selected;

                return (
                    <TouchableOpacity onPress={onPress} style={styles.tabBarBtn}>
                        {
                            route?.name === 'home/index' ?
                                <Ionicons name={focused ? 'home-sharp' : 'home-outline'} size={23} color={focused ? 'orange' : 'black'} />
                                : route?.name === 'orders/index' ?
                                    <Ionicons name={focused ? 'receipt' : 'receipt-outline'} size={23} color={focused ? 'orange' : 'black'} />
                                    : route?.name === 'wishlist/index' ?
                                        <Ionicons name={focused ? 'heart' : 'heart-outline'} size={23} color={focused ? 'orange' : 'black'} />
                                        : route?.name === 'profile/[id]' ?
                                            <FontAwesome name={focused ? 'user' : 'user-o'} size={23} color={focused ? 'orange' : 'black'} /> : null
                        }
                        <Text style={{ textTransform: 'capitalize', fontSize: 11, fontWeight: focused ? '600' : '400', color: focused ? 'orange' : '#555' }}>{route?.name?.slice(0, route?.name.indexOf('/'))}</Text>
                    </TouchableOpacity>

                )
            }
        })}>
            <Tabs.Screen name="home/index" />
            <Tabs.Screen name="orders/index" />
            <Tabs.Screen name="wishlist/index" />
            <Tabs.Screen name="profile/index" />
        </Tabs>
    )
}

const styles = StyleSheet.create({
    header: { paddingLeft: 10, paddingVertical: 10, backgroundColor: '#fff' },
    tabBarBtn: { width: '100%', justifyContent: 'center', alignItems: 'center', height: '100%' }
})

export default _layout