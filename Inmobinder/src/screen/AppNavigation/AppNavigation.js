import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreenWithMenu from "./MapScreenWithMenu";
import { PublicationStack } from "./PublicationStack";
import { ProfileStack } from "./ProfileStack";
import { screenName } from "../../utils/screenName";

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
        name={screenName.profile.stack}
        component={ProfileStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screenName.publication.stack}
        component={PublicationStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
