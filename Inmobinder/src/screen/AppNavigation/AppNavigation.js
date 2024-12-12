// AppNavigation.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreenWithMenu from "./MapScreenWithMenu";
import { PublicationStack } from "./PublicationStack";
import { ProfileStack } from "./ProfileStack"; 
import { screen } from "../../utils/screenName";
import { MapPublication } from "../../screen/NaturalPerson/MapScreen/MapPublication";

const Stack = createNativeStackNavigator();

export function AppNavigation() {
  return (
    <Stack.Navigator initialRouteName={screen.map} screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={screen.map}
        component={MapScreenWithMenu}
      />
      <Stack.Screen
        name={screen.publication.stack} 
        component={PublicationStack} 
      />
      <Stack.Screen
        name={screen.profile.stack} 
        component={ProfileStack} 
      />
      <Stack.Screen
        name={screen.publication.publicationMap}
        component={MapPublication}
      />
    </Stack.Navigator>
  );
}
