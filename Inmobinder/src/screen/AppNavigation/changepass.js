import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../utils/config';
import { styles } from '../../styles/styleProfile';
import { useUserData } from '../../components/PropertyBrokerage/declaredata';

export default function App() {
    const {
        contraseña,
        setContraseña,
        navigation
    } = useUserData();

    const goBack = () => {
        navigation.goBack(); // Regresa a la vista anterior
    };

    return (
        <ImageBackground source={require('../../img/fondo.jpeg')} style={styles.background}>
            <View style={styles.container}>

                <TextInput style={styles.input} placeholder="Contraseña actual" />
                <TextInput style={styles.input} placeholder="Contraseña nueva" />
                <TextInput style={styles.input} placeholder="Confirmar contraseña" />
                <Button title="Confirmar cambios" onPress={() => console.log("Confirmar cambios")} />
            </View>
        </ImageBackground>
    );
}

