import { storage } from './config'; // Importa el objeto storage de tu configuración Firebase

// Función para subir una imagen a Firebase Storage
export async function uploadImageToStorage(imageUri) {
    try {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const ref = storage.ref().child(`profileImages/${new Date().toISOString()}`);
        await ref.put(blob);
        const downloadURL = await ref.getDownloadURL();
        return downloadURL;
    } catch (error) {
        throw new Error('Error al subir la imagen a Firebase Storage: ' + error.message);
    }
}
