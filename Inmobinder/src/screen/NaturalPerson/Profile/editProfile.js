import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUserProfile } from "../../../components/NaturalPerson/Profile/useUserProfile";
import { useLoadUserProfile } from "../../../components/NaturalPerson/Profile/loadUserProfile";
import { pickProfileImage } from "../../../components/NaturalPerson/Profile/profileImagePicker";
import { updateUserProfile } from "../../../components/NaturalPerson/Profile/updateUserProfile";
import { screen } from "../../../utils/screenName";

export default function EditProfileScreen() {
  const {
    image,
    setImage,
    nombres,
    setNombres,
    apellidos,
    setApellidos,
    rut,
    setRut,
    telefono,
    setTelefono,
  } = useUserProfile();

  const navigation = useNavigation();

  useLoadUserProfile(setNombres, setApellidos, setRut, setTelefono);

  const handleUpdate = async () => {
    const updated = await updateUserProfile(nombres, apellidos, rut, telefono);
    if (updated) {
      alert("Los datos fueron actualizados correctamente");
      navigation.goBack();
    } else {
      alert("Error al actualizar los datos");
    }
  };

  const navigateToChangePassword = () => {
    navigation.navigate(screen.profile.changePass);
  };

  return (
    <ImageBackground
      source={require("../../../images/fondo.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.image}
          onPress={() => pickProfileImage(setImage)}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <Text>Elegir Imagen</Text>
          )}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Nombres"
          value={nombres}
          onChangeText={setNombres}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellidos"
          value={apellidos}
          onChangeText={setApellidos}
        />
        <TextInput
          style={styles.input}
          placeholder="RUT"
          value={rut}
          onChangeText={setRut}
        />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={telefono}
          onChangeText={setTelefono}
        />

        <TouchableOpacity
          title="Guardar Cambios"
          onPress={handleUpdate}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Guardar Cambios</Text>
        </TouchableOpacity>

        <TouchableOpacity
          title="Cambiar Contraseña"
          onPress={navigateToChangePassword}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Cambiar Contraseña</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  input: {
    width: "90%",
    marginVertical: 10,
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
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
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    alignContent: "center",
    alignSelf: "center",
    height: 150,
    width: 150,
    backgroundColor: "#f0f0f0",
  },
});
