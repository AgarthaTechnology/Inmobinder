import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screen/PropertyBrokerage/HomeScreen";
import Casa from "./src/screen/PropertyBrokerage/AddProperty";
import DeleteP from "./src/screen/PropertyBrokerage/deleteP";
import CRUD from "./src/screen/PropertyBrokerage/property";
import UpdateProp from "./src/screen/PropertyBrokerage/updateProp";
import { Dimensions } from 'react-native';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

const Stack = createNativeStackNavigator();
const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const horizontalScale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CRUD" component={CRUD} />
        <Stack.Screen name="DeleteP" component={DeleteP} />
        <Stack.Screen name="UpdateProp" component={UpdateProp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// import 'react-native-gesture-handler';
// import react from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import Navigation  from './src/screen/AppNavigation/NavigationContainer';

// export default function App() {
//   return (
//     <Navigation/>
//   );
// }