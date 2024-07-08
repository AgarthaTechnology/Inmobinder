import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreenWithMenu from "./MapScreenWithMenu";
import { PublicationStack } from "./PublicationStack";
import { MapPublication } from "../NaturalPerson/MapScreen/MapPublication";

const Stack = createNativeStackNavigator();

export function AppNavigation() {
  return (
    <Stack.Navigator initialRouteName="Map">
      <Stack.Screen
        name="Map"
        component={MapScreenWithMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FormSelectionScreen"
        component={PublicationStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MapPublication"
        component={MapPublication}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
