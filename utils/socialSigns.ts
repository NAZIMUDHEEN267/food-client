
import { tokenType } from '@/types/auth/query';
import { User } from '@/types/auth/user';
import auth, { FacebookAuthProvider, GoogleAuthProvider } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

import Toast from 'react-native-toast-message';



GoogleSignin.configure({
    webClientId: '410958891712-g49d5pljvnac5bpi9to6t1u1avpjcu0s.apps.googleusercontent.com',
});

export async function onGoogleButtonPress(apiCall: (args: tokenType) => Promise<User>) {
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const signInResult = await GoogleSignin.signIn();

        let idToken = signInResult.data?.idToken;

        if (!idToken) {
            throw new Error('Sign in failed');
        }

        const googleCredential = GoogleAuthProvider.credential(idToken);
        const userCredential = await auth().signInWithCredential(googleCredential)

        const firebaseIdToken = await userCredential.user.getIdToken();

        apiCall({ token: firebaseIdToken })

    } catch (error: any) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error?.message || error,
        });

        console.log(error);

    }
}


export async function onFacebookButtonPress(apiCall: (args: tokenType) => Promise<User>) {

    try {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccessToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        const facebookCredential = FacebookAuthProvider.credential(data.accessToken);
        const userCredential = await auth().signInWithCredential(facebookCredential);
        const idToken = await userCredential.user.getIdToken();


        apiCall({ token: idToken })
    } catch (error: any) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: error?.message || error,
        });

        console.log(error);

    }
}

