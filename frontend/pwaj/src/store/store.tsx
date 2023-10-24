// store/store.tsx
import { combineReducers,configureStore } from '@reduxjs/toolkit';
import counterReducer from './slice/counterSlice';
import stringReducer from './slice/stringSlice';
import listReducer from './slice/listSlice';

const rootReducer = combineReducers({
    counter: counterReducer,
    string: stringReducer,
    list: listReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
