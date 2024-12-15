import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreenWithMenu from "./MapScreenWithMenu";
import { PublicationStack } from "./PublicationStack";
import { ProfileStack } from "./ProfileStack";
import { screen } from "../../utils/screenName";
import { MapPublication } from "../../screen/NaturalPerson/MapScreen/MapPublication";
import { LoginStack } from "./LoginStack";

export function AppNavigation() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={screen.login.stack}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={screen.login.stack} component={LoginStack} />
      <Stack.Screen name={screen.map} component={MapScreenWithMenu} />
      <Stack.Screen
        name={screen.publication.stack}
        component={PublicationStack}
      />
      <Stack.Screen name={screen.profile.stack} component={ProfileStack} />
      <Stack.Screen
        name={screen.publication.publicationMap}
        component={MapPublication}
      />
    </Stack.Navigator>
  );
}
