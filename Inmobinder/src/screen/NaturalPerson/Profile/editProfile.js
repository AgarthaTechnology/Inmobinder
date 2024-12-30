// EditProfileScreen.js
import React, { useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ImageBackground,
  StyleSheet,
  Alert,
} from "react-native";
import { useFormik } from "formik";
import { UploadImagesForm } from "../../../components/NaturalPerson/CreatePublication/UploadImagesForm";
import { useUserProfile } from "../../../components/NaturalPerson/Profile/useUserProfile";
import { useNavigation } from "@react-navigation/native";
import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db } from "../../../utils/firebase";
import { v4 as uuid } from "uuid";
import { getAuth } from "firebase/auth";

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { data } = useUserProfile();

  // Función para eliminar una imagen existente en Firebase Storage
  const deleteProfileImage = async (imageUrl) => {
    try {
      const storage = getStorage();
      // Extraer la ruta relativa de la URL de la imagen
      const imagePath = decodeURIComponent(
        imageUrl.split("/o/")[1].split("?")[0]
      );
      const imageRef = ref(storage, imagePath);
      await deleteObject(imageRef);
      console.log("Imagen de perfil antigua eliminada correctamente.");
    } catch (error) {
      console.error("Error al eliminar la imagen de perfil antigua:", error);
      // Opcional: Manejar el error según tus necesidades
    }
  };

  const uploadProfileImage = async (uri) => {
    try {
      console.log("Subiendo imagen desde URI:", uri); // Verificar la URI
      const auth = getAuth();
      const storage = getStorage();
      const response = await fetch(uri);
  
      if (!response.ok) throw new Error("Error al convertir URI a blob.");
  
      const blob = await response.blob();
      console.log("Blob generado correctamente.");
  
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error("El usuario no está autenticado.");
  
      const imageID = uuid();
      const imagePath = `profile-images/${userId}/${imageID}`;
      console.log("Subiendo a Firebase Storage en:", imagePath);
  
      const storageRef = ref(storage, imagePath);
      await uploadBytes(storageRef, blob);
  
      const downloadURL = await getDownloadURL(storageRef);
      console.log("Imagen subida correctamente. URL:", downloadURL);
  
      return downloadURL;
    } catch (error) {
      console.error("Error al subir la imagen:", error.message);
      Alert.alert("Error", `No se pudo subir la imagen: ${error.message}`);
      return null;
    }
  };  

  const formik = useFormik({
    initialValues: {
      nombres: "",
      apellidos: "",
      rut: "",
      telefono: "",
      gallery: [],
    },
    onSubmit: async (values) => {
      if (!data || data.length === 0) return;

      const userId = data[0].id;
      let imageURL = formik.values.gallery[0] || null;

      // Obtener la URL de la imagen existente
      const existingImageUrl = data[0].image || null;

      if (formik.values.gallery.length > 0) {
        // Eliminar la imagen existente si existe
        if (existingImageUrl) {
          await deleteProfileImage(existingImageUrl);
        }

        // Subir la nueva imagen
        const uploadedImageUrl = await uploadProfileImage(
          formik.values.gallery[0]
        );
        if (uploadedImageUrl) {
          imageURL = uploadedImageUrl;
        }
      }

      try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
          nombre: values.nombres,
          apellido: values.apellidos,
          rut: values.rut,
          telefono: values.telefono,
          image: imageURL,
        });

        Alert.alert("Perfil actualizado correctamente");
        navigation.goBack();
      } catch (error) {
        console.error("Error al actualizar Firestore:", error);
        Alert.alert("Error", "No se pudo actualizar el perfil.");
      }
    },
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const userData = data[0];
      formik.setValues({
        nombres: userData.nombre || "",
        apellidos: userData.apellido || "",
        rut: userData.rut || "",
        telefono: userData.telefono || "",
        gallery: userData.image ? [userData.image] : [],
      });
    }
  }, [data]);

  useEffect(() => {
    if (formik.values.gallery.length > 1) {
      alert("Por favor, solo suba una imagen.");
      formik.setFieldValue("gallery", [formik.values.gallery[0]]);
    }
  }, [formik.values.gallery]);

  return (
    <ImageBackground
      source={require("../../../images/fondo.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <UploadImagesForm formik={formik} />

        <TextInput
          style={styles.input}
          placeholder="Nombres"
          value={formik.values.nombres}
          onChangeText={(text) => formik.setFieldValue("nombres", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellidos"
          value={formik.values.apellidos}
          onChangeText={(text) => formik.setFieldValue("apellidos", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="RUT"
          value={formik.values.rut}
          onChangeText={(text) => formik.setFieldValue("rut", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={formik.values.telefono}
          onChangeText={(text) => formik.setFieldValue("telefono", text)}
        />

        <TouchableOpacity onPress={formik.handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Guardar Cambios</Text>
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
});
