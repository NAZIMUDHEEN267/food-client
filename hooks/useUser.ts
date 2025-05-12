import AsyncStorage from '@react-native-async-storage/async-storage';
import { SignInResponse } from '@react-native-google-signin/google-signin';

const useUser =  () => {
    const setItem = async (user: SignInResponse) => await AsyncStorage.setItem('user', JSON.stringify(user));
    const getItem = async ():Promise<SignInResponse> => AsyncStorage.getItem('user')

    return { 
        setItem,
        getItem
    }
}

export default useUser