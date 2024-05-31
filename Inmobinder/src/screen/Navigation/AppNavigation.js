import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { PublicationStack } from "./PublicationStack";

const Drawer = createDrawerNavigator();

export function AppNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Drawer.Screen name="Crear Publicacion" component={PublicationStack} />
    </Drawer.Navigator>
  );
}
