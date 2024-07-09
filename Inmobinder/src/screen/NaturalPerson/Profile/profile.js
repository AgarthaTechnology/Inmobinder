import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserProfile } from '../../../components/NaturalPerson/Profile/useUserProfile';
import { useLoadUserProfile } from '../../../components/NaturalPerson/Profile/loadUserProfile';

const ProfileScreen = () => {
    const {
        image,
        nombres,
        apellidos,
        rut,
        telefono
    } = useUserProfile();

    const navigation = useNavigation();

    // Llama al hook useLoadUserProfile
    useLoadUserProfile();

    const navigateToEditProfile = () => {
        navigation.navigate('Editar Perfil'); 
    };

    return (
        <ImageBackground source={require('../../../images/fondo.png')} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Perfil</Text>
                <TouchableOpacity style={styles.imageContainer}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.profileImage} />
                    ) : (
                        <Text>Elegir Imagen</Text>
                    )}
                </TouchableOpacity>
                <Text style={styles.input}>{nombres}</Text>
                <Text style={styles.input}>{apellidos}</Text>
                <Text style={styles.input}>{rut}</Text>
                <Text style={styles.input}>{telefono}</Text>
                <Button title="Editar perfil" onPress={navigateToEditProfile} />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        marginBottom: 20
    },
    imageContainer: {
        marginBottom: 20
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    input: {
        fontSize: 18,
        marginBottom: 10
    }
});

export default ProfileScreen;
