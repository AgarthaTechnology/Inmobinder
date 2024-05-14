import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import HomeScreen from "./HomeScreen";
import { CreatePublicationScreen } from "../NaturalPerson/CreatePublicationScreen/CreatePublicationScreen";
import Map from "../NaturalPerson/MapScreen/Map";

const Drawer = createDrawerNavigator();

export function AppNavigation() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="INMOBINDER" component={Map} />
      <Drawer.Screen name="Añadir propiedad" component={CreatePublicationScreen} />
    </Drawer.Navigator>
  );
}