import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../utils/config';

export const updateData = async (correo, telefono, direccion) => {
    try {
        const docRef = doc(db, 'Empresa', 'Test'); // Suponiendo que 'Test' es el ID del documento
        await updateDoc(docRef, {
            correo: correo,
            telefono: telefono,
            direccion: direccion,
            // Agrega más campos aquí si es necesario
        });
        console.log('Los datos fueron actualizados correctamente');
        return true; // Retorna verdadero si la actualización fue exitosa
    } catch (error) {
        console.error('Error al actualizar los datos:', error);
        return false; // Retorna falso si hubo un error
    }
};