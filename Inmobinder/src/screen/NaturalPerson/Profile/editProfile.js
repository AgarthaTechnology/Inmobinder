import React from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserProfile } from '../../../components/NaturalPerson/Profile/useUserProfile';
import { useLoadUserProfile } from '../../../components/NaturalPerson/Profile/loadUserProfile';
import { pickProfileImage } from '../../../components/NaturalPerson/Profile/profileImagePicker';
import { updateUserProfile } from '../../../components/NaturalPerson/Profile/updateUserProfile';

export default function EditProfileScreen() {
    const {
        image,
        setImage,
        nombres,
        setNombres,
        apellidos,
        setApellidos,
        rut,
        setRut,
        telefono,
        setTelefono
    } = useUserProfile();

    const navigation = useNavigation();

    useLoadUserProfile(setNombres, setApellidos, setRut, setTelefono);

    const handleUpdate = async () => {
        const updated = await updateUserProfile(nombres, apellidos, rut, telefono);
        if (updated) {
            alert("Los datos fueron actualizados correctamente");
            navigation.goBack();
        } else {
            alert("Error al actualizar los datos");
        }
    };

    const navigateToChangePassword = () => {
        navigation.navigate('Cambiar Contraseña');
    };

    return (
        <ImageBackground source={require('../../../images/fondo.png')} style={styles.background}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => pickProfileImage(setImage)}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.profileImage} />
                    ) : (
                        <Text>Elegir Imagen</Text>
                    )}
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Nombres"
                    value={nombres}
                    onChangeText={setNombres}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Apellidos"
                    value={apellidos}
                    onChangeText={setApellidos}
                />
                <TextInput
                    style={styles.input}
                    placeholder="RUT"
                    value={rut}
                    onChangeText={setRut}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Teléfono"
                    value={telefono}
                    onChangeText={setTelefono}
                />
                <Button title="Guardar cambios" onPress={handleUpdate} />
                <Button title="Cambiar contraseña" onPress={navigateToChangePassword} />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: '80%',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 10
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10
    }
});
