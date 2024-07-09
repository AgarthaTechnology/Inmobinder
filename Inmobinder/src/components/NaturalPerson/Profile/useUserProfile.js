import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export function useUserProfile() {
    const [image, setImage] = useState(null);
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [rut, setRut] = useState('');
    const [telefono, setTelefono] = useState('');
    const [contraseña, setContraseña] = useState('');
    const navigation = useNavigation();

    return {
        image,
        setImage,
        nombres,
        setNombres,
        apellidos,
        setApellidos,
        rut,
        setRut,
        telefono,
        setTelefono,
        contraseña,
        setContraseña,
        navigation
    };
}
