import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./FormSelection.styles";

export function FormSelectionScreen() {
  const navigation = useNavigation();

  const handleForm = (propertyType) => {
    navigation.navigate("CreatePublicationScreen", { propertyType });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleForm("Casa")}
      >
        <Text style={styles.buttonText}>Casa</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleForm("Departamento")}
      >
        <Text style={styles.buttonText}>Departamento</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleForm("Terreno")}
      >
        <Text style={styles.buttonText}>Terreno</Text>
      </TouchableOpacity>
    </View>
  );
}
