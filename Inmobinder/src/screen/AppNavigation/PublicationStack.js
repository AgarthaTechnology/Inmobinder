import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreatePublicationScreen } from "../../screen/NaturalPerson/CreatePublicationScreen/CreatePublicationScreen";
import { FormSelectionScreen } from "../../screen/NaturalPerson/CreatePublicationScreen/FormSelectionScreen";
import { DisplayPublicationScreen } from "../../screen/NaturalPerson/DisplayPublicationScreen/DisplayPublicationScreen";
import { MapPublication } from "../../screen/NaturalPerson/MapScreen/MapPublication";
import { screen } from "../../utils/screenName";

const Stack = createNativeStackNavigator();

export function PublicationStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={screen.publication.publications}
        component={DisplayPublicationScreen}
      />
      <Stack.Screen
        name={screen.publication.form}
        component={FormSelectionScreen}
      />
      <Stack.Screen
        name={screen.publication.create}
        component={CreatePublicationScreen}
      />
      <Stack.Screen
        name={screen.publication.publicationMap}
        component={MapPublication}
      />
    </Stack.Navigator>
  );
}
