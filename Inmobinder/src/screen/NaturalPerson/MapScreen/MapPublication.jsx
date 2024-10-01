import React from 'react';
import { Text, Modal, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import VentaImage from '../../../../assets/images/Venta.png';
import ArriendoImage from '../../../../assets/images/Arriendo.png';
import { useNavigation } from '@react-navigation/native';

export function MapPublication({ isVisible, property, onClose }) {
  const navigation = useNavigation();

  if (!property) return null;

  const goTo = () => {
    navigation.navigate("ViewPublication", { publication: property });
  };

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.container}>
          <View style={styles.modal}>
            <View style={styles.row}>
              <Image source={property.state === 'Venta' ? VentaImage : ArriendoImage} style={{ height: 30, width: 30 }} />
              <Text style={styles.title}>Propiedad en {property.state}</Text>
            </View>
            {property.gallery && property.gallery.length > 0 && (
              <Image source={{ uri: property.gallery[0] }} style={styles.image} />
            )}

            <View style={styles.row}>
              <FontAwesome name='bed' size={20} color='black' />
              <Text style={styles.modalText}>{property.rooms} Habitaciones</Text>

              <FontAwesome name='bath' size={20} color='black' />
              <Text style={styles.modalText}>{property.bathrooms} Baños</Text>

              <Feather name='maximize' size={20} color='black' />
              <Text style={styles.modalText}>{property.metters} m²</Text>
            </View>

            <Button title='Ir a la Publicación' buttonStyle={styles.button} onPress={goTo} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    width: 300,
    height: 180,
    resizeMode: 'cover',
    marginVertical: 10,
  },
  modal: {
    width: 320,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: "center",
    marginVertical: 5,
    marginLeft: 15,
  },
  modalText: {
    marginLeft: 5,
    fontSize: 14,
    marginRight: 15,
  },
  button: {
    width: 200,
    height: 45,
    backgroundColor: "#00a680",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 15,
  },
});
