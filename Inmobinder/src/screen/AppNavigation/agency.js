import React,{ useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa el ícono de la biblioteca
import { styles } from '../../styles/styleAgency';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const navigation = useNavigation();

  const iragenciasDisponibles = () => {
    navigation.navigate('AgenciasDisponibles'); // Navega a la vista "editarPerfil"
  };

  return (
    <ImageBackground source={require('../../img/fondo.jpeg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.subtitle}>Actualmente:</Text>
        <Text style={styles.text}>No perteneces a ninguna agencia</Text>
        <TouchableOpacity style={styles.button} onPress={iragenciasDisponibles}>
          <Icon name="search" size={20} color="white" /> 
          <Text style={styles.buttonText}>Agencias disponibles</Text>
        </TouchableOpacity>
        <Text style={styles.question}>¿No estás interesado?</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="user" size={20} color="black" />
          <Text style={styles.icon}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}