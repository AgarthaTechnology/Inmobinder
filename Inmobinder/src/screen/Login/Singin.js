import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../utils/screenName";

export default function Singin() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const db = getFirestore();

  const handleNavigation = (stackName, screenName) => {
    navigation.navigate(stackName, {
      screen: screenName,
    });
  };

  const handleLogin = async () => {
    if (!correo || !contraseña) {
      Alert.alert("Error", "Por favor, complete todos los campos.");
      return;
    }

    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        correo,
        contraseña
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        Alert.alert(
          "Correo no verificado",
          "Por favor, verifica tu correo antes de iniciar sesión."
        );
        return;
      }

      const uid = user.uid;

      // Consultar Firestore para determinar el tipo de usuario
      const usersQuery = query(
        collection(db, "users"),
        where("uid", "==", uid)
      );
      const inmobiliariaQuery = query(
        collection(db, "inmobiliaria"),
        where("uid", "==", uid)
      );
      const corredorQuery = query(
        collection(db, "corredor"),
        where("uid", "==", uid)
      );
      const agenciacorretajeQuery = query(
        collection(db, "agenciacorretaje"),
        where("uid", "==", uid)
      );

      const [
        usersSnapshot,
        inmobiliariaSnapshot,
        corredorSnapshot,
        agenciacorretajeSnapshot,
      ] = await Promise.all([
        getDocs(usersQuery),
        getDocs(inmobiliariaQuery),
        getDocs(corredorQuery),
        getDocs(agenciacorretajeQuery),
      ]);

      if (!usersSnapshot.empty) {
        Alert.alert("Éxito", "Bienvenido persona natural.");
        handleNavigation(screen.map);
      } else if (!inmobiliariaSnapshot.empty) {
        Alert.alert("Éxito", "Bienvenido inmobiliaria.");
        handleNavigation(screen.map);
      } else if (!corredorSnapshot.empty) {
        Alert.alert("Éxito", "Bienvenido corredor.");
        handleNavigation(screen.map);
      } else if (!agenciacorretajeSnapshot.empty) {
        Alert.alert("Éxito", "Bienvenido agencia de corretaje.");
        handleNavigation(screen.map);
      } else {
        Alert.alert("Error", "No se encontró información del usuario.");
      }
    } catch (error) {
      const errorMessage =
        error.code === "auth/wrong-password"
          ? "Contraseña incorrecta. Intente nuevamente."
          : error.code === "auth/user-not-found"
          ? "No existe una cuenta con este correo."
          : "Error al iniciar sesión. Intente nuevamente.";
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.background}
        source={require("../../images/fondo.png")}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={styles.containerAvoiding}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <View style={styles.container}>
                <Text style={styles.title}>Ingresar</Text>

                <TextInput
                  style={styles.inputtext}
                  placeholder="Ingrese su correo"
                  value={correo}
                  onChangeText={setCorreo}
                />

                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Ingrese su contraseña"
                    secureTextEntry={!showPassword}
                    value={contraseña}
                    onChangeText={setContraseña}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}
                  >
                    <Icon
                      name={showPassword ? "eye" : "eye-off"}
                      size={24}
                      color="#000000"
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.buton} onPress={handleLogin}>
                  <Text style={styles.buttonText}>Ingresar</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  containerAvoiding: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
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
    width: "90%",
  },
  inputtext: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#FFFFFF",
    width: "90%",
    alignSelf: "center",
    marginTop: 5,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#25272B",
    textAlign: "center",
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    width: "90%",
    alignSelf: "center",
    marginTop: 5,
  },
  eyeButton: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  buton: {
    borderRadius: 50,
    backgroundColor: "#009245",
    width: 126,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});