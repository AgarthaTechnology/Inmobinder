import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { auth } from "../../../utils/firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

export default function ChangePasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Error", "No se encontró el usuario. Por favor, inicia sesión.");
      return;
    }

    const cred = EmailAuthProvider.credential(user.email, currentPassword);

    try {
      await reauthenticateWithCredential(user, cred);
      await updatePassword(user, newPassword);
      Alert.alert("Éxito", "Contraseña cambiada con éxito");
      navigation.goBack();
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        Alert.alert("Error", "La contraseña actual es incorrecta");
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <ImageBackground
      source={require("../../../images/fondo.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Cambiar Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña actual"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña nueva"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Confirmar cambios</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#fff",
    width: 328,
    height: 400,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: "#009245",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginVertical: 10,
    alignSelf: "center",
    top: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
