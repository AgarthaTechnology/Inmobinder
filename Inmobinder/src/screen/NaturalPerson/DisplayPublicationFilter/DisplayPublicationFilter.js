import React, { useEffect, useState, useMemo } from "react";
import { ImageBackground } from "react-native";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import DisplayPublication from "../../../components/NaturalPerson/DisplayPublication/DisplayPublication";
import { LoadingModal } from "../../../components/Shared/LoadingModal";
import { styles } from "./DisplayPublicationFilter.styles";
import { useRoute } from "@react-navigation/native";

export function DisplayPublicationFilter() {
  const [publications, setPublications] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const filters = useMemo(
    () => route.params?.filters || {},
    [route.params?.filters]
  );

  useEffect(() => {
    const q = query(collection(db, "publications"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const publicationsData = [];
      snapshot.docs.forEach((doc) => {
        const publicationData = doc.data();
        publicationData.id = doc.id;
        publicationsData.push(publicationData);
      });
      setPublications(publicationsData);
      setLoading(false);
    });

    return () => unsubscribe();
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

        if (rooms && rooms === 5 && parseInt(publication.rooms) <= 5) {
          return false;
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
