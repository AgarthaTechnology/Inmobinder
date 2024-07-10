// hooks/useUserProfile.js
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../utils/firebase";

export function useUserProfile() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "usuarios"));
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
