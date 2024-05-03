import React, { useState } from 'react'
import { formik } from 'formik'
import { View, Alert, ScrollView } from 'react-native'
import { Icon, Avatar, Text } from 'react-native-elements'
import { styles } from './UploadImagesForm.styles'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker'
import {v4 as uuid} from 'uuid'
import { LoadingModal } from '../../../Shared/LoadingModal'
import { map, filter } from 'lodash'

export function UploadImagesForm(props) {
  const { formik } = props;
  const [isLoading, setIsLoading] = useState(false);

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setIsLoading(true);
      uploadImage(result.uri);
    }
  }

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `propiedades/${uuid()}`);

    uploadBytes(storageRef,blob).then((snapshot) => {
      updatePhotoPublication(snapshot.ref.fullPath);
    });
  }

  const updatePhotoPublication = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);

    const imageURL = await getDownloadURL(imageRef);

    formik.setFieldValue('gallery', [...formik.values.gallery, imageURL]);

    setIsLoading(false);
  }

  const removeImage = (img) => {
    Alert.alert(
      "Eliminar imagen",
      "¿Estás segurdo de eliminar esta imagen?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            const result = filter(
              formik.values.images,
              (image) => image !== img
            );
            formik.setFieldValue("images", result);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <ScrollView style={styles.viewImage} horizontal showsHorizontalScrollIndicator={false}>
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={openGallery}
        />
        {map(formik.values.gallery, (image) => (
          <Avatar
            key={image}
            source={{ uri: image }}
            containerStyle={styles.imageStyle}
            onPress={() => removeImage(image)}
          />
        ))}
      </ScrollView>
      <Text style={styles.error}>{formik.errors.gallery}</Text>
      <LoadingModal show={isLoading} text="Subiendo imagen" />
    </>
  )
}
