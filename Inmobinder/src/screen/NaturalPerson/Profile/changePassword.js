import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, TextInput, Button, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserProfile } from '../../../components/NaturalPerson/Profile/useUserProfile';

export default function ChangePasswordScreen() {
    const {
        contraseña,
        setContraseña,
        navigation
    } = useUserProfile();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = () => {
        if (newPassword !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        // Aquí iría la lógica para actualizar la contraseña
        alert('Contraseña cambiada con éxito');
        navigation.goBack();
    };

    return (
        <ImageBackground source={require('../../../images/fondo.png')} style={styles.background}>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña actual"
                    secureTextEntry
                    value={contraseña}
                    onChangeText={setContraseña}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña nueva"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirmar contraseña"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <Button title="Confirmar cambios" onPress={handleChangePassword} />
            </View>
        </ImageBackground>
    );
}


export const styles = StyleSheet.create({
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
    input: {
        width: '80%',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10
    }
});