import React, { useEffect, useState } from "react";
import { ImageBackground } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import DisplayPublication from "../../../components/NaturalPerson/DisplayPublication/DisplayPublication";
import { LoadingModal } from "../../../components/Shared/LoadingModal";
import { styles } from "./DisplayPublicationScreen.styles";

export function DisplayPublicationScreen() {
  const [publications, setPublications] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      // No se necesita establecer publicaciones aquí
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "publications"));

    onSnapshot(q, (snapshot) => {
      const publications = [];
      snapshot.docs.forEach((doc) => {
        const publicationData = doc.data();
        publicationData.id = doc.id;
        publications.push(publicationData);
      });
      setPublications(publications);
      setLoading(false);
    });
  }, []);

  return (
    <ImageBackground
      source={require("../../../images/fondo.png")}
      style={styles.contentContainer}
    >
      {loading ? (
        <LoadingModal show text="Cargando" />
      ) : (
        <DisplayPublication publications={publications} />
      )}
    </ImageBackground>
  );
}
