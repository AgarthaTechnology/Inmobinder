import React, { useState } from 'react'
import { ScrollView, Alert} from 'react-native'
import { Icon, Avatar, Text } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuid } from 'uuid'
import { map, filter } from 'lodash'
import { LoadingModal } from '../../../Shared/LoadingModal/LoadingModal';
import { styles } from './UploadVideo.styles';

/**
 * Este componente lo hice despues de mostrar el avance funcional del viernes 
 */


export  function UploadVideo(props) {
  const { formik } = props;

  const [isLoading, setShowUploadVideo] = useState(false);

  const openvGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if(!result.canceled) uploadVideo(result.uri)

  };

  const uploadVideo = async (uri) =>{
    const response = await fetch(uri);
    const blob = await response.blob();
  
    const storage = getStorage();
    const storageRef = ref(storage, `property/${uuid()}`);

  
    uploadBytes(storageRef, blob).then((snapshot) => {
      updateVideoPublication(snapshot.metadata.fullPath);
    });
    
  };

  const updateVideoPublication = async (VideoPath) => {

    setShowUploadVideo(true);

    const storage = getStorage();
    const videoRef = ref(storage, VideoPath);
    const videoUrl = await getDownloadURL(videoRef);

    formik.setFieldValue("video", [...formik.values.video, videoUrl]);

    setShowUploadVideo(false);
  }

  const removeVideo= (img) => {
    Alert.alert(
      "Eliminar video",
      "¿Estás seguro de eliminar la video?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: () => {
            const result = filter(formik.values.video, (video) => video !== vd )
            formik.setFieldValue("video", result)
          },
        },
      ],
      {cancelable: false}
      );
  }


  return (
    <>
      <ScrollView
        style={styles.viewVideo}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <Icon
          type="material-community"
          name="video"
          color="#a7a7a7"
          containerStyle={styles.containerIcon}
          onPress={openvGallery}
        />

        {map(formik.values.video, (video) => (
          <Avatar
            key={video}
            source={{ uri: video }}
            containerStyle={styles.videoStyle}
            onPress={() => removeVideo(video)}
          />
        ))}
      </ScrollView>
      <Text style={styles.error}>{formik.errors.video}</Text>

      <LoadingModal show={isLoading} text="Subiendo Video" />
    </>
  )
}