import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import MainNavigator from './src/routes/MainNavigation';
import userReducer from './src/store/Users/userReducer';
import projectReducer from './src/store/Projects/projectReducer';

// Armazena os estados na store
const store = createStore(
  combineReducers({ userLogin: userReducer, userProjects: projectReducer })
);

function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#F7F7F7" />
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    </>
  );
}

export default App;
