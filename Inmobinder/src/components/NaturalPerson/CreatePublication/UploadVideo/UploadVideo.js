import React, { useState } from "react";
import { ScrollView, Alert } from "react-native";
import { Icon, Avatar, Text } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { map } from "lodash";
import { styles } from "./UploadVideo.styles";
import { LoadingModal } from "../../../Shared/LoadingModal/LoadingModal";
import { v4 as uuid } from "uuid";
import * as VideoThumbnails from "expo-video-thumbnails"; // Importar la función getThumbnailAsync

export function UploadVideo({ formik }) {
  const [showUploadVideo, setShowUploadVideo] = useState(false);

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      const { uri: thumbnailUri } = await VideoThumbnails.getThumbnailAsync(
        uri,
        {
          time: 15000,
        }
      );
      formik.setFieldValue("video", [
        ...formik.values.video,
        { uri: uri, thumbnailUri: thumbnailUri, id: uuid() }, // Añadir thumbnailUri y id
      ]);
    }
  };

  const removeVideo = (id) => {
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
          onPress: () => {
            const updatedVideos = formik.values.video.filter(
              (video) => video.id !== id
            );
            formik.setFieldValue("video", updatedVideos);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <ScrollView
        style={styles.containerVideo}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <Icon
          type="material-community"
          name="video"
          containerStyle={styles.Icon}
          onPress={openGallery}
        />

        {map(formik.values.video, ({ uri, thumbnailUri, id }) => (
          <Avatar
            key={id}
            source={{ uri: thumbnailUri }}
            containerStyle={styles.video}
            onPress={() => removeVideo(id)}
          />
        ))}

        <LoadingModal show={showUploadVideo} text="Subiendo video." />
      </ScrollView>

      <Text style={styles.error}>{formik.errors.video}</Text>
    </>
  );
}
