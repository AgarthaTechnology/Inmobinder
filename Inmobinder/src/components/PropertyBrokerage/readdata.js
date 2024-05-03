import { useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../utils/config';

export function useLoadUserData(setNombre, setCorreo, setRut, setTelefono, setDireccion) {
    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'Empresa', 'Test'), (doc) => {
            if (doc.exists()) {
                const userData = doc.data();
                console.log(userData); 

                setNombre(userData.nombre || '');
                setCorreo(userData.correo || '');
                setRut(userData.rut || '');
                setTelefono(userData.telefono || '');
                setDireccion(userData.direccion || '');
            } else {
                console.log('El documento del usuario no existe');
            }
        });

        return () => {
            unsubscribe(); // Limpia la suscripción al desmontar el componente
        };
    }, []);
}
