import React, { useEffect, useState } from "react";
import { ImageBackground } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import DisplayPublication from "../../../components/NaturalPerson/DisplayPublication/DisplayPublication";
import { LoadingModal } from "../../../components/Shared/LoadingModal";
import { styles } from "./DisplayPublicationScreen.styles";
import { useRoute } from "@react-navigation/native";
import { useMemo } from "react";

export function DisplayPublicationScreen() {
  const [publications, setPublications] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  const route = useRoute(); // Obtener filtros desde la navegación
  const filters = useMemo(
    () => route.params?.filters || {},
    [route.params?.filters]
  );

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

  useEffect(() => {
    if (filters) {
      const tolerance = 0.5;
      const filtered = publications.filter((publication) => {
        const { priceRange, rooms, bathrooms, condition, metters } = filters;

        if (
          priceRange &&
          (parseFloat(publication.price) < priceRange[0] ||
            parseFloat(publication.price) > priceRange[1])
        ) {
          return false;
        }

        // Filtro por habitaciones
        if (rooms && rooms === 5 && parseInt(publication.rooms) <= 5) {
          return false; // Mostrar solo publicaciones con más de 5 habitaciones
        } else if (
          rooms &&
          rooms < 5 &&
          parseInt(publication.rooms) !== rooms
        ) {
          return false;
        }

        if (
          bathrooms &&
          bathrooms === 5 &&
          parseInt(publication.bathrooms) <= 5
        ) {
          return false;
        } else if (
          bathrooms &&
          bathrooms < 5 &&
          parseInt(publication.bathrooms) !== bathrooms
        ) {
          return false;
        }

        if (condition && publication.condition !== condition) {
          return false;
        }

        const dynamicTolerance = metters ? metters * tolerance : 0;
        if (
          (metters &&
            parseFloat(publication.metters) < metters - dynamicTolerance) ||
          (metters &&
            parseFloat(publication.metters) > metters + dynamicTolerance)
        ) {
          return false;
        }

        return true;
      });

      setFilteredPublications(filtered);
    } else {
      setFilteredPublications(publications);
    }
  }, [filters, publications]);

  return (
    <ImageBackground
      source={require("../../../images/fondo.png")}
      style={styles.contentContainer}
    >
      {loading ? (
        <LoadingModal show text="Cargando" />
      ) : (
        <DisplayPublication publications={filteredPublications} />
      )}
    </ImageBackground>
  );
}
