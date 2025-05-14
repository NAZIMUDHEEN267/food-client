import { View, Text, StyleSheet, TextInput, Button, ImageBackground, ScrollView } from 'react-native'
import React from 'react'
import CommonInput from '@/components/common/CommonInput'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import CommonButton from '@/components/common/CommonButton'
import { Link, useRouter } from 'expo-router'
import Toast from 'react-native-toast-message';
import { useForgotPasswdMutation } from '@/redux/rtk/authQuery'
import { forgotType } from '@/types/auth/query'


interface EmailProps {
    email: string,
    user: string
}

const schema = yup.object({
    email: yup.string().email('Type must be email').required('Email is requied'),
    role: yup.string().nullable().default('user')
})


const forgot = () => {

    const [triggerForgot, { isLoading }] = useForgotPasswdMutation();

    const { control, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    })

    const router = useRouter();

    const onSubmit = async (data: forgotType) => {
        const result = await triggerForgot(data);

        if (result.data) {
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: result.data.message
            })
        }
    }

    return (
        <>
            <View style={styles.heading}>
                <Text style={styles.heading_text}>FORGOT!</Text>
            </View>
            <View style={styles.content}>

                <CommonInput<EmailProps>
                    control={control}
                    placeholder='Email'
                    type='email-address'
                    name='email'
                />

                <CommonButton text={'Submit'} isLoading={isLoading} onClick={handleSubmit(onSubmit)} />

                <View style={styles.navigation}>
                    <Link href={'/'} style={{ color: 'orange' }}>
                        <Text style={{ fontFamily: 'winkyRough' }}>Go back</Text>
                    </Link>
                </View>

            </View>
        </>
    )
}


const styles = StyleSheet.create({
    heading: {
        justifyContent: 'flex-start',
        width: '100%',
    },
    content: { backgroundColor: '#fff', padding: 10, paddingVertical: 30, borderRadius: 20, width: '100%' },
    heading_text: {
        color: '#fff',
        marginBottom: 10,
        fontSize: 29,
        fontFamily: 'winkyRough'
    },
    navigation: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
})

export default forgot