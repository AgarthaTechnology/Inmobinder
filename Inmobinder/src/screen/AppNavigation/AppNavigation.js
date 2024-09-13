// AppNavigation.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreenWithMenu from "./MapScreenWithMenu";
import { PublicationStack } from "./PublicationStack";
import { ProfileStack } from "./ProfileStack"; 
import { screen } from "../../utils/screenName";
import { MapPublication } from "../../screen/NaturalPerson/MapScreen/MapPublication";

import { ViewPublicationScreen } from "../../screen/NaturalPerson/ViewPublicationScreen/ViewPublicationScreen";
import EditPublicationScreen  from "../../screen/NaturalPerson/EditPublicationScreen/EditPublicationScreen";

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
    <Stack.Screen
      name="ViewPublication"
      component={ViewPublicationScreen}
    />
    <Stack.Screen
      name="EditPublication"
      component={EditPublicationScreen}
    />
    </Stack.Navigator>
  );
}
