import React, { useState } from 'react'
import { ScrollView, Alert} from 'react-native'
import { Icon, Avatar, Text } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuid } from 'uuid'
import { map, filter } from 'lodash'
import { LoadingModal } from '../../../Shared/LoadingModal/LoadingModal';
import { styles } from './UploadImagesForm.styles';

export  function UploadImagesForm(props) {
  const { formik } = props;

  const [isLoading, setShowUploadImage] = useState(false);

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if(!result.canceled) uploadImage(result.uri)

  };

  const uploadImage = async (uri) =>{
    const response = await fetch(uri);
    const blob = await response.blob();
  
    const storage = getStorage();
    const storageRef = ref(storage, `property/${uuid()}`);

  
    uploadBytes(storageRef, blob).then((snapshot) => {
      updatePhotosPublication(snapshot.metadata.fullPath);
    });
    
  };

  const updatePhotosPublication = async (imagePath) => {

    setShowUploadImage(true);

    const storage = getStorage();
    const imageRef = ref(storage, imagePath);
    const imageUrl = await getDownloadURL(imageRef);

    formik.setFieldValue("gallery", [...formik.values.gallery, imageUrl]);

    setShowUploadImage(false);
  }

  const removeImage= (img) => {
    Alert.alert(
      "Eliminar imagen",
      "¿Estás seguro de eliminar la imagen?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: () => {
            const result = filter(formik.values.gallery, (image) => image !== img )
            formik.setFieldValue("gallery", result)
          },
        },
      ],
      {cancelable: false}
      );
  }


  return (
    <>
      <ScrollView
        style={styles.viewImage}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <Icon
          type="material-community"
          name="camera"
          color="#a7a7a7"
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
      <Text style={styles.error}>{formik.errors.images}</Text>

      <LoadingModal show={isLoading} text="Subiendo imagen" />
    </>
  )
}