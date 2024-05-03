import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export function useUserData() {
    const [image, setImage] = useState(null);
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [rut, setRut] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [contraseña, setContraseña] = useState('');
    const navigation = useNavigation();

    return {
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
        contraseña,
        setContraseña,
        setDireccion,
        navigation
    };
}
