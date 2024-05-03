import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import { doc, onSnapshot } from 'firebase/firestore'; 
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation desde @react-navigation/native
import { db } from '../../utils/config';
import { styles } from '../../styles/style';
import { useUserData } from '../../components/PropertyBrokerage/declaredata';
import { useLoadUserData } from '../../components/PropertyBrokerage/readdata';
import { pickImage } from '../../components/PropertyBrokerage/imagepicker';

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
        <View style={styles.container}>
            <Text style={styles.title}>Perfil</Text>
            <TouchableOpacity style={styles.imageContainer} onPress={() => pickImage(setImage)}>
                {image ? <Image source={{ uri: image }} style={styles.profileImage} /> : <Text>Elegir Imagen</Text>}
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
            <Text style={styles.agency}>[AGENCIA]</Text>
            <Button title="Editar perfil" onPress={ireditarPerfil} />
        </View>
    );
    
}
