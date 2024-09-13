import React from "react";
import { View, FlatList, TouchableOpacity, Alert } from "react-native";
import { Text, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./DisplayPublication.styles";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { screen } from "../../../utils/screenName";;

const DisplayPublication = (props) => {
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

  // Manejar la eliminación de la publicación
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
              const publicationRef = doc(db, "publications", publication.id);

              await deleteDoc(publicationRef);
            } catch (error) {
              console.error("Error al eliminar la publicación:", error);
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
              <Image
                source={{ uri: publication.gallery[0] }}
                style={styles.gallery}
              />
            ) : (
              <Text style={styles.noImageText}>No hay imágenes</Text>
            )}
            <View style={styles.infoContainer}>
              <Text style={styles.nameProperty}>{publication.nameProperty}</Text>
              <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                  <FontAwesome5 name="bed" size={14} color="black" />
                  <Text style={styles.detailsText}>{publication.rooms} dormitorios</Text>
                </View>
                <View style={styles.detailItem}>
                  <FontAwesome5 name="bath" size={14} color="black" />
                  <Text style={styles.detailsText}>{publication.bathrooms} baños</Text>
                </View>
                <View style={styles.detailItem}>
                  <MaterialCommunityIcons name="fullscreen" size={14} color="black" />
                  <Text style={styles.detailsText}>{publication.metters} m²</Text>
                </View>
              </View>
              <View style={styles.locationRow}>
                <Entypo name="location-pin" size={14} color="red" />
                <Text style={styles.detailsText}>A {publication.distance} metros de tu posición</Text>
              </View>
              <View style={styles.actionsRow}>
                <TouchableOpacity 
                  style={[styles.button, styles.goButton]} 
                  onPress={() => goTo(publication)}
                >
                  <Text style={styles.buttonText}>Ir a la publicación</Text>
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
