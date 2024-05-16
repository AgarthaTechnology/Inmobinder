import React from "react";
import { Image } from "react-native-elements";
import { View } from "react-native";
import { styles } from "./UploadImage.styles";

/**
 * Esta carpeta la cambie de nombre ya que tenian el mismo nombre y no se podian importar en InfoForm.js
 */

export function UploadImage(props) {
  const { formik } = props;

  const primaryImage =
    formik.values && formik.values.gallery && formik.values.gallery.length > 0
      ? formik.values.gallery[0]
      : null;

  return (
    <View style={styles.content}>
      <Image
        source={
          primaryImage
            ? { uri: primaryImage }
            : require("../../../../../assets/img/camera-icon.jpg")
        }
        style={styles.image}
      />
    </View>
  );
}
