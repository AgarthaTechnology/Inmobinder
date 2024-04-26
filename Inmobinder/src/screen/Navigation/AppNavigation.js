import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import {CreatePublicationScreen} from "../NaturalPerson/CreatePublicationScreen/";
import {DisplayPublicationScreen} from "../NaturalPerson/DisplayPublicationScreen/";

const Drawer = createDrawerNavigator();

export function AppNavigation() {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="CreatePublication" component={CreatePublicationScreen} />
            <Drawer.Screen name="DisplayPublication" component={DisplayPublicationScreen} />
        </Drawer.Navigator>
    );
}
