import React from "react";
import { NavigationContainer } from '@react-navigation/native'

import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from './app/navigation/navigationTheme'
import { AuthProvider } from './app/api/AuthProvider';
import Routes from './app/api/Routes'


export default function App() {

  return (
    <AuthProvider>
      <Routes />
      {/* <NavigationContainer theme={navigationTheme}>
        <AuthNavigator />
      </NavigationContainer> */}
    </AuthProvider>
  );
}
