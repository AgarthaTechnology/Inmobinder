import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Text, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./DisplayPublication.styles";

const DisplayPublication = (props) => {
  const { publications } = props;
  const navigation = useNavigation();

  const goTo = (publication) => {
    // Implementa la navegación a la pantalla deseada
  };

  return (
    <FlatList
      data={publications}
      renderItem={({ item }) => {
        const publication = item;

        return (
          <TouchableOpacity onPress={() => goTo(publication)}>
            {publication && (
              <View style={styles.publication}>
                {publication.gallery && publication.gallery[0] && (
                  <Image
                    source={{ uri: publication.gallery[0] }}
                    style={styles.gallery}
                  />
                )}
                <View>
                  <Text>{publication.nameProperty}</Text>
                  <Text>{publication.commonExpenses}</Text>
                  <Text>{publication.state}</Text>
                  <Text>{publication.metters}</Text>
                  <Text>{publication.mettersProperty}</Text>
                  <Text>{publication.address}</Text>
                  <Text>{publication.city}</Text>
                  <Text>{publication.region}</Text>
                  <Text>{publication.price}</Text>
                  <Text>{publication.rooms}</Text>
                  <Text>{publication.bathrooms}</Text>
                  <Text>{publication.description}</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default DisplayPublication;
