import React from "react";
import { View, FlatList, TouchableOpacity, Alert } from "react-native";
import { Text, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./DisplayPublication.styles";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { getStorage, ref, deleteObject } from "firebase/storage";

const DisplayPublication = (props, filters) => {
  const { publications } = props;
  const navigation = useNavigation();
  
  // Navegar a la pantalla de detalles de la publicación
  const goTo = (publication) => {
    navigation.navigate("ViewPublication", { publication });
  };

  // Navegar a la pantalla de edición de la publicación
  const handleEdit = (publication) => {
    navigation.navigate("EditPublication", { publication });
  };

  const handleDelete = (publication) => {
    Alert.alert(
      "Eliminar Publicación",
      "¿Estás seguro de que deseas eliminar esta publicación?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              // Referencia a Firestore para eliminar la publicación
              const publicationRef = doc(db, "publications", publication.id);
              const storage = getStorage();

              // Eliminar imágenes de Storage
              if (publication.gallery && publication.gallery.length > 0) {
                const deletePromises = publication.gallery.map((imageUrl) => {
                  // Extraer la ruta relativa de la URL de la imagen
                  const imagePath = decodeURIComponent(
                    imageUrl.split("/o/")[1].split("?")[0]
                  );
                  const imageRef = ref(storage, imagePath);
                  return deleteObject(imageRef);
                });

                await Promise.all(deletePromises);
              }

              // Eliminar publicación de Firestore
              await deleteDoc(publicationRef);
            } catch (error) {
              console.error(
                "Error al eliminar la publicación o imágenes:",
                error
              );
              Alert.alert("Error", "No se pudo eliminar la publicación.");
            }
          },
        },
      ]
    );
  };

  // Renderizar cada publicación en la lista
  const renderPublication = ({ item }) => {
    const publication = item;
    return (
      <View onPress={() => goTo(publication)}>
        {publication && (
          <View style={styles.publication}>
            {publication.gallery && publication.gallery[0] ? (
              <View style={styles.galleryContainer}>
                <Image
                  source={{ uri: publication.gallery[0] }}
                  style={styles.gallery}
                />
              </View>
            ) : (
              <Text style={styles.noImageText}>No hay imágenes</Text>
            )}
            <View style={styles.infoContainer}>
              <Text style={styles.nameProperty}>
                {publication.nameProperty}
              </Text>
              <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                  <FontAwesome5 name="bed" size={14} color="black" />
                  <Text style={styles.detailsText}>
                    {publication.rooms} dormitorios
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <FontAwesome5 name="bath" size={14} color="black" />
                  <Text style={styles.detailsText}>
                    {publication.bathrooms} baños
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <MaterialCommunityIcons
                    name="fullscreen"
                    size={14}
                    color="black"
                  />
                  <Text style={styles.detailsText}>
                    {publication.metters} m²
                  </Text>
                </View>
              </View>

              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={[styles.button, styles.goButton]}
                  onPress={() => goTo(publication)}
                >
                  <Text style={styles.buttonText}>Ver publicación</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.editButton]}
                  onPress={() => handleEdit(publication)}
                >
                  <View style={styles.iconWrapper}>
                    <MaterialIcons name="edit" size={24} color="white" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={() => handleDelete(publication)}
                >
                  <View style={styles.iconWrapper}>
                    <MaterialIcons name="delete" size={24} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  return <FlatList data={publications} renderItem={renderPublication} />;
};

export default DisplayPublication;
