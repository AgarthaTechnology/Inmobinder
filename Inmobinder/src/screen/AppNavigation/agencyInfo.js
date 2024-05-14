import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/styleAgency';


export default function AgenciaInformacion() {
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('../../img/fondo.jpeg')} style={styles.background}>
            <View style={styles.agencyContainer}>
                <View style={styles.container}>
                    
                    <Text style={styles.title}>Agencia 1</Text>
                    <Image source={require('../../img/camara.jpeg')} style={[styles.logo, styles.textSpacing]} />
                    <Text style={[styles.agencyName, styles.textSpacing]}>[Nombre de la empresa]</Text>
                    <Text style={[styles.agencyName, styles.textSpacing]}>[Dirección]</Text>
                    <Text style={[styles.agencyName, styles.textSpacing]}>[Teléfono]</Text>
                    <Text style={[styles.agencyName, styles.textSpacing]}>[Correo electrónico]</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Postular</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}
