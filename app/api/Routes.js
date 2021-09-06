import React, {useContext, useState, useEffect} from "react";
import { NavigationContainer } from '@react-navigation/native'
import auth from '@react-native-firebase/auth';

import AppNavigator from "../navigation/AppNavigator";
import AuthNavigator from "../navigation/AuthNavigator";
import navigationTheme from '../navigation/navigationTheme'
import { AuthContext } from '../api/AuthProvider';



const Routes2 = () => {
    const {user, setUser} = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);
  
    const onAuthStateChanged = (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    };
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
  
    if (initializing) return null;
  
  return (
      <NavigationContainer theme={navigationTheme}>
        { user ? <AppNavigator /> : <AuthNavigator /> }
      </NavigationContainer>
  );
}

export default Routes2;
