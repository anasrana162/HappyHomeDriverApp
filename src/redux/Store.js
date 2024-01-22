import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import settingReducer from './settingSlice';
import authReducer from './authSlice';
import languageReducer from './languageSlice';
import lastLocReducer from './lastLocSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const createPersistedReducer = reducer =>
  persistReducer(persistConfig, reducer);

export default () => {
  const reducers = {
    setting: createPersistedReducer(settingReducer),
    auth: createPersistedReducer(authReducer),
    language: createPersistedReducer(languageReducer),
    lastLoc: createPersistedReducer(lastLocReducer),
  };

  const store = configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
  });

  const persistor = persistStore(store);

  return { store, persistor };
};
