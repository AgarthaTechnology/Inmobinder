import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreatePublicationScreen } from "../../screen/NaturalPerson/CreatePublicationScreen/CreatePublicationScreen";
import { FormSelectionScreen } from "../../screen/NaturalPerson/CreatePublicationScreen/FormSelectionScreen";
import { DisplayPublicationScreen } from "../../screen/NaturalPerson/DisplayPublicationScreen/DisplayPublicationScreen";
import { MapPublication } from "../../screen/NaturalPerson/MapScreen/MapPublication";
import { screenName } from "../../utils/screenName";

const Stack = createNativeStackNavigator();

export function PublicationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screenName.publication.publications}
        component={DisplayPublicationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screenName.publication.form}
        component={FormSelectionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screenName.publication.create}
        component={CreatePublicationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={screenName.publication.publicationMap}
        component={MapPublication}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
