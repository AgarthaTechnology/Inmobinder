import React, { useEffect, useState, useRef } from "react";
import { View, Alert, TouchableOpacity, Animated, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import VentaImage from "../../../../assets/images/Venta.png";
import ArriendoImage from "../../../../assets/images/Arriendo.png";
import { db } from "../../../utils/firebase.js";
import { collection, onSnapshot } from "firebase/firestore";
import { styles } from "../MapScreen/MapStyles.js";
import Legend from "../MapScreen/Legend.jsx";
import FilterMenu from "./FilterMenu.jsx";
import SearchBar from "./SearchBar.jsx";
import { StatusBar } from "expo-status-bar";
import { MapPublication } from "./MapPublication.jsx";

const Map = () => {
  const [origin, setOrigin] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [filter, setFilter] = useState(null);
  const [coords, setCoords] = useState([]);
  const [originalCoords, setOriginalCoords] = useState([]);
  const [menuAnimation] = useState(new Animated.Value(0));
  const [menuVisible, setMenuVisible] = useState(false);
  const [bedroomsFilter, setBedroomsFilter] = useState(null);
  const [bathroomsFilter, setBathroomsFilter] = useState(null);
  const [squareMetersFilter, setSquareMetersFilter] = useState(null);
  const [minCommonExpensesFilter, setMinCommonExpensesFilter] = useState(50000);
  const [maxCommonExpensesFilter, setMaxCommonExpensesFilter] =
    useState(500000);
  const [searchCoords, setSearchCoords] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const mapRef = useRef();

  useEffect(() => {
    getLocationPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "publications"),
      (snapshot) => {
        const updatedCoords = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCoords(updatedCoords);
        setOriginalCoords(updatedCoords);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const isCoordVisible = (coord) => {
    let visible = true;

    if (filter && coord.state !== filter) {
      visible = false;
    }

    if (bedroomsFilter !== null && parseInt(coord.rooms) !== bedroomsFilter) {
      visible = false;
    }

    if (
      bathroomsFilter !== null &&
      parseInt(coord.bathrooms) !== bathroomsFilter
    ) {
      visible = false;
    }

    if (
      squareMetersFilter !== null &&
      parseInt(coord.metters) < squareMetersFilter
    ) {
      visible = false;
    }

    return visible;
  };

  const handleSearch = (searchText) => {
    if (!searchText.trim()) {
      setSearchCoords([]);
      return;
    }

    const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      searchText
    )}&key=AIzaSyDHcpKQJ_MAgJ3DKNaf9BhLfF0-CnchY2k`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK" && data.results.length > 0) {
          const updatedCoords = data.results.map((result, index) => ({
            id: index.toString(),
            location: {
              latitude: result.geometry.location.lat,
              longitude: result.geometry.location.lng,
            },
            address: result.formatted_address,
            nameProperty: result.name,
            description: result.types.join(", "),
            commonExpenses: "0",
            state: "Busqueda",
          }));
          setSearchCoords(updatedCoords);

          const firstLocation = updatedCoords[0].location;
          mapRef.current.animateToRegion({
            latitude: firstLocation.latitude,
            longitude: firstLocation.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04,
          });
        } else {
          Alert.alert(
            "Error",
            "No se encontraron resultados para la búsqueda."
          );
        }
      })
      .catch((error) => {
        console.error("Error al realizar la búsqueda:", error);
        Alert.alert(
          "Error",
          "Ocurrió un error al realizar la búsqueda. Por favor, inténtalo de nuevo más tarde."
        );
      });
  };

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied");
      Alert.alert("Permission denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const currentLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setOrigin(currentLocation);
    setMarkerPosition(currentLocation);
    mapRef.current.animateToRegion({
      ...currentLocation,
      latitudeDelta: 0.09,
      longitudeDelta: 0.04,
    });
  };

  const menuTranslateY = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const goToOrigin = () => {
    if (origin && mapRef.current) {
      mapRef.current.animateToRegion({
        ...origin,
        latitudeDelta: 0.09,
        longitudeDelta: 0.04,
      });
      setMarkerPosition(origin);
    }
  };

  const toggleMenuVisibility = () => {
    setMenuVisible(!menuVisible);
    Animated.timing(menuAnimation, {
      toValue: menuVisible ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const applyFilter = () => {
    let filteredCoords = originalCoords.filter(isCoordVisible);
    setCoords(filteredCoords);
  };

  const clearFilter = () => {
    setCoords(originalCoords);
    setBathroomsFilter(null);
    setBedroomsFilter(null);
    setSquareMetersFilter(null);
    setMinCommonExpensesFilter(0);
    setMaxCommonExpensesFilter(100);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />

      <MapView
        ref={mapRef}
        initialRegion={{
          latitude: origin?.latitude ?? 0,
          longitude: origin?.longitude ?? 0,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
        showsUserLocation
        showsMyLocationButton={false}
        style={styles.map}
      >
        {coords.filter(isCoordVisible).map((coord) => (
          <Marker
            key={coord.id}
            coordinate={{
              latitude: coord?.location?.latitude ?? 0,
              longitude: coord?.location?.longitude ?? 0,
            }}
            onPress={() => {
              setSelectedProperty(coord);
              setModalVisible(true);
            }}
          >
            <Image
              source={coord.state === "Venta" ? VentaImage : ArriendoImage}
              style={{ height: 30, width: 30 }}
            />
          </Marker>
        ))}

        {markerPosition && <Marker coordinate={markerPosition} />}

        {searchCoords.map((coord, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: coord.location.latitude,
              longitude: coord.location.longitude,
            }}
          />
        ))}
      </MapView>

      <View>
        <Legend setFilter={setFilter} />
      </View>

      <TouchableOpacity style={styles.button} onPress={goToOrigin}>
        <FontAwesome name="map-marker" size={28} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.filterButton}
        onPress={toggleMenuVisibility}
      >
        <FontAwesome name="filter" size={20} color="white" />
      </TouchableOpacity>

      <SearchBar
        apiKey="AIzaSyDHcpKQJ_MAgJ3DKNaf9BhLfF0-CnchY2k"
        onSearch={handleSearch}
      />

      {menuVisible && (
        <FilterMenu
          menuAnimation={menuAnimation}
          minCommonExpensesFilter={minCommonExpensesFilter}
          setMinCommonExpensesFilter={setMinCommonExpensesFilter}
          maxCommonExpensesFilter={maxCommonExpensesFilter}
          setMaxCommonExpensesFilter={setMaxCommonExpensesFilter}
          bedroomsFilter={bedroomsFilter}
          setBedroomsFilter={setBedroomsFilter}
          bathroomsFilter={bathroomsFilter}
          setBathroomsFilter={setBathroomsFilter}
          squareMetersFilter={squareMetersFilter}
          setSquareMetersFilter={setSquareMetersFilter}
          toggleMenuVisibility={toggleMenuVisibility}
          handleSearch={handleSearch}
          applyFilter={applyFilter}
          clearFilter={clearFilter}
        />
      )}

      {modalVisible && selectedProperty && (
        <MapPublication
          isVisible={modalVisible}
          property={selectedProperty}
          onClose={() => setModalVisible(false)}
        />
      )}
    </View>
  );
};

export default Map;
