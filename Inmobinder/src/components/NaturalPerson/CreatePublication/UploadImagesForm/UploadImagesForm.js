import React, { useState } from "react";
import { ScrollView, Alert } from "react-native";
import { Icon, Avatar, Text } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuid } from "uuid";
import { map } from "lodash";
import { styles } from "./UploadImagesForm.styles";
import { LoadingModal } from "../../../Shared/LoadingModal/LoadingModal";

export function UploadImagesForm({ formik, id }) {
  const [showUploadImage, setShowUploadImage] = useState(false);
  const imageID = uuid();

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) uploadImage(result.assets[0].uri);
  };

  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storage = getStorage();
      const imagePath = `property/${id}/${imageID}`;
      const storageRef = ref(storage, imagePath);

      await uploadBytes(storageRef, blob);
      updatePhotosPublication(imagePath);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const updatePhotosPublication = async (imagePath) => {
    setShowUploadImage(true);

    const storage = getStorage();
    const imageRef = ref(storage, imagePath);
    const imageUrl = await getDownloadURL(imageRef);

    formik.setFieldValue("gallery", [...formik.values.gallery, imageUrl]);

    setShowUploadImage(false);
  };

  const removeImage = async (img) => {
    Alert.alert(
      "Eliminar imagen",
      "¿Estás seguro de eliminar la imagen?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              const result = formik.values.gallery.filter(
                (image) => image !== img
              );
              formik.setFieldValue("gallery", result);

              const storage = getStorage();
              const imageRef = ref(storage, `property/${id}/${imageID}`);
              await deleteObject(imageRef);
            } catch (error) {
              console.error(`Failed to remove image: ${error}`);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <ScrollView
        style={styles.containerImage}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <Icon
          type="material-community"
          name="camera-plus"
          containerStyle={styles.Icon}
          onPress={openGallery}
        />

        {map(formik.values.gallery, (image) => (
          <Avatar
            key={image}
            source={{ uri: image }}
            containerStyle={styles.image}
            onPress={() => removeImage(image)}
          />
        ))}

        <LoadingModal show={showUploadImage} text="Subiendo imagen." />
      </ScrollView>

      <Text style={styles.error}> {formik.errors.gallery} </Text>
    </>
  );
}
