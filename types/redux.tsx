// types.ts or anywhere in your app
import store from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppState = useSelector.withTypes<RootState>();
