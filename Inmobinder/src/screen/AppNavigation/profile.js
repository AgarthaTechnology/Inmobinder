import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { doc, onSnapshot } from 'firebase/firestore'; 
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation desde @react-navigation/native
import { db } from '../../utils/config';
import { styles } from '../../styles/styleProfile';
import { useUserData } from '../../components/PropertyBrokerage/declaredata';
import { useLoadUserData } from '../../components/PropertyBrokerage/readdata';
import { pickImage } from '../../components/PropertyBrokerage/imagepicker';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa el ícono de la biblioteca

export default function App() {
    const {
        image,
        setImage,
        nombre,
        setNombre,
        correo,
        setCorreo,
        rut,
        setRut,
        telefono,
        setTelefono,
        direccion,
        setDireccion,
        navigation
    } = useUserData();

    useLoadUserData(setNombre, setCorreo, setRut, setTelefono, setDireccion);

    const ireditarPerfil = () => {
        navigation.navigate('Editar Perfil'); // Navega a la vista "editarPerfil"
    };
    
    return (
        <ImageBackground source={require('../../img/fondo.jpeg')} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Perfil</Text>
                <TouchableOpacity style={styles.imageContainer}>
                    <Image source={require('../../img/camara.jpeg')} style={styles.profileImage} />
                </TouchableOpacity>
                <Text style={styles.joinDate}>Fecha de unión: 10 de abril de 2024</Text>
                <Text style={styles.verified}>[Cuenta Verificada]</Text>
                <Text style={styles.input}>{nombre}</Text>
                <Text style={styles.input}>{correo}</Text>
                <View style={styles.row}>
                    <Text style={styles.inputHalf}>{rut}</Text>
                    <Text style={styles.inputHalf}>{telefono}</Text>
                </View>
                <Text style={styles.input}>{direccion}</Text>
                <Text style={styles.registeredAs}>Registrado como:</Text>
                <Text style={styles.corredor}>[CORREDOR]</Text>
                <Button title="Editar perfil" onPress={ireditarPerfil} />
            </View>
        </ImageBackground>
    );
    
}
