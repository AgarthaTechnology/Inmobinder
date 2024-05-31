import React, { useState } from "react";
import { Image, View, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./UploadImage.styles";
import { Modal } from "../../../Shared/Modal";

export function UploadImage(props) {
  const { formik } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    formik.values.gallery.length > 0 ? formik.values.gallery[0] : null
  );

  const openModal = () => {
    if (formik.values.gallery.length > 0) {
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const selectImage = (imageUri) => {
    setSelectedImage(imageUri);
    closeModal();
  };

  return (
    <View style={styles.content}>
      <TouchableOpacity onPress={openModal}>
        <Image
          source={
            selectedImage
              ? { uri: selectedImage }
              : require("../../../../../assets/img/camera-icon.jpg")
          }
          style={styles.mainImage}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Modal show={modalVisible} close={closeModal}>
        <ScrollView contentContainerStyle={styles.modalContent}>
          {formik.values.gallery.map((imageUri, index) => (
            <TouchableOpacity key={index} onPress={() => selectImage(imageUri)}>
              <Image source={{ uri: imageUri }} style={styles.modalImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Modal>
    </View>
  );
}
