import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons"; 

import routes from './routes'
import FeedNavigator from "./FeedNavigator";
import ListingEditScreen from "../screens/ListingEditScreen";
import AccountNavigator from './AccountNavigator';
import NewListingButton from './NewListingButton'

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
    <Tab.Navigator
        tabBarOptions ={{
            keyboardHidesTabBar: true,
        }}
    >
        <Tab.Screen
            name='Feeds'
            component={FeedNavigator}
            options={{
                tabBarIcon: ({ color, size }) => 
                    <MaterialCommunityIcons name='home' color={color} size={size} />
            }}
        />
        <Tab.Screen 
            name='ListingEdit' 
            component={ListingEditScreen} 
            options={({ navigation }) => ({
                
                tabBarButton: () => 
                    <NewListingButton
                        onPress={() => navigation.navigate(routes.LISTING_EDIT)}
                    />,
                tabBarIcon: ({ color, size }) => 
                    <MaterialCommunityIcons name='plus-circle' color={color} size={size} />
            })}
        />
        <Tab.Screen 
            name='Account' 
            component={AccountNavigator}
            options={{
                tabBarIcon: ({ color, size }) => 
                    <MaterialCommunityIcons name='account' color={color} size={size} />
            }}
        />
    </Tab.Navigator>
)


export default AppNavigator;