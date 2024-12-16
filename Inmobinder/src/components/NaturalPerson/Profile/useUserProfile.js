import { useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db, auth } from "../../../utils/firebase";

export function useUserProfile() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Verificamos si el usuario está autenticado
        const currentUser = auth.currentUser;
        if (!currentUser) {
          // Si no hay usuario autenticado, puedes manejar el caso, ejemplo:
          setError(new Error("No hay un usuario autenticado."));
          return;
        }

        // Creamos una consulta que filtre por uid
        const q = query(
          collection(db, "users"),
          where("uid", "==", currentUser.uid)
        );

        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(docs);
      } catch (error) {
        setError(error);
        console.error("Error al obtener los datos del usuario", error);
      }
    };
    fetchData();
  }, []);

  return { data, error };
}
