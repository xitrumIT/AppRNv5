import React, {Component} from 'react';
import {Text} from 'react-native';
import AppContainer from './navigation/AppContainer';

//Redux
import allReducers from './reduces';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {PersistGate} from 'redux-persist/es/integration/react';
import {
  REHYDRATE,
  PURGE,
  persistCombineReducers,
  persistStore,
  persistReducer,
} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  //sẽ persist
  // whitelist: [
  //   'accountReducer'
  // ],
  //ko persist
  blacklist: [
    //'auth'
  ],
};
// let reducer = persistCombineReducers(config, allReducers)
const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = createStore(
  persistedReducer,
  compose(applyMiddleware(ReduxThunk)),
);
let persistor = persistStore(store);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}
