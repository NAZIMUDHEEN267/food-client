import { isAction, Middleware } from '@reduxjs/toolkit';
import { router } from 'expo-router';

const guestMiddleware: Middleware = storeAPI => next => action => {
    if (isAction(action) && action.type === 'auth/addType') {
        router.push('/(protected)/home')
    }
    const result = next(action);
    return result;
};

export default guestMiddleware;
