import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DisplayPublicationScreen } from "../NaturalPerson/DisplayPublicationScreen";
import { ProfileStack } from "./ProfileStack";
import { createStackNavigator } from "@react-navigation/stack";

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

export function AppNavigation() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Perfil" component={ProfileStack} />
      <Drawer.Screen name="Mis Publicaciones" component={DisplayPublicationScreen} />
    </Drawer.Navigator>
  );
}