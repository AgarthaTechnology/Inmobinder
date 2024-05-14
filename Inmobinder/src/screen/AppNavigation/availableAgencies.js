import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { styles } from '../../styles/styleAgency';
import { useNavigation } from '@react-navigation/native';

const availableAgencies = [
  { id: 1, name: 'Agencia 1', image: require('../../img/camara.jpeg') },
  { id: 2, name: 'Agencia 2', image: require('../../img/camara.jpeg') },
  { id: 3, name: 'Agencia 3', image: require('../../img/camara.jpeg') },
  { id: 4, name: 'Agencia 4', image: require('../../img/camara.jpeg') },
  { id: 5, name: 'Agencia 5', image: require('../../img/camara.jpeg') },
];

export default function AgenciasDisponibles() {
  const navigation = useNavigation();

  const handleAgencyPress = (agency) => {
    console.log('Ver detalles de', agency.name);
    navigation.navigate('AgenciaInformacion'); // Aquí navegamos a la vista "AgenciaInformacion"
  };

  return (
    <ImageBackground source={require('../../img/fondo.jpeg')} style={styles.background}>
      <View style={{ padding: 10 }}>
        {availableAgencies.map((agency) => (
          <View key={agency.id} style={styles.agencyContainer}>
            <Image source={agency.image} style={styles.agencyImage} />
            <View style={styles.agencyTextContainer}>
              <Text style={styles.agencyName}>{agency.name}</Text>
            </View>
            <TouchableOpacity style={styles.detailsButton} onPress={() => handleAgencyPress(agency)}>
              <Text style={styles.detailsButtonText}>Ver detalles</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ImageBackground>
  );
}
