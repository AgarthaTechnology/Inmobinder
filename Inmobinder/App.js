import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppNavigation } from "./src/screen/AppNavigation/AppNavigation.js";
import "react-native-get-random-values";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}
