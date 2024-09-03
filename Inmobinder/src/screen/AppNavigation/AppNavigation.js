import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreenWithMenu from "./MapScreenWithMenu";
import { screens } from "../../utils/screenName";
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
    <Stack.Navigator initialRouteName={screens.map} screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={screens.map}
        component={MapScreenWithMenu}
      />
      <Stack.Screen
        name={screens.publications}
        component={DisplayPublicationScreen}
      />
      <Stack.Screen
        name={screens.formSelection}
        component={FormSelectionScreen}
      />
      <Stack.Screen
        name={screens.createPublication}
        component={CreatePublicationScreen}
      />
      <Stack.Screen
        name={screens.publicationMap}
        component={MapPublication}
      />
      <Stack.Screen
        name={screens.profile}
        component={ProfileScreen}
      />
      <Stack.Screen
        name={screens.editProfile}
        component={EditProfileScreen}
      />
      <Stack.Screen
        name={screens.changePassword}
        component={ChangePasswordScreen}
      />
    </Stack.Navigator>
  );
}
