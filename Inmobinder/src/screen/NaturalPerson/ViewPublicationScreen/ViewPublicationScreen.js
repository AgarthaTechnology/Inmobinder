import React from "react";
import { ImageBackground ,View } from "react-native";
import { useRoute } from "@react-navigation/native";
import ViewPublication from "../../../components/NaturalPerson/ViewPublication/ViewPublication";
import { styles } from "./ViewPublicationScreen.styles";

export function ViewPublicationScreen() {
  const route = useRoute();
  const { publication } = route.params;

  return (
    <ImageBackground
      source={require("../../../images/fondo.png")}
      style={styles.container}
      >
    <View style={styles.publicationContainer}>
      <ViewPublication publication={publication} />
    </View>
    </ImageBackground>
  );
}
