import React from 'react';
import { Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";

const Stack = createStackNavigator();

function LogoTitle() {
    return (
      <>
      </>
    );
  }

const FeedNavigator = () => (
    <Stack.Navigator mode='card' >
        <Stack.Screen name='Listings' component={ListingsScreen} 
        options={({ navigation, route }) => ({
            headerRight: (props) => <LogoTitle {...props} />,
          })} 
          />
        <Stack.Screen name='ListingDetails' component={ListingDetailsScreen} />
    </Stack.Navigator>
)


export default FeedNavigator;