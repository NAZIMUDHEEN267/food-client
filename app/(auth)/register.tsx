import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import CommonInput from '@/components/CommonInput'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import CommonButton from '@/components/CommonButton'
import { Link, useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import { Image } from 'expo-image'
import CommonDateInput from '@/components/CommonDateInput'
import moment from 'moment'
import { Ionicons } from '@expo/vector-icons'
import { User } from '@/types/auth/user'


const schema = yup.object({
    username: yup.string().required('Username required'),
    password: yup.string().min(8, 'Minimum 8 character required in password').required('Password is required'),
    age: yup.date().required('Age is required').typeError('Type must be number'),
    role: yup.string().nullable(),
    email: yup.string().email('Type must be email').required('Email is required'),
    address: yup.string().required('Address is required'),
    pincode: yup.number().required('Pincode is required').typeError('Type must be number'),
    phonenumber: yup.number().required('Phonenumber is required').typeError('Type must be number'),
    profile_image: yup.string().nullable().default(null)
})


const login = () => {

    const [image, setImage] = useState<null | string>(null)

    const router = useRouter()

    const { control, handleSubmit, clearErrors, formState: { errors } } = useForm<User>({
        resolver: yupResolver(schema),
        defaultValues: {
            role: 'user'
        }
    })


    const launchImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }


    const onSubmit = (data: User) => {
        console.log({ ...data, profile_image: image, age: moment(data.age).format('YYYY/MM/DD') });
    }

    return (
        <>
            <Text style={{ textAlign: 'left', width: '100%', color: '#fff', marginBottom: 10, fontSize: 29, fontFamily: 'winkyRough' }}>REGISTER</Text>
            <View style={{ backgroundColor: '#fff', padding: 10, paddingVertical: 30, borderRadius: 20, marginBottom: 40, width: '100%' }}>

                <CommonInput<User>
                    control={control}
                    placeholder='Username'
                    name='username'
                />

                <CommonInput<User>
                    control={control}
                    placeholder='Email'
                    type='email-address'
                    name='email'
                />

                <CommonInput<User>
                    control={control}
                    placeholder='Mobile'
                    type='number-pad'
                    name='phonenumber'
                />

                <CommonInput<User>
                    control={control}
                    placeholder='Pincode'
                    type='number-pad'
                    name='pincode'
                />

                <CommonInput<User>
                    control={control}
                    placeholder='Address'
                    name='address'
                />

                <CommonInput<User>
                    control={control}
                    placeholder='Password'
                    name='password'
                />

                <CommonDateInput
                    control={control}
                    name='age'
                    maxDate={new Date()}
                />

                <CommonInput<User>
                    control={control}
                    placeholder='Image (optional)'
                    name='profile_image'
                    readonly
                    onClick={launchImage}
                />

                {image && <View style={{ backgroundColor: '#fac0a5', width: 150, marginTop: 8, marginBottom: 15, height: 120, padding: 6, borderRadius: 6 }}>
                    <Ionicons name='close-circle-sharp' size={23} style={{
                        position: 'absolute',
                        zIndex: 1,
                        color: '#000',
                        top: -6,
                        right: -10
                    }} onPress={() => setImage(null)} />

                    <Image
                        source={image}
                        style={{ width: '100%', height: '100%' }}
                        contentFit="contain"
                        transition={1000}
                    />
                </View>}

                <CommonButton text={'Sign up'} onClick={handleSubmit(onSubmit)} />

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                    <Text style={{ marginRight: 7, fontFamily: 'openSans' }}>Already have an account?</Text>
                    <Link href={'/'} style={{ color: 'orange' }}>
                        <Text style={{ marginRight: 7, fontFamily: 'winkyRough' }}>Sign in</Text>
                    </Link>
                </View>

            </View>
        </>
    )
}


const styles = StyleSheet.create({
    link: { alignSelf: 'flex-end', marginVertical: 10, fontWeight: '600', fontSize: 15 }
})

export default login