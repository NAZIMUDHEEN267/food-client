import Reactotron from 'reactotron-react-native';
import { NetworkInfo } from 'react-native-network-info';


NetworkInfo.getIPV4Address().then((ip) => {
    Reactotron
        .configure({ name: 'React Native Demo', host: ip })
        .useReactNative()
        .connect();
});


export default Reactotron;