import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";

export const updateUserProfile = async (
  userId,
  nombres,
  apellidos,
  rut,
  telefono
) => {
  try {
    const userRef = doc(db, "usuarios", userId);
    await updateDoc(userRef, {
      nombres,
      apellidos,
      rut,
      telefono,
    });
    return true;
  } catch (error) {
    console.error("Error actualizando el perfil del usuario: ", error);
    return false;
  }
};
