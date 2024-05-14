import React, { useEffect, useState, useRef } from 'react';
import { View, Alert, TouchableOpacity, Text, Animated, Image, TextInput} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesome } from '@expo/vector-icons';
import VentaImage from '../../../../assets/images/Venta.png';
import ArriendoImage from '../../../../assets/images/Arriendo.png';
import ArriendoYVentaImage from '../../../../assets/images/ArriendoYVenta.png';
import INMOBINDER from '../../../../assets/images/INMOBINDER-03.png';
import appFirebase from '../../../utils/database.js';
import { getFirestore, collection, getDocs, onSnapshot } from 'firebase/firestore';
import { styles } from '../MapScreen/MapStyles.js';
import {Picker} from '@react-native-picker/picker';


// Inicializar la base de datos de Firestore
const db = getFirestore(appFirebase.appFirebase);

const Map = () => {
  const [origin, setOrigin] = useState(); // Estado para la ubicación actual
  const [markerPosition, setMarkerPosition] = useState(); // Estado para la posición del marcador
  const [filter, setFilter] = useState(); // Estado para el filtro activo
  const [coords, setCoords] = useState([]); // Almacena las coordenadas de las propiedades
  const [originalCoords, setOriginalCoords] = useState([]); // Almacena las coordenadas originales
  const [menuAnimation] = useState(new Animated.Value(0)); // Animación para el menú
  const [menuVisible, setMenuVisible] = useState(false); // Estado para la visibilidad del menú
  // const [commonExpensesFilter, setCommonExpensesFilter] = useState(0); // Valor inicial de la barra deslizante
  const [bedroomsFilter, setBedroomsFilter] = useState(null); // Estado para el filtro de habitaciones
  const [bathroomsFilter, setBathroomsFilter] = useState(null); // Estado para el filtro de baños
  const [squareMetersFilter, setSquareMetersFilter] = useState(null); // Estado para el filtro de metros cuadrados
  const [minCommonExpensesFilter, setMinCommonExpensesFilter] = useState(0); // Valor inicial del filtro de gastos comunes mínimos
  const [maxCommonExpensesFilter, setMaxCommonExpensesFilter] = useState(100); // Valor inicial del filtro de gastos comunes máximos



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
  
    // Aplicar filtro por gastos comunes iguales o mayores al valor ingresado 
    filteredCoords = filteredCoords.filter(coord => 
      parseInt(coord.commonExpenses) >= parseInt(minCommonExpensesFilter) && 
      parseInt(coord.commonExpenses) <= parseInt(maxCommonExpensesFilter)
    );
  
   // Aplicar filtro por número de habitaciones si se seleccionó algún valor
    if (bedroomsFilter !== null) {
      filteredCoords = filteredCoords.filter(coord =>
      parseInt(coord.rooms) == bedroomsFilter
      );
    }

   // Aplicar filtro por cantidad de baños si se seleccionó algún valor
    if (bathroomsFilter !== null) {
      filteredCoords = filteredCoords.filter(coord =>
        parseInt(coord.bathrooms) == bathroomsFilter
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

  const pickerRef = useRef();


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
          (!filter || coord.state == filter || 
            coord.bathrooms == filter || coord.rooms === filter 
          ) ? (
            <Marker
              key={index}
              coordinate={{
                latitude: coord.location && coord.location.latitude ? coord.location.latitude : 0,
                longitude: coord.location && coord.location.longitude ? coord.location.longitude : 0
              }}
               onPress={() => {
                 Alert.alert(
                   coord.nameProperty,
                   `Dirección: ${coord.address}\n
                   Ciudad: ${coord.city}\n
                   Región: ${coord.region}\n
                   Gastos comunes: $${coord.commonExpenses}\n
                  Descripción: ${coord.description}`
                 );
              }} 
            > 
            <Image source={coord.state == 'Venta' ? VentaImage : ArriendoImage} style={{ height: 30, width: 30 }} />
            </Marker>
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
        <FontAwesome name="filter" size={20} color="black" />
      </TouchableOpacity>

        {/* Menú de filtros */}
      {menuVisible && (
            <Animated.View style={[styles.filterMenu, { transform: [{ translateY: menuTranslateY }] }]}>

          {/* Componente de entrada de texto para Gastos Comunes */}
          <View style={styles.filterMenuItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.filterMenuText}>Gastos Comunes Mín: </Text>
              <TextInput
                style={styles.input}
                placeholder="Gastos comunes mínimos"
                keyboardType="numeric"
                value={`${minCommonExpensesFilter}`} // Convertir a cadena de texto usando interpolación de cadenas
                onChangeText={(text) => setMinCommonExpensesFilter(text)}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.filterMenuText}>Gastos comunes máx: </Text>
              <TextInput
                style={styles.input}
                placeholder="Gastos comunes máximos"
                keyboardType="numeric"
                value={`${maxCommonExpensesFilter}`} // Convertir a cadena de texto usando interpolación de cadenas
                onChangeText={(text) => setMaxCommonExpensesFilter(text)}
              />
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
          {/* Filtro por número de habitaciones */}
          <View style={{ flex: 1 }}>
            <Text style={styles.filterMenuText}>habitaciones:</Text>
            <Picker
              ref={pickerRef}
              selectedValue={bedroomsFilter}
              onValueChange={(itemValue) =>
                setBedroomsFilter(itemValue)
              }>
              <Picker.Item label="seleccione n° de habitaciones" value="0" />
              <Picker.Item label="1 habitacion" value="1" />
              <Picker.Item label="2 habitaciones" value="2" />
              <Picker.Item label="3 habitaciones" value="3" />
              <Picker.Item label="4 habitaciones" value="4" />
              <Picker.Item label="5 habitaciones" value="5" />
            </Picker>
          </View>

          {/* Filtro por número de baños */}
          <View style={{ flex: 1 }}>
              <Text style={styles.filterMenuText}>número de baños:</Text>
              <Picker
                ref={pickerRef}
                selectedValue={bathroomsFilter}
                onValueChange={(itemValue) =>
                  setBathroomsFilter(itemValue)
                }>
                <Picker.Item label="seleccione n° de baños" value="0" />
                <Picker.Item label="1 baño" value="1" />
                <Picker.Item label="2 baños" value="2" />
                <Picker.Item label="3 baños" value="3" />
                <Picker.Item label="4 baños" value="4" />
                <Picker.Item label="5 baños" value="5" />
              </Picker>
            </View>
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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
            <TouchableOpacity onPress={applyFilter}>
              <Text style={styles.filterMenuText}>Aplicar filtro</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={clearFilter}>
              <Text style={styles.filterMenuText}>Eliminar filtro</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

    </View>
  );
};

export default Map;
