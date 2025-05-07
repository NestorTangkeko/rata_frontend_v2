import { configureStore,combineReducers} from "@reduxjs/toolkit";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//reducers
import {apiSlice,errorHandler} from './api.slice';
import authSlice from './auth.slice';
import geoSlice from './geo.slice';
import tariffSlice from './tariff.slice';
import transmittalSice from './transmittal.slice';
import jvCreationSlice from './jvCreation.slice';
import jvReversalSlice from './jvReversal.slice';

const reducers = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    geography: geoSlice,
    tariff: tariffSlice,
    transmittal: transmittalSice,
    jvCreation: jvCreationSlice,
    jvReversal: jvReversalSlice,
    auth:persistReducer({
        key:'auth',
        storage
    },authSlice)
})

export const store = configureStore({
    reducer:reducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck :{
            ignoreActions:[apiSlice.reducer,FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    })
    .concat(apiSlice.middleware,errorHandler),
    devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)