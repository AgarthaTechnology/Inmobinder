import React, { useState } from "react";
import { ScrollView, Alert } from "react-native";
import { Icon, Avatar, Text } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { map } from "lodash";
import { styles } from "./UploadImagesForm.styles";
import { LoadingModal } from "../../../Shared/LoadingModal/LoadingModal";

export function UploadImagesForm({ formik }) {
  const [showUploadImage] = useState(false);

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      formik.setFieldValue("gallery", [
        ...formik.values.gallery,
        result.assets[0].uri,
      ]);
    }
  };

  const removeImage = (uri) => {
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
          onPress: () => {
            const updatedGallery = formik.values.gallery.filter(
              (image) => image !== uri
            );
            formik.setFieldValue("gallery", updatedGallery);
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

        {map(formik.values.gallery, (imageUri) => (
          <Avatar
            key={imageUri}
            source={{ uri: imageUri }}
            containerStyle={styles.image}
            onPress={() => removeImage(imageUri)}
          />
        ))}

        <LoadingModal show={showUploadImage} text="Subiendo imagen." />
      </ScrollView>

      <Text style={styles.error}> {formik.errors.gallery} </Text>
    </>
  );
}
