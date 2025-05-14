import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import CommonInput from '@/components/common/CommonInput'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import CommonButton from '@/components/common/CommonButton'
import { Link, useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import { Image } from 'expo-image'
import CommonDateInput from '@/components/common/CommonDateInput'
import moment from 'moment'
import { Ionicons } from '@expo/vector-icons'
import { User } from '@/types/auth/user'
import { useSignUpUserMutation } from '@/redux/rtk/authQuery'
import Toast from 'react-native-toast-message'


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

    const [image, setImage] = useState<null | { uri: string, name: string, type: string }>(null)
    const [triggerSignUp, { data, isSuccess }] = useSignUpUserMutation();

    const router = useRouter()


    useEffect(() => {
        if (isSuccess) {
            Toast.show({
                type: 'success',
                text2: 'User successfully created'
            })
        }
    }, [isSuccess])

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
            const { uri, mimeType, fileName } = result.assets[0];

            setImage({ uri, type: mimeType, name: fileName });
        }
    }


    const onSubmit = (data: User) => {

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if(key == 'age') {
                formData.append(key, moment().diff(moment(data.age)) + '')
            } else if (key === 'profile_image') {
                formData.append(key, image)
            } else {
                formData.append(key, value)
            }
        })

        triggerSignUp(formData)
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
                    maxDate={moment({ year: moment().subtract(10, 'years').year(), month: 11, day: 31 }).toDate()}
                />

                <CommonInput<User>
                    control={control}
                    placeholder='Image (optional)'
                    name='profile_image'
                    readonly
                    onClick={image ? null : launchImage}
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
                        source={image?.uri}
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