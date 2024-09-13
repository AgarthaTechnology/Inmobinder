import React from "react";
import { View } from "react-native";
import { useRoute } from "@react-navigation/native";
import ViewPublication from "../../../components/NaturalPerson/ViewPublication/ViewPublication";
import { styles } from "./ViewPublicationScreen.styles";

export function ViewPublicationScreen() {
  const route = useRoute();
  const { publication } = route.params;

  return (
    <View style={styles.container}>
      <ViewPublication publication={publication} />
    </View>
  );
}
