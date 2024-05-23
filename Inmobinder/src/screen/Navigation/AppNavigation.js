import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import {DisplayPublicationScreen} from "../NaturalPerson/DisplayPublicationScreen/";

const Drawer = createDrawerNavigator();

export function AppNavigation() {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Mis Publicaciones" component={DisplayPublicationScreen} />
        </Drawer.Navigator>
    );
}
