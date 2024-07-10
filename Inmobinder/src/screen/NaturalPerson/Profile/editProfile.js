import React, { useState, useEffect } from "react";
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
import { auth } from "../../../utils/firebase";
import { screenName } from "../../../utils/screenName";

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
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
      useLoadUserProfile(
        user.uid,
        setNombres,
        setApellidos,
        setRut,
        setTelefono
      );
    }
  }, []);

  const handleUpdate = async () => {
    if (!userId) {
      console.error("User ID not found");
      return;
    }
    const updated = await updateUserProfile(
      userId,
      nombres,
      apellidos,
      rut,
      telefono
    );
    if (updated) {
      alert("Los datos fueron actualizados correctamente");
      navigation.goBack();
    } else {
      alert("Error al actualizar los datos");
    }
  };

  const navigateToChangePassword = () => {
    navigation.navigate(screenName.profile.changePass);
  };

  return (
    <ImageBackground
      source={require("../../../images/fondo.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => pickProfileImage(setImage)}
          style={styles.pickProfileImage}
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

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Guardar Cambios</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={navigateToChangePassword}
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
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#009245",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  pickProfileImage: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: 100,
    height: 100,
    backgroundColor: "#ddd",
  },
});
