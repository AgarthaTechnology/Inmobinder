import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreenWithMenu from "./MapScreenWithMenu";
import { screen } from "../../utils/screenName";
import ProfileScreen from "../../screen/NaturalPerson/Profile/profile";
import EditProfileScreen from "../../screen/NaturalPerson/Profile/editProfile";
import ChangePasswordScreen from "../../screen/NaturalPerson/Profile/changePassword";
import { CreatePublicationScreen } from "../../screen/NaturalPerson/CreatePublicationScreen/CreatePublicationScreen";
import { FormSelectionScreen } from "../../screen/NaturalPerson/CreatePublicationScreen/FormSelectionScreen";
import { DisplayPublicationScreen } from "../../screen/NaturalPerson/DisplayPublicationScreen/DisplayPublicationScreen";
import { MapPublication } from "../../screen/NaturalPerson/MapScreen/MapPublication";

const Stack = createNativeStackNavigator();

export function AppNavigation() {
  return (
    <Stack.Navigator initialRouteName={screen.map} screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={screen.map}
        component={MapScreenWithMenu}
      />
      <Stack.Screen
        name={screen.publications}
        component={DisplayPublicationScreen}
      />
      <Stack.Screen
        name={screen.formSelection}
        component={FormSelectionScreen}
      />
      <Stack.Screen
        name={screen.createPublication}
        component={CreatePublicationScreen}
      />
      <Stack.Screen
        name={screen.publicationMap}
        component={MapPublication}
      />
      <Stack.Screen
        name={screen.profile}
        component={ProfileScreen}
      />
      <Stack.Screen
        name={screen.editProfile}
        component={EditProfileScreen}
      />
      <Stack.Screen
        name={screen.changePassword}
        component={ChangePasswordScreen}
      />
    </Stack.Navigator>
  );
}
