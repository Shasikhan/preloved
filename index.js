import { registerRootComponent } from 'expo';
import { Platform } from 'react-native'

import App from './App';

// import PushNotification from "react-native-push-notification";

// PushNotification.configure({
//   onRegister: function (token) {
//     console.log("TOKEN:", token);
//   },

//   onNotification: function (notification) {
//     console.log("NOTIFICATION:", notification);
//   },

//   permissions: {
//     alert: true,
//     badge: true,
//     sound: true,
//   },

//   popInitialNotification: true,
//   requestPermissions: Platform.OS === 'ios',
// });

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
