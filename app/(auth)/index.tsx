import { View, Text, StyleSheet, TextInput, Button, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import CommonInput from '@/components/CommonInput'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import CommonButton from '@/components/CommonButton'
import { Link, useRouter } from 'expo-router'
import { Image } from 'expo-image'
import { onFacebookButtonPress, onGoogleButtonPress } from '@/utils/socialSigns'
import { useSignInUserMutation } from '@/redux/rtk/authQuery'
import { signInType } from '@/types/auth/query';
import Toast from 'react-native-toast-message'
import { useDispatch } from 'react-redux'
import { addUser } from '@/redux/slices/authSlice'
import useUser from '@/hooks/useUser'



const schema = yup.object({
  email: yup.string().email('Type must be email').required('Email is requied'),
  password: yup.string().required('Password is required'),
  user: yup.string().nullable()
})

const login = () => {

  const [signIn, { isLoading, data }] = useSignInUserMutation()
  const dispatch = useDispatch();
  const { setItem } = useUser()

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      role: 'user'
    }
  });

  useEffect(() => {
    if (data) {
      Toast.show({
        type: 'success',
        text2: 'Login successfull.'
      })

      setItem(data)
        .then(() => {
          dispatch(addUser(data))
          router.replace('/(protected)/home')
        })
    }
  }, [data])


  const router = useRouter();

  return (
    <React.Fragment>
      <View style={styles.heading}>
        <Text style={styles.heading_text}>WELCOME!</Text>
      </View>
      <View style={styles.content}>
        <CommonInput<signInType>
          control={control}
          placeholder='Email'
          type='email-address'
          name='email'
        />

        <CommonInput<signInType>
          control={control}
          placeholder='Password'
          type='password'
          name='password'
        />

        <Link href={'/forgot'} style={styles.link}>
          <Text style={{ fontFamily: 'winkyRough' }}>Forgot password?</Text>
        </Link>

        <CommonButton text={'Login'} onClick={handleSubmit(signIn)} />

        <View style={styles.navigation}>
          <Text style={{ marginRight: 7, fontFamily: 'openSans' }}>Don't have any account yet?</Text>
          <Link href={'/register'} style={{ color: 'orange' }}>
            <Text style={{ fontFamily: 'winkyRough' }}>Sign up</Text>
          </Link>
        </View>


        <View style={{ gap: 10, marginTop: 20 }}>
          <TouchableOpacity onPress={onGoogleButtonPress} style={{ flexDirection: 'row', borderWidth: 1, justifyContent: 'center', gap: 20, paddingVertical: 7, borderRadius: 10, alignItems: 'center' }}>
            <Image
              source={require('@/assets/images/icons/google.png')}
              style={{ height: 34, width: 34 }}
            />

            <Text>Login with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))} style={{ flexDirection: 'row', backgroundColor: '#325f8f', borderWidth: 1, justifyContent: 'center', gap: 10, paddingVertical: 7, borderRadius: 10, alignItems: 'center' }}>
            <Image
              source={require('@/assets/images/icons/facebook.png')}
              style={{ height: 24, width: 24, objectFit: 'contain' }}
            />

            <Text style={{ color: '#fff', fontWeight: '700' }}>Login with Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </React.Fragment>
  )
}


const styles = StyleSheet.create({
  heading: {
    justifyContent: 'flex-start',
    width: '100%',
  },
  content: {
    backgroundColor: '#fff',
    padding: 10,
    paddingVertical: 30,
    borderRadius: 20,
    width: '100%'
  },
  heading_text: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 29,
    fontFamily: 'winkyRough'
  },
  navigation: { flexDirection: 'row', justifyContent: 'center', marginVertical: 10 },
  link: { alignSelf: 'flex-end', marginVertical: 10, fontWeight: '600', fontSize: 15 }
})

export default login