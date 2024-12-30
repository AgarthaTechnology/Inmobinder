import React from "react";
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../utils/screenName";

export default function Loggin() {
  const navigation = useNavigation();

  const handleNavigation = (stackName, screenName) => {
    navigation.navigate(stackName, {
      screen: screenName,
    });
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../../../assets/img/fondologo.png")}
    >
      <View style={styles.container}>

        <TouchableOpacity
          style={styles.buton}
          onPress={() =>
            handleNavigation(screen.login.stack, screen.login.singin)
          } // Asegúrate de que el nombre de la ruta coincida
        >
          <Text style={styles.Text}>Iniciar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buton}
          onPress={() =>
            handleNavigation(screen.login.stack, screen.login.register)
          } // Asegúrate de que el nombre de la ruta coincida
        >
          <Text style={styles.Text}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 260,
    width: 260,
    marginBottom: 40,
  },
  buton: {
    borderRadius: 30,
    backgroundColor: "#FDFDFD",
    width: 180,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  Text: {
    fontWeight: "bold",
    fontSize: 22,
  },
});