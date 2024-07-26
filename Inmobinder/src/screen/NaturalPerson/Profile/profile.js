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
import image from "../../../../assets/images/perfil.png";
import { screenName } from "../../../utils/screenName";

const ProfileScreen = () => {
  const { data, error } = useUserProfile();
  const navigation = useNavigation();

  const navigateToEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  if (error) {
    return <Text>Error al obtener los datos del usuario</Text>;
  }

  return (
    <ImageBackground
      source={require("../../../images/fondo.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>
        <Image source={image} style={styles.profileImage} />
        {data.length === 0 ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          data.map((doc) => (
            <View key={doc.id}>
              <Text style={styles.text}>Nombres: {doc.nombres}</Text>
              <Text style={styles.text}>Apellidos: {doc.apellidos}</Text>
              <Text style={styles.text}>RUT: {doc.rut}</Text>
              <Text style={styles.text}>Teléfono: {doc.telefono}</Text>
            </View>
          ))
        )}
        <TouchableOpacity
          title="Editar perfil"
          style={styles.button}
          onPress={navigateToEditProfile}
        >
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
  },
  button: {
    width: 250,
    height: 50,
    backgroundColor: "#009245",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginVertical: 10,
    top: 50,
  },
  container: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#fff",
    width: 328,
    height: 500,
    borderRadius: 20,
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
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
