import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

const Header = ({ route }) => {

    const router = useRouter();

    const tabLinks = ['home/index', 'orders/index', 'wishlist/index'];


    return (tabLinks?.includes(route) ? (
        <View style={styles.headerRoute}>
            {
                route === 'home/index' ? (
                    <TouchableOpacity style={styles.location}>
                        <Text style={[styles.headerText, { fontSize: 20 }]}>New York</Text>
                        <Ionicons name='chevron-down' size={20} />
                    </TouchableOpacity>
                ) : (
                    <Text style={styles.headerText}>{route?.slice(0, route?.indexOf('/'))}</Text>
                )
            }
            <View style={{ flexDirection: 'row', gap: 15, marginRight: 10 }}>
                <TouchableOpacity style={{ position: 'relative' }}>
                    <Ionicons name='notifications' size={22} color={'orange'} />
                    <View style={styles.number}>
                        <Text style={styles.numberText}>13</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons name='cart' size={22} color={'orange'} />
                    <View style={[styles.number, { backgroundColor: 'crimson' }]}>
                        <Text style={styles.numberText}>13</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    ) : route !== 'profile/[id]' ? (
        <View style={styles.header}>
            <TouchableOpacity onPress={router?.back}>
                <FontAwesome6 name='arrow-left-long' color='#666' size={23} />
            </TouchableOpacity>
        </View>
    ) : null
    )
}

const styles = StyleSheet.create({
    headerRoute: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', paddingVertical: 18, paddingHorizontal: 16, alignItems: 'center' },
    header: { paddingLeft: 10, paddingVertical: 10, backgroundColor: '#fff' },
    tabBarBtn: { width: '100%', justifyContent: 'center', alignItems: 'center', height: '100%' },
    headerText: { fontSize: 33, fontWeight: '700', textTransform: 'capitalize' },
    number: { position: 'absolute', top: -1, right: 1, backgroundColor: 'green', paddingHorizontal: 2, borderRadius: 4, height: 'auto' },
    numberText: { fontSize: 8, color: 'white' },
    location: { flexDirection: 'row', gap: 8, alignItems: 'center' }
})

export default Header