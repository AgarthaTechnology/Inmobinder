import React, { useState } from "react";
import { ScrollView, Alert } from "react-native";
import { Icon, Avatar, Text } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as VideoThumbnails from "expo-video-thumbnails";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuid } from "uuid";
import { styles } from "./UploadVideo.styles";
import { LoadingModal } from "../../../Shared/LoadingModal/LoadingModal";
import { map } from "lodash";

export function UploadVideo({ formik, id }) {
  // Se cambia formId por id
  const [showUploadVideo, setShowUploadVideo] = useState(false);

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) uploadVideo(result.assets[0].uri);
  };

  const uploadVideo = async (uri) => {
    try {
      const { uri: thumbnailUri } = await VideoThumbnails.getThumbnailAsync(
        uri,
        {
          time: 15000,
        }
      );

      const response = await fetch(uri);
      const blob = await response.blob();
      const storage = getStorage();
      const videoPath = `property/${id}/${uuid()}`;
      const storageRef = ref(storage, videoPath);

      uploadBytes(storageRef, blob).then((snapshot) => {
        updateVideoPublication(snapshot.metadata.fullPath, thumbnailUri);
      });
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  const updateVideoPublication = async (videoPath, thumbnailUri) => {
    setShowUploadVideo(true);

    const storage = getStorage();
    const videoRef = ref(storage, videoPath);
    const videoUrl = await getDownloadURL(videoRef);

    formik.setFieldValue("video", [
      ...formik.values.video,
      { videoUrl, thumbnailUri },
    ]);

    setShowUploadVideo(false);
  };

  const removeVideo = async (videoUrl) => {
    Alert.alert(
      "Eliminar video",
      "¿Estás seguro de eliminar el video?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: async () => {
            try {
              const updatedVideos = formik.values.video.filter(
                (video) => video.videoUrl !== videoUrl
              );
              formik.setFieldValue("video", updatedVideos);

              const storage = getStorage();
              const videoRef = ref(storage, videoUrl);
              await deleteObject(videoRef);
            } catch (error) {
              console.error(`Failed to remove video: ${error}`);
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
          name="video"
          containerStyle={styles.Icon}
          onPress={openGallery}
        />

        {map(formik.values.video, ({ videoUrl, thumbnailUri }) => (
          <Avatar
            key={videoUrl}
            source={{ uri: thumbnailUri }}
            containerStyle={styles.video}
            onPress={() => removeVideo(videoUrl)}
          />
        ))}

        <LoadingModal show={showUploadVideo} text="Subiendo video." />
      </ScrollView>

      <Text style={styles.error}>{formik.errors.video}</Text>
    </>
  );
}
