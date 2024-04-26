import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigation } from "./src/screen/Navigation/AppNavigation"
import "react-native-get-random-values";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}