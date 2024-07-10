import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../utils/firebase";

export function useLoadUserProfile(
  userId,
  setNombres,
  setApellidos,
  setRut,
  setTelefono
) {
  useEffect(() => {
    if (!userId) return;

    const unsubscribe = onSnapshot(doc(db, "usuarios", userId), (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        setNombres(userData.nombres || "");
        setApellidos(userData.apellidos || "");
        setRut(userData.rut || "");
        setTelefono(userData.telefono || "");
      } else {
        console.log("El documento del usuario no existe");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [userId]);
}
