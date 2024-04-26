import React from "react";
import { ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import { v4 as uuid } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { InfoForm } from "../../../components/NaturalPerson/CreatePublication/InfoForm";
import { UploadImagesForm } from "../../../components/NaturalPerson/CreatePublication/UploadImagesForm";
import { db } from "../../../utils/firebase";
import { initialValues, validationSchema } from "./CreatePublicationScreen.data";
import { styles } from "./CreatePublication.styles";

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

        const myDB = doc(db, "publications", newData.id);
        await setDoc(myDB, newData); 

      } catch (error) {
        console.log(error);
        console.error("Error adding document: ", error);
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