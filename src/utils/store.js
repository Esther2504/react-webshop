import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartReducer'
import loginReducer from './loginReducer'
import searchReducer from './searchReducer'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  cart: cartReducer,
  login: loginReducer,
  search: searchReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['search'],
};


const persistedReducer = persistReducer(persistConfig, reducers);


const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});


export default store