import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Text, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./DisplayPublication.styles";

const DisplayPublication = (props) => {
  const { publications } = props;
  const navigation = useNavigation();

  const goTo = (publication) => {
    // Implement navigation to the desired screen, e.g.,
    // navigation.navigate('PublicationDetail', { publication });
  };

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
              <Text style={styles.text}>No hay imágenes</Text>
            )}
            <View>
              <Text style={styles.text}>
                Nombre Propiedad: {publication.nameProperty}
              </Text>
              <Text style={styles.text}>
                Gastos Comunes: {publication.commonExpenses}
              </Text>
              <Text style={styles.text}>Estado: {publication.state}</Text>
              <Text style={styles.text}>
                Metros Totales: {publication.metters}
              </Text>
              <Text style={styles.text}>
                Metros Propiedad: {publication.mettersProperty}
              </Text>
              <Text style={styles.text}>Dirección: {publication.address}</Text>
              <Text style={styles.text}>Ciudad: {publication.city}</Text>
              <Text style={styles.text}>Región: {publication.region}</Text>
              <Text style={styles.text}>Precio: {publication.price}</Text>
              <Text style={styles.text}>Habitaciones: {publication.rooms}</Text>
              <Text style={styles.text}>Baños: {publication.bathrooms}</Text>
              <Text style={styles.text}>
                Descripción: {publication.description}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return <FlatList data={publications} renderItem={renderPublication} />;
};

export default DisplayPublication;
