// types.ts or anywhere in your app
import store from '@/redux/store';

type RootState = ReturnType<typeof store.getState>;

export default RootState;