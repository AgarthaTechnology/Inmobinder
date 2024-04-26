import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import { CreatePublicationScreen } from "../NaturalPerson/CreatePublicationScreen/CreatePublicationScreen";

const Drawer = createDrawerNavigator();

export function AppNavigation() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen 
        name="Añadir Propiedad" 
        component={CreatePublicationScreen} 
        options={{ title: 'Agregar Propiedad' }}
      />
    </Drawer.Navigator>
  );
}