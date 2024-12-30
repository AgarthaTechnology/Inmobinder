// ProfileScreen.js
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUserProfile } from "../../../components/NaturalPerson/Profile/useUserProfile";
import { screen } from "../../../utils/screenName";

const ProfileScreen = () => {
  const { data, isLoading, error } = useUserProfile();
  const navigation = useNavigation();

  const navigateToEditProfile = () => {
    navigation.navigate(screen.profile.editProfile);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error al obtener los datos del usuario
        </Text>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          No se encontraron datos del usuario
        </Text>
      </View>
    );
  }

  // Asumimos que data es un array y tomamos el primer elemento
  const user = data[0];

  // Debugging: Verificar el valor de user.image
  console.log('user.image:', user.image);

  return (
    <ImageBackground
      source={require("../../../images/fondo.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>

        {/* Cargar la imagen de perfil desde la URL del usuario o usar la predeterminada */}
        <Image
          source={
            user.image && user.image.trim() !== ""
              ? { uri: user.image }
              : require("../../../../assets/images/perfil.png")
          }
          style={styles.profileImage}
          onError={() => console.log("Error al cargar la imagen de perfil")}
        />

        <View style={styles.infoContainer}>
          <Text style={styles.text}>Nombres: {user.nombre}</Text>
          <Text style={styles.text}>Apellidos: {user.apellido}</Text>
          <Text style={styles.text}>RUT: {user.rut}</Text>
          <Text style={styles.text}>Teléfono: {user.telefono}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={navigateToEditProfile}>
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#fff",
    width: 328,
    padding: 20,
    borderRadius: 20,
    // Ajuste de altura para adaptarse al contenido dinámico
    minHeight: 500,
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
    backgroundColor: "#ccc", // Color de fondo mientras se carga la imagen
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: "#009245",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginVertical: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
  infoContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
});

export default ProfileScreen;
