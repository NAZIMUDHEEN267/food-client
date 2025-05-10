import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Control, Controller, FieldValues, useController } from 'react-hook-form'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';


interface Props<T extends FieldValues> {
    control: Control<T>,
    name: string,
    readonly?: boolean,
    maxDate?: Date
    minDate?: Date
}

function CommonDateInput<T extends FieldValues>({ control, name, readonly, maxDate, minDate }: Props<T>) {

    const [show, setShow] = useState(false);

    const onClick = () => {
        setShow(!show)
    }

    const { field: { onChange, value }, fieldState: { error } } = useController({
        name,
        control,
        defaultValue: new Date()
    })

    const onChangeValue = (e) => {
        onChange(new Date(e?.nativeEvent.timestamp))
        onClick()
    }

    const val = !isNaN(value?.nativeEvent?.timestamp) ? new Date(value?.nativeEvent?.timestamp) : new Date()


    return (
        <>
            <TouchableOpacity onPress={onClick} style={{ width: '100%', marginBottom: 10 }}>
                <TextInput style={styles.input} value={val?.toLocaleDateString()} readOnly />

                <Ionicons
                    name='calendar'
                    size={20}
                    color={'#db6221'}
                    style={{ position: 'absolute', right: 10, top: '25%' }}
                />
            </TouchableOpacity>

            {show && (
                <DateTimePicker
                    value={val}
                    mode="date"
                    display="default"
                    onChange={onChangeValue}
                    disabled={readonly}

                    maximumDate={maxDate}
                    minimumDate={minDate}
                />
            )}
            {error && <Text style={styles.error}>{error?.message}</Text>}
        </>
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
        width: '100%'
    },
    error: {
        color: '#f5717e',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 10,
    }
})

export default CommonDateInput