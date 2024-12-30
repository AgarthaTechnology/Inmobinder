import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../utils/screenName";

const Register = () => {
  const navigation = useNavigation();

  const handleNavigation = (stackName, screenName) => {
    navigation.navigate(stackName, {
      screen: screenName,
    });
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../../../assets/img/fondo.png")}
    >
      <View style={styles.container}>
        <Text style={styles.title}> Elije tu perfil:</Text>

        <TouchableOpacity
          style={styles.buton}
          onPress={() =>
            handleNavigation(screen.login.stack, screen.login.form_np)
          }
        >
          <Text style={styles.Text}>Persona natural</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buton}
          onPress={() =>
            handleNavigation(screen.login.stack, screen.login.form_Inmo)
          }
        >
          <Text style={styles.Text}>Inmobilaria</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buton}
          onPress={() =>
            handleNavigation(screen.login.stack, screen.login.form_co)
          }
        >
          <Text style={styles.Text}>Corredor</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buton}
          onPress={() => handleNavigation(screen.login.stack, screen.login.form_ac)}
        >
          <Text style={styles.Text}>Ag. de Corretaje</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <Text style={styles.transparentText}>¿Ya tienes cuenta?</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            handleNavigation(screen.login.stack, screen.login.singin)
          }
        >
          <Text style={styles.texto3}>Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

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
    padding: "6%",
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Sombra
    width: "80%",
    alignSelf: "center",
    marginVertical: 150, // Añadir margen vertical para controlar la altura
  },
  buton: {
    borderRadius: 30,
    backgroundColor: "#009245",
    width: 200,
    height: 47,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  Text: {
    color: "#F8F8FF",
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 28, // Tamaño de la fuente
    fontWeight: "bold", // Peso de la fuente
    color: "#25272B", // Color del texto
    textAlign: "center", // Alineación del texto
    margin: 5, // Margen vertical
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  transparentText: {
    color: "rgba(0, 0, 0, 0.5)", // Texto transparente
    fontSize: 16,
  },
  texto3: {
    marginTop: 10, // Añadir margen superior para separar del texto anterior
    color: "#009245",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Register;