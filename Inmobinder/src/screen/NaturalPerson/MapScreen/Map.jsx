import React, { useEffect, useState, useRef } from 'react';
import { View, Alert, TouchableOpacity, Animated, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesome } from '@expo/vector-icons';
import VentaImage from '../../../../assets/images/Venta.png';
import ArriendoImage from '../../../../assets/images/Arriendo.png';
import INMOBINDER from '../../../../assets/images/INMOBINDER-03.png';
import { db } from '../../../utils/firebase.js';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { styles } from '../MapScreen/MapStyles.js';
import Legend from '../MapScreen/Legend.jsx';
import FilterMenu from './FilterMenu.jsx';
import SearchBar from './SearchBar.jsx';
import { StatusBar } from "expo-status-bar";
import { MapPublication } from './MapPublication.jsx';


const Map = () => {
  const [origin, setOrigin] = useState(null); // Estado para la ubicación actual
  const [markerPosition, setMarkerPosition] = useState(null); // Estado para la posición del marcador
  const [filter, setFilter] = useState(null); // Estado para el filtro activo
  const [coords, setCoords] = useState([]); // Almacena las coordenadas de las propiedades
  const [originalCoords, setOriginalCoords] = useState([]); // Almacena las coordenadas originales
  const [menuAnimation] = useState(new Animated.Value(0)); // Animación para el menú
  const [menuVisible, setMenuVisible] = useState(false); // Estado para la visibilidad del menú
  const [bedroomsFilter, setBedroomsFilter] = useState(null); // Estado para el filtro de habitaciones
  const [bathroomsFilter, setBathroomsFilter] = useState(null); // Estado para el filtro de baños
  const [squareMetersFilter, setSquareMetersFilter] = useState(null); // Estado para el filtro de metros cuadrados
  const [minCommonExpensesFilter, setMinCommonExpensesFilter] = useState(50000); // Valor inicial del filtro de gastos comunes mínimos
  const [maxCommonExpensesFilter, setMaxCommonExpensesFilter] = useState(500000); // Valor inicial del filtro de gastos comunes máximos
  const [searchText, setSearchText] = useState(''); // Estado para el texto de búsqueda
  const [SearchCoords, setSearchCoords] = useState([]); // Estado para las coordenadas de la búsqueda
  const [selectedProperty, setSelectedProperty] = useState(null); // Estado para la propiedad seleccionada
  const [modalVisible, setModalVisible] = useState(false); // Estado para la visibilidad del modal

  const mapRef = useRef();

  useEffect(() => {
    getLocationPermission(); // Obtener permiso de ubicación al montar el componente
    fetchOriginalCoords(); // Cargar coordenadas originales al montar el componente
  }, []);

  const isCoordVisible = (coord) => {
    return !filter || coord.state === filter || coord.bathrooms === filter || coord.rooms === filter || coord.metters === filter || coord.gallery[0] === filter;
  };

  // Escuchar cambios en la colección de coordenadas
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'publications'), (snapshot) => {
      const updatedCoords = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCoords(updatedCoords);
      setOriginalCoords(updatedCoords); // Actualiza también las coordenadas originales
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSearch = (searchText) => {
    if (!searchText.trim()) {
      setCoords([]);
      return;
    }

    const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchText)}&key=AIzaSyDHcpKQJ_MAgJ3DKNaf9BhLfF0-CnchY2k`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK' && data.results.length > 0) {
          const updatedCoords = data.results.map((result, index) => ({
            id: index.toString(),
            location: {
              latitude: result.geometry.location.lat,
              longitude: result.geometry.location.lng
            },
            address: result.formatted_address,
            nameProperty: result.name,
            description: result.types.join(", "),
            commonExpenses: '0',
            state: 'Busqueda',
          }));
          setSearchCoords(updatedCoords);
          console.log("Resultados de la búsqueda:", updatedCoords);

          // Centrar el mapa en la primera ubicación encontrada
          const firstLocation = updatedCoords[0].location;
          mapRef.current.animateToRegion({
            latitude: firstLocation.latitude,
            longitude: firstLocation.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04,
          });
        } else {
          Alert.alert('Error', 'No se encontraron resultados para la búsqueda.');
        }
      })
      .catch(error => {
        console.error('Error al realizar la búsqueda:', error);
        Alert.alert('Error', 'Ocurrió un error al realizar la búsqueda. Por favor, inténtalo de nuevo más tarde.');
      });
  };

  // Obtener permiso de ubicación
  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission denied');
      Alert.alert('Permission denied');
      return;
    }
    // Obtener la ubicación actual
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

  // Cargar las coordenadas originales de la base de datos
  const fetchOriginalCoords = async () => {
    const snapshot = await getDocs(collection(db, 'publications'));
    const initialCoords = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setOriginalCoords(initialCoords);
    setCoords(initialCoords); // Asegúrate de que las coordenadas iniciales también se configuren aquí
  };

  // Animaciones para el menú 
  const menuTranslateY = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0], // Ajustar según la altura del menú
  });

  // Función para ir a la ubicación actual
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

  // Función para mostrar u ocultar el menú
  const toggleMenuVisibility = () => {
    setMenuVisible(!menuVisible);
    // Anima el menú al cambiar
    Animated.timing(menuAnimation, {
      toValue: menuVisible ? 0 : 1,
      duration: 200, // Ajusta la duración de la animación
      useNativeDriver: true, // Mejora el rendimiento (opcional)
    }).start();
  };

  const applyFilter = () => {
    // Limpiar las coordenadas antes de aplicar un nuevo filtro
    setCoords([]);

    // Copiar las coordenadas originales
    let filteredCoords = [...originalCoords];

    // Aplicar filtro por número de habitaciones
    if (bedroomsFilter !== null) {
      filteredCoords = filteredCoords.filter(coord =>
        parseInt(coord.rooms) === bedroomsFilter
      );
    }

    // Aplicar filtro por número de baños
    if (bathroomsFilter !== null) {
      filteredCoords = filteredCoords.filter(coord =>
        parseInt(coord.bathrooms) === bathroomsFilter
      );
    }

    // Aplicar filtro por metros cuadrados de la propiedad
    if (squareMetersFilter !== null) {
      filteredCoords = filteredCoords.filter(coord =>
        parseInt(coord.metters) >= squareMetersFilter
      );
    }

    setCoords(filteredCoords); // Actualizar las coordenadas con los filtros aplicados
  };

  const clearFilter = () => {
    setCoords(originalCoords); // Restaura todas las coordenadas a su estado original
    setBathroomsFilter(null); // Restablecer el filtro de baños
    setBedroomsFilter(null); // Restablecer el filtro de habitaciones
    setSquareMetersFilter(null); // Restablecer el filtro de metros cuadrados
    setMinCommonExpensesFilter(0); // Restablecer el filtro de gastos comunes mínimos
    setMaxCommonExpensesFilter(100); // Restablecer el filtro de gastos comunes máximos
  };

  return (
    // Vista principal
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
        
      {/* Mapa */}
      <MapView
        ref={mapRef}
        initialRegion={{
          latitude: origin && origin.latitude ? origin.latitude : 0,
          longitude: origin && origin.longitude ? origin.longitude : 0,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
        showsUserLocation
        showsMyLocationButton={false}
        style={styles.map}
      >
        {/* Aplica filtros a las coordenadas guardadas en la bd */}
        {coords.filter(isCoordVisible).map((coord) => (
          (!filter || coord.state === filter ||
            coord.bathrooms === filter || coord.rooms === filter
          ) ? (
            <Marker
              key={coord.id}
              coordinate={{
                latitude: coord.location && coord.location.latitude ? coord.location.latitude : 0,
                longitude: coord.location && coord.location.longitude ? coord.location.longitude : 0
              }}
              onPress={() => {
                // Actualizar el estado con los detalles de la propiedad seleccionada
                setSelectedProperty(coord);
                setModalVisible(true); // Mostrar el modal
              }}
            >
              <Image source={coord.state === 'Venta' ? VentaImage : ArriendoImage} style={{ height: 30, width: 30 }} />
            </Marker>
          ) : null
        ))}
        {/* Marcador para la ubicación actual */}
        {markerPosition && (
          <Marker coordinate={markerPosition} />
        )}

        {/* Marcador para las busquedas */}
        {SearchCoords.map((coord, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: coord.location.latitude,
              longitude: coord.location.longitude
            }}/>
          ))}
      </MapView>

      <View>
        <Legend setFilter={setFilter} />
      </View>

      {/* Botón para ir a la ubicación actual */}
      <TouchableOpacity style={styles.button} onPress={goToOrigin}>
        <FontAwesome name="map-marker" size={28} color="black" />
      </TouchableOpacity> 

      {/* Botón para mostrar u ocultar el menú */}
      <TouchableOpacity style={styles.filterButton} onPress={toggleMenuVisibility}>
        <FontAwesome name="filter" size={20} color="white" />
      </TouchableOpacity>

      {/* Barra de búsqueda */}
      <SearchBar apiKey="AIzaSyDHcpKQJ_MAgJ3DKNaf9BhLfF0-CnchY2k" onSearch={handleSearch}/>
      
      {/* Menú de filtros */}
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

      {/* Renderizar el componente MapPublication basado en el estado */}
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
