// AppNavigation.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreenWithMenu from "./MapScreenWithMenu";
import { PublicationStack } from "./PublicationStack";
import { ProfileStack } from "./ProfileStack"; // Importa ProfileStack
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
        name={screen.publication.stack} // Nombre correcto del stack
        component={PublicationStack} // Componente correcto para el stack
      />
      <Stack.Screen
        name={screen.profile.stack} // Nombre correcto del stack
        component={ProfileStack} // Componente correcto para el stack
      />
      <Stack.Screen
        name={screen.publication.publicationMap}
        component={MapPublication}
      />
    </Stack.Navigator>
  );
}
