import React from 'react';
import { Text, Modal, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import VentaImage from '../../../../assets/images/Venta.png';
import AlquilerImage from '../../../../assets/images/Arriendo.png';
import propertyImage from '../../../../assets/images/propiedad1.png';

export function MapPublication({ isVisible, property, onClose, imageUrl }) {
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
              <Image source={property?.state === 'Venta' ? VentaImage : AlquilerImage}  style={{ height: 30, width: 30 }} />
              <Text style={styles.title}>Propiedad en {property?.state}</Text>
            </View>

            <Image source={propertyImage} style={styles.propertyImage}/>            

            <View style={styles.row}>
              <FontAwesome name='bed' size={20} color='black' />
              <Text style={styles.modalText}>{property?.rooms} Habitaciones</Text>
            

              <FontAwesome name='bath' size={20} color='black' />
              <Text style={styles.modalText}>{property?.bathrooms} Baños</Text>
            
              <Feather name='maximize' size={20} color='black' />
              <Text style={styles.modalText}>{property?.metters} m2</Text>
            </View>
            
            <Button title='Ir a la Publicacion' buttonStyle={styles.button} />
            
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
  propertyImage: {
    width: 310,
    resizeMode: 'contain',
  },
  modal: {
    width: 319,
    height: 310,
    margin: 20,
    backgroundColor: "white",
    flexDirection: "column",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: 'row',
    justifyContent:"space-between",
    alignContent: "center",
  },
  modalText: {
    marginLeft: 10,
    textAlign: "center",
    fontSize: 12,
    marginHorizontal: 5,
  },
  button: {
    width: 158,
    height: 40,
    backgroundColor: "#00a680",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
  },
});
