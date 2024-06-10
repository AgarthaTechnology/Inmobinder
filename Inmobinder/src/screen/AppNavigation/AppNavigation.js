import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import HomeScreen from "./HomeScreen";
import { CreatePublicationScreen } from "../NaturalPerson/CreatePublicationScreen/CreatePublicationScreen";
import Map from "../NaturalPerson/MapScreen/Map";
import { styles } from "../NaturalPerson/MapScreen/MapStyles";
import { View } from "react-native";
import MenuButton from "../NaturalPerson/MapScreen/Menu";
import { StatusBar } from "expo-status-bar";


const Drawer = createDrawerNavigator();

export function AppNavigation() {
  return (
    <View style={styles.map}>
      <Map/>
      <MenuButton/>
      <StatusBar style="auto"/>
    </View>
  );
}