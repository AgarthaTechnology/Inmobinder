import React from "react";
import { ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import { v4 as uuid } from "uuid";
import { collection, addDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { InfoForm } from "../../../components/NaturalPerson/CreatePublication/InfoForm";
import { UploadImagesForm } from "../../../components/NaturalPerson/CreatePublication/UploadImagesForm";
import appFirebase from '../../../utils/database';
import { initialValues, validationSchema } from "./CreatePublicationScreen.data";
import { styles } from "./CreatePublication.styles";
import { getFirestore } from "firebase/firestore"; // Importa getFirestore

export function CreatePublicationScreen() {
  const navigation = useNavigation();
  const formik = useFormik({
    initialValues: initialValues(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        console.log(formValue);
        const newData = formValue;
        newData.id = uuid();
        newData.createdAt = new Date();

        const db = getFirestore(appFirebase); // Obtiene la instancia de Firestore con getFirestore
        const myDB = collection(db, "coords"); // Obtiene la colección "coords"
        await addDoc(myDB, newData); // Agrega el documento a la colección

        navigation.navigate("INMOBINDER");
        
      } catch (error) {
        console.log(error);
        console.error("Error al agregar el documento:", error);
      }
    },
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <InfoForm formik={formik} />

      <Button
        title="Crear publicacion"
        buttonStyle={styles.addPublication}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </ScrollView>
  );
}
