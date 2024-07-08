import React from "react";
import { View } from "react-native";
import MenuButton from "../NaturalPerson/MapScreen/Menu";
import Map from "../NaturalPerson/MapScreen/Map";
import { StatusBar } from "expo-status-bar";
import { styles } from "../NaturalPerson/MapScreen/MapStyles";

const MapScreenWithMenu = () => (
  <View style={styles.map}>
    <Map />
    <MenuButton />
    <StatusBar style="auto" />
  </View>
);

export default MapScreenWithMenu;
