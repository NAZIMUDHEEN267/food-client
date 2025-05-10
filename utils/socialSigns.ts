
import { getAuth, FacebookAuthProvider, signInWithCredential } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

import Toast from 'react-native-toast-message';



GoogleSignin.configure({
    webClientId: '410958891712-g49d5pljvnac5bpi9to6t1u1avpjcu0s.apps.googleusercontent.com',
});

export async function onGoogleButtonPress() {
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const signInResult = await GoogleSignin.signIn();

        let idToken = signInResult.data?.idToken;
        if (!idToken) {
            idToken = signInResult?.idToken;
        }


        if (!idToken) {
            throw new Error('Sign in failed');
        }

        // const googleCredential = GoogleAuthProvider.credential(idToken);

        // const wo = await signInWithCredential(getAuth(), googleCredential);

        // console.log({ wo: wo.user });
        fetch('http://192.168.193.107:5000/api/auth/verify-token', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: idToken })
        })

    } catch (error: any) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error?.message || error,
        });

        console.log(error);
        
    }
}


export async function onFacebookButtonPress() {
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccessToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }


//   fetch('http://192.168.193.107:5000/api/auth/verify-token', {
//     method: 'post',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ token: data.accessToken })
// }).then(res => res.json())
// .then(res => console.log(res))
  
  // Create a Firebase credential with the AccessToken
  const facebookCredential = FacebookAuthProvider.credential(data.accessToken);

  // Sign-in the user with the credential
  signInWithCredential(getAuth(), facebookCredential).then(r => console.log({ r }));
}

