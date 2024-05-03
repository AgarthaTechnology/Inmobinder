import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Alert, TouchableOpacity, Text, Animated, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesome } from '@expo/vector-icons';
import VentaImage from '../../../assets/images/Venta.png';
import ArriendoImage from '../../../assets/images/Arriendo.png';
import ArriendoYVentaImage from '../../../assets/images/ArriendoYVenta.png';
import INMOBINDER from '../../../assets/images/INMOBINDER-03.png';
import appFirebase from '../../utils/database';
import { getFirestore, collection, getDocs, onSnapshot } from 'firebase/firestore';
import Slider from '@react-native-community/slider';

const db = getFirestore(appFirebase.appFirebase);

const Map = () => {
  const [origin, setOrigin] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [filter, setFilter] = useState(null); // Estado para el filtro activo
  const [coords, setCoords] = useState([]);
  const [originalCoords, setOriginalCoords] = useState([]); // Almacena las coordenadas originales
  const [menuAnimation] = useState(new Animated.Value(0));
  const [menuVisible, setMenuVisible] = useState(false);
  const [commonExpensesFilter, setCommonExpensesFilter] = useState(50); // Valor inicial de la barra deslizante
  const [bedroomsFilter, setBedroomsFilter] = useState(null);
  const [bathroomsFilter, setBathroomsFilter] = useState(null);

  const mapRef = useRef();

  useEffect(() => {
    getLocationPermission();
    fetchOriginalCoords(); // Cargar coordenadas originales al montar el componente
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'coords'), (snapshot) => {
      const updatedCoords = [];
      snapshot.forEach((doc) => {
        const { 
          nameProperty,
          commonExpenses,
          state,
          metters,
          address,
          city,
          region,
          rooms,
          bathrooms,
          description,
          location,
        } = doc.data();

        updatedCoords.push({
          id: doc.id,
          nameProperty,
          commonExpenses,
          state,
          metters,
          address,
          city,
          region,
          rooms,
          bathrooms,
          description,
          location,
        });
      });
      setCoords(updatedCoords);
    });
  
    return () => {
      unsubscribe();
    };
  }, [setCoords]);

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission denied');
      Alert.alert('Permission denied');
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    setOrigin({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setMarkerPosition({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    
    mapRef.current.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.04,
    });
  };

  const fetchOriginalCoords = async () => {
    const snapshot = await getDocs(collection(db, 'coords'));
    const initialCoords = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setOriginalCoords(initialCoords); // Almacenar las coordenadas originales
  };

  const menuTranslateX = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 0],
  });

  const menuTranslateY = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0], // Ajustar según la altura del menú
  });

  const goToOrigin = () => {
    if (origin && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.04,
      });
      setMarkerPosition({
        latitude: origin.latitude,
        longitude: origin.longitude,
      });
    }
  };

  const toggleMenuVisibility = () => {
    setMenuVisible(!menuVisible);
    // Anima el menú al cambiar
    Animated.timing(menuAnimation, {
      toValue: menuVisible ? 1 : 0,
      duration: 200, // Ajusta la duración de la animación
      useNativeDriver: true, // Mejora el rendimiento (opcional)
    }).start();
  };

  const applyFilter = () => {
    // Limpiar las coordenadas antes de aplicar un nuevo filtro
    setCoords([]);
    
    // Copiar las coordenadas originales
    let filteredCoords = [...originalCoords];
  
    // Aplicar filtro por gastos comunes iguales o mayores al valor seleccionado en la barra deslizante
    filteredCoords = filteredCoords.filter(coord => 
      parseInt(coord.commonExpenses) >= parseInt(commonExpensesFilter)
    );
  
    // Aplicar filtro por número de habitaciones si se seleccionó algún valor
  if (bedroomsFilter !== null) {
    filteredCoords = filteredCoords.filter(coord =>
      parseInt(coord.rooms) === bedroomsFilter
    );
  }

  
    // Aplicar filtro por cantidad de baños si se seleccionó algún valor
    if (bathroomsFilter !== null) {
      filteredCoords = filteredCoords.filter(coord =>
        parseInt(coord.bathrooms) === bathroomsFilter
      );
    }
  
    // Actualizar las coordenadas con los filtros aplicados
    setCoords(filteredCoords);
  };
  
  
  

  const clearFilter = () => {
    setCommonExpensesFilter(1); // Restaura el valor predeterminado de la barra deslizante
    setCoords(originalCoords); // Restaura todas las coordenadas a su estado original
  };

  return (
    <View style={{ flex: 1 }}>
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
        {coords.map((coord, index) => (
          (!filter || coord.state === filter || 
            coord.bathrooms === filter || coord.rooms === filter 
          ) ? (
            <Marker
              key={index}
              coordinate={{
                latitude: coord.location && coord.location.latitude ? coord.location.latitude : 0,
                longitude: coord.location && coord.location.longitude ? coord.location.longitude : 0
              }}
              title={coord.nameProperty}
              description={coord.description}
            />
          ) : null
        ))}
      </MapView>

      <View style={styles.container}>
        <Image source={INMOBINDER} style={styles.image} />
      </View>

      <TouchableOpacity style={styles.button} onPress={goToOrigin}>
        <FontAwesome name="map-marker" size={30} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.filterButton} onPress={toggleMenuVisibility}>
        <FontAwesome name="filter" size={30} color="black" />
      </TouchableOpacity>

      {menuVisible && (
        <Animated.View style={[styles.filterMenu, { transform: [{ translateY: menuTranslateY }] }]}>
          {/* Componente de barra deslizante para Gastos Comunes */}
          <View style={styles.filterMenuItem}>
            <Text style={styles.filterMenuText}>Seleccione Gastos Comunes: {commonExpensesFilter}</Text>
            <Slider
              style={{ width: '100%' }}
              minimumValue={1}
              maximumValue={100}
              step={1}
              value={commonExpensesFilter}
              onValueChange={(value) => {
                console.log('Value changed:', value);
                setCommonExpensesFilter(value);
              }}
            />
           <View style={styles.filterMenuItem}>
            <Text style={styles.filterMenuText}>Seleccione número de habitaciones:</Text>
            <TouchableOpacity onPress={() => setBedroomsFilter(1)}>
              <Text style={styles.filterMenuText}>1 habitación</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setBedroomsFilter(2)}>
              <Text style={styles.filterMenuText}>2 habitaciones</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setBedroomsFilter(3);
              console.log("Bedrooms filter selected:", bedroomsFilter);
            }}>
              <Text style={styles.filterMenuText}>3 habitaciones</Text>
            </TouchableOpacity>
            {/* Agrega más opciones según sea necesario */}
          </View>
          <View style={styles.filterMenuItem}>
            <Text style={styles.filterMenuText}>Seleccione cantidad de baños:</Text>
            <TouchableOpacity onPress={() => setBathroomsFilter(1)}>
              <Text style={styles.filterMenuText}>1 baño</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setBathroomsFilter(2)}>
              <Text style={styles.filterMenuText}>2 baños</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setBathroomsFilter(3)}>
              <Text style={styles.filterMenuText}>3 baños</Text>
            </TouchableOpacity>
            {/* Agrega más opciones según sea necesario */}
          </View>
          <TouchableOpacity onPress={applyFilter}>
              <Text style={styles.filterMenuText}>Aplicar filtro</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={clearFilter}>
              <Text style={styles.filterMenuText}>Eliminar filtro</Text>
            </TouchableOpacity>
            
          </View>
         
          
        </Animated.View>
      )}

      <TouchableOpacity style={styles.legend} onPress={() => setFilter('Vende')}>
        <Image source={VentaImage} style={{ height: 30, width: 30 }} />
        <Text style={styles.legendText}>Propiedad en venta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.legend, { bottom: 70 }]} onPress={() => setFilter('Arriendo')}>
        <Image source={ArriendoImage} style={{ height: 30, width: 30 }} />
        <Text style={styles.legendText}>Propiedad en arriendo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.legend, { bottom: 125 }]} onPress={() => setFilter(null)}>
        <Image source={ArriendoYVentaImage} style={{ height: 30, width: 30 }} />
        <Text style={styles.legendText}>En venta y arriendo</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 540,
    right: 20,
    backgroundColor: '#D7DBDD',
    padding: 10,
    borderRadius: 8,
  },
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  filterButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#D7DBDD',
    padding: 10,
    borderRadius: 8,
  },
  filterMenu: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
  },
  filterMenuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  filterMenuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  legend: {
    position: 'absolute',
    bottom: 15,
    right: 10,
    flexDirection: 'row',
    backgroundColor: '#D7DBDD',
    padding: 10,
    borderRadius: 20,
    elevation: 5,
    alignItems: 'center',
    width: 190,
    height: 45,
  },
  legendText: {
    marginLeft: 10,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
  },
  image: {
    width: 100, 
    height: 100, 
    left: 150, 
  },
});

export default Map;
