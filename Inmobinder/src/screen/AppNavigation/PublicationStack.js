import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DisplayPublicationScreen } from "../../screen/NaturalPerson/DisplayPublicationScreen/DisplayPublicationScreen";
import { MapPublication } from "../../screen/NaturalPerson/MapScreen/MapPublication";
import { screen } from "../../utils/screenName";
import { ViewPublicationScreen } from "../../screen/NaturalPerson/ViewPublicationScreen/ViewPublicationScreen";
import { EditPublicationScreen } from "../../screen/NaturalPerson/EditPublicationScreen/EditPublicationScreen";
import { CreatePublicationScreen } from "../../screen/NaturalPerson/CreatePublicationScreen/CreatePublicationScreen";
import { DisplayPublicationFilter } from "../NaturalPerson/DisplayPublicationFilter/DisplayPublicationFilter";

const Stack = createNativeStackNavigator();

export function PublicationStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={screen.publication.publications}
        component={DisplayPublicationScreen}
      />
      <Stack.Screen
        name={screen.publication.publicationMap}
        component={MapPublication}
      />
      <Stack.Screen
        name={screen.publication.view}
        component={ViewPublicationScreen}
      />
      <Stack.Screen
        name={screen.publication.edit}
        component={EditPublicationScreen}
      />
      <Stack.Screen
        name={screen.publication.create}
        component={CreatePublicationScreen}
      />
      <Stack.Screen
        name={screen.publication.publicationsfilter}
        component={DisplayPublicationFilter}
      />
    </Stack.Navigator>
  );
}
