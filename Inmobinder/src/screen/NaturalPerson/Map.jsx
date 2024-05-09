import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Alert, TouchableOpacity, Text, Animated, Image, TextInput } from 'react-native';
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

// Inicializar la base de datos de Firestore
const db = getFirestore(appFirebase.appFirebase);

const Map = () => {
  const [origin, setOrigin] = useState(null); // Estado para la ubicación actual
  const [markerPosition, setMarkerPosition] = useState(null); // Estado para la posición del marcador
  const [filter, setFilter] = useState(null); // Estado para el filtro activo
  const [coords, setCoords] = useState([]); // Almacena las coordenadas de las propiedades
  const [originalCoords, setOriginalCoords] = useState([]); // Almacena las coordenadas originales
  const [menuAnimation] = useState(new Animated.Value(0)); // Animación para el menú
  const [menuVisible, setMenuVisible] = useState(false); // Estado para la visibilidad del menú
  const [commonExpensesFilter, setCommonExpensesFilter] = useState(50); // Valor inicial de la barra deslizante
  const [bedroomsFilter, setBedroomsFilter] = useState(null); // Estado para el filtro de habitaciones
  const [bathroomsFilter, setBathroomsFilter] = useState(null); // Estado para el filtro de baños
  const [squareMetersFilter, setSquareMetersFilter] = useState(null); // Estado para el filtro de metros cuadrados

  const mapRef = useRef(); 

  useEffect(() => {
    getLocationPermission(); // Obtener permiso de ubicación al montar el componente
    fetchOriginalCoords(); // Cargar coordenadas originales al montar el componente
  }, []);

  // Escuchar cambios en la colección de coordenadas
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
    setOrigin({ // Almacenar la ubicación actual
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setMarkerPosition({ // Almacenar la posición del marcador
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    mapRef.current.animateToRegion({ // Animar el mapa a la ubicación actual
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.04,
    });
  };

  // Cargar las coordenadas originales de la base de datos
  const fetchOriginalCoords = async () => {
    const snapshot = await getDocs(collection(db, 'coords'));
    const initialCoords = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setOriginalCoords(initialCoords); // Almacenar las coordenadas originales
  };

  // Animaciones para el menú 
  const menuTranslateX = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 0],
  });

  const menuTranslateY = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0], // Ajustar según la altura del menú
  });

  // Función para ir a la ubicación actual
  const goToOrigin = () => { 
    if (origin && mapRef.current) {
      mapRef.current.animateToRegion({ 
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.04,
      });
      setMarkerPosition({ // Actualizar la posición del marcador
        latitude: origin.latitude,
        longitude: origin.longitude,
      });
    }
  };

  // Función para mostrar u ocultar el menú
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
        parseInt(coord.rooms) >= bedroomsFilter
      );
    }
  
    // Aplicar filtro por cantidad de baños si se seleccionó algún valor
    if (bathroomsFilter !== null) {
      filteredCoords = filteredCoords.filter(coord =>
        parseInt(coord.bathrooms) >= bathroomsFilter
      );
    }
  
    // Aplicar filtro por metros cuadrados de la propiedad
    if (squareMetersFilter !== null) {
      filteredCoords = filteredCoords.filter(coord =>
        parseInt(coord.metters) >= squareMetersFilter
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
    // Vista principal
    <View style={{ flex: 1 }}>
      <MapView 
        ref={mapRef}
        initialRegion={{ // Región inicial del mapa
          latitude: origin && origin.latitude ? origin.latitude : 0,
          longitude: origin && origin.longitude ? origin.longitude : 0,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
        showsUserLocation // Muestra la ubicación del usuario
        showsMyLocationButton={false} // Oculta el botón de ubicación
        style={styles.map}
      >
        {/* aplica filtros a las coordenadas guardadas en la bd */}
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

       {/* filtro propiedad en venta */}
      <TouchableOpacity style={styles.legend} onPress={() => setFilter('Venta')}>
        <Image source={VentaImage} style={{ height: 30, width: 30 }} />
        <Text style={styles.legendText}>Propiedad en venta</Text>
      </TouchableOpacity>

      {/* filtro propiedad en arriendo */}
      <TouchableOpacity style={[styles.legend, { bottom: 70 }]} onPress={() => setFilter('Arriendo')}>
        <Image source={ArriendoImage} style={{ height: 30, width: 30 }} />
        <Text style={styles.legendText}>Propiedad en arriendo</Text>
      </TouchableOpacity>

      {/* elimina los 2 filtros anteriores (venta y arriendo) */}
      <TouchableOpacity style={[styles.legend, { bottom: 125 }]} onPress={() => setFilter(null)}>
        <Image source={ArriendoYVentaImage} style={{ height: 30, width: 30 }} />
        <Text style={styles.legendText}>En venta y arriendo</Text>
      </TouchableOpacity>

      {/* Logo de Inmobinder */}
      <View style={styles.container}>
        <Image source={INMOBINDER} style={styles.image} />
      </View>

      {/* Botón para ir a la ubicación actual */}
      <TouchableOpacity style={styles.button} onPress={goToOrigin}> 
        <FontAwesome name="map-marker" size={30} color="black" />
      </TouchableOpacity>

      {/* Botón para mostrar u ocultar el menú */}
      <TouchableOpacity style={styles.filterButton} onPress={toggleMenuVisibility}>
        <FontAwesome name="filter" size={30} color="black" />
      </TouchableOpacity>

        {/* Menú de filtros */}
      {menuVisible && (
            <Animated.View style={[styles.filterMenu, { transform: [{ translateY: menuTranslateY }] }]}>
          {/* Componente de entrada de texto para Gastos Comunes */}
          <View style={styles.filterMenuItem}>
            <Text style={styles.filterMenuText}>Ingrese Gastos Comunes Mínimos:</Text>
            <TextInput
              style={styles.input}
              placeholder="Gastos comunes mínimos"
              keyboardType="numeric"
              value={`${commonExpensesFilter}`} // Convertir a cadena de texto usando interpolación de cadenas
              onChangeText={(text) => setCommonExpensesFilter(text)}
            />
          </View>
          {/* filtro por numeros de habitaciones */}
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
          </View>
          {/* filtro por numeros de baños */}
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
          </View>
          {/* filtro por metro cuadrado*/}
          <View style={styles.filterMenuItem}>
            <Text style={styles.filterMenuText}>Ingrese metros cuadrados mínimos:</Text>
            <TextInput
              style={styles.input}
              placeholder="Metros cuadrados mínimos"
              keyboardType="numeric"
              value={`${squareMetersFilter}`} // Convertir a cadena de texto usando interpolación de cadenas
              onChangeText={(text) => setSquareMetersFilter(text)}
            />
          </View>
          {/* Botones para aplicar o eliminar filtros */}
          <TouchableOpacity onPress={applyFilter}>
            <Text style={styles.filterMenuText}>Aplicar filtro</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={clearFilter}>
            <Text style={styles.filterMenuText}>Eliminar filtro</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  }
  

});

export default Map;
