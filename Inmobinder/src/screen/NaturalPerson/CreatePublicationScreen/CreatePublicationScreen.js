import React, { useState } from "react";
import { ScrollView, Button } from "react-native";
import { useFormik } from "formik";
import { v4 as uuid } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";
import { InfoForm } from "../../../components/NaturalPerson/CreatePublication/InfoForm";
import { UploadImagesForm } from "../../../components/NaturalPerson/CreatePublication/UploadImagesForm";
import { UploadVideo } from "../../../components/NaturalPerson/CreatePublication/UploadVideo";
import { db } from "../../../utils/firebase";
import { initialValues } from "./CreatePublicationScreen.data";
import { styles } from "./CreatePublication.styles";

export function CreatePublicationScreen() {
  const navigation = useNavigation();
  const [newPublicationId] = useState(uuid());

  const formik = useFormik({
    initialValues: {
      ...initialValues(),
      gallery: [],
    },
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const storage = getStorage();
        const uploadedImages = await Promise.all(
          formValue.gallery.map(async (uri) => {
            const response = await fetch(uri);
            const blob = await response.blob();
            const imageID = uuid();
            const imagePath = `property/${newPublicationId}/${imageID}`;
            const storageRef = ref(storage, imagePath);
            await uploadBytes(storageRef, blob);
            return getDownloadURL(storageRef);
          })
        );

        const newData = {
          ...formValue,
          gallery: uploadedImages,
          id: newPublicationId,
          createdAt: new Date(),
        };

        const myDB = doc(db, "publications", newPublicationId);
        await setDoc(myDB, newData);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <InfoForm formik={formik} image={formik.values.gallery[0]} />
      <UploadImagesForm formik={formik} />
      <UploadVideo formik={formik} id={newPublicationId} />
      <Button
        title="Crear publicación"
        buttonStyle={styles.addPublication}
        onPress={formik.handleSubmit}
        disabled={formik.isSubmitting}
      />
    </ScrollView>
  );
}
