import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";

export const updateUserProfile = async (
  userId,
  nombre,
  apellido,
  rut,
  telefono
) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      nombre,
      apellido,
      rut,
      telefono,
    });
    return true;
  } catch (error) {
    console.error("Error actualizando el perfil del usuario: ", error);
    return false;
  }
};
