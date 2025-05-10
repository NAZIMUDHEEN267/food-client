import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { Ionicons } from '@expo/vector-icons'


interface Props<T extends FieldValues> {
    control: Control<T>,
    name: string,
    type?: string,
    placeholder: string
    readonly?: boolean
    onClick?: (e: any) => void
}

function CommonInput<T extends FieldValues>({ control, name, readonly, type, placeholder, onClick }: Props<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ fieldState: { error }, field: { onChange, value } }) => (
                <View>
                    <TouchableOpacity activeOpacity={onClick ? .8 : 1} onPress={onClick} style={{ width: '100%' }}>
                        <TextInput
                            value={value}
                            onChangeText={onChange}
                            secureTextEntry={name === 'password'}
                            placeholder={placeholder}
                            placeholderTextColor={'gray'}
                            readOnly={readonly}
                            keyboardType={type ? type : 'default'}
                            style={[styles.input, !error && { marginBottom: 10 }]}
                        />

                        {name === 'profile_image' && <Ionicons
                            name='image'
                            size={20}
                            color={'#db6221'}
                            style={{ position: 'absolute', right: 10, top: '25%' }}
                        />}

                    </TouchableOpacity>
                    {error && <Text style={[styles.error]}>{error?.message}</Text>}
                </View>
            )}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        backgroundColor: '#f2f3f5',
        borderColor: '#c2c8d1',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 10,
        width: '100%',
        fontFamily: 'openSans'
    },
    error: {
        color: '#f5717e',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 10,
    }
})

export default CommonInput