import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation desde @react-navigation/native
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../utils/config';
import { styles } from '../../styles/style';
import { useUserData } from '../../components/PropertyBrokerage/declaredata';
import { useLoadUserData } from '../../components/PropertyBrokerage/readdata';
import { pickImage } from '../../components/PropertyBrokerage/imagepicker';
import { updateData } from '../../components/PropertyBrokerage/updatedata';
import { uploadImageToStorage } from '../../utils/firebaseStorage';
import { updateProfileImage } from '../../utils/firebaseFirestore';


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
        contraseña,
        setContraseña,
        navigation
    } = useUserData();

    useLoadUserData(setNombre, setCorreo, setRut, setTelefono, setDireccion, setContraseña);
    
    const handleUpdate = async () => {
        try {
            // Si se seleccionó una nueva imagen, la sube a Firebase Storage y actualiza la URL en Firestore
            if (image) {
                const downloadURL = await uploadImageToStorage(image);
                await updateProfileImage(downloadURL);
            }
            const updated = await updateData(correo, telefono, direccion);
            if (updated) {
                alert("Los datos fueron actualizados correctamente");
                navigation.goBack(); // Vuelve a la pantalla anterior
            } else {
                alert("Error al actualizar los datos");
            }
        } catch (error) {
            console.error('Error al actualizar los datos:', error);
            alert("Error al actualizar los datos");
        }
    };
    
    const goBack = () => {
        navigation.goBack(); // Regresa a la vista anterior
    };

    const ircambiarContra = () => {
        navigation.navigate('Cambiar Contraseña'); // Navega a la vista cambiar contraseña
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil</Text>
            <TouchableOpacity onPress={() => pickImage(setImage)}>
                {image ? <Image source={{ uri: image }} style={{ width: 200, height: 200, marginBottom: 20 }} /> : <Text>Elegir Imagen</Text>}
            </TouchableOpacity>

            <Text style={styles.joinDate}>Fecha de unión: 10 de abril de 2024</Text>
            <Text style={styles.verified}>[Cuenta Verificada]</Text>

        
            
            
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    value={correo}
                    onChangeText={setCorreo}
                />
                <Text style={styles.label}>Correo electrónico</Text>
            
            

                
                
                
                <TextInput
                    style={styles.input}
                    placeholder="Teléfono"
                    value={telefono}
                    onChangeText={setTelefono}
                />
                <Text style={styles.label}>Teléfono</Text>

            
        
                <TextInput
                    style={styles.input}
                    placeholder="Dirección Agencia"
                    value={direccion}
                    onChangeText={setDireccion}
                />
                <Text style={styles.label}>Dirección Agencia</Text>
  
            
            <Text style={styles.registeredAs}>Registrado como:</Text>
            <Text style={styles.agency}>[CORREDOR]</Text>
        
            <View style={styles.container}>
                <View style={styles.row}>
                    <Button title="Editar contraseña" onPress={ircambiarContra} />
                    <View style={styles.buttonContainer}>
                        <Button title="Guardar cambios" onPress={handleUpdate} />
                    </View>
                </View>
            </View>
        </View>
    );

}
