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

const db = getFirestore(appFirebase.appFirebase);

const Map = () => {
  const [origin, setOrigin] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState(null); // Estado para el filtro activo
  const [coords, setCoords] = useState([]);

  const mapRef = useRef();
  const menuAnimation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    const toValue = menuOpen ? 0 : 1;
    Animated.timing(menuAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
      Animated.timing(menuAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const menuTranslateX = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 0], // Cambiar a 200 para que coincida con el ancho del menú
  });

  useEffect(() => {
    getLocationPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'coords'), (snapshot) => {
      const updatedCoords = [];
      snapshot.forEach((doc) => {
        const { latitude, longitude, name, description } = doc.data();
        updatedCoords.push({
          id: doc.id,
          latitude,
          longitude,
          name,
          description,
        });
      });
      setCoords(updatedCoords);
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
    
    // Centra el mapa en la posición del usuario al inicio
    mapRef.current.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.04,
    });
  };

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

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        initialRegion={{
          latitude: origin ? origin.latitude : 0,
          longitude: origin ? origin.longitude : 0,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
        showsUserLocation
        showsMyLocationButton={false}
        style={styles.map}>
        {coords.map((coord, index) => (
          (!filter || coord.description === filter) ? (
            <Marker
              key={index}
              coordinate={{ latitude: coord.latitude, longitude: coord.longitude }}
              title={coord.name}
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

      <TouchableOpacity style={styles.menubar} onPress={toggleMenu}>
        <FontAwesome name="bars" size={30} color="black" />
      </TouchableOpacity>

      <Animated.View style={[styles.menu, { transform: [{ translateX: menuTranslateX }] }]}>
        <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
          <FontAwesome name="arrow-right" size={30} color="black" rotation={180} /> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Configuración</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity style={styles.legend} onPress={() => setFilter('Vende')}>
        <Image source={VentaImage} style={{ height: 30, width: 30 }} />
        <Text style={styles.legendText}>Propiedad en venta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.legend, { bottom: 70 }]} onPress={() => setFilter('Arrienda')}>
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
  menubar: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 200,
    height: '100%',
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
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
    top: 20,
  },
  image: {
    width: 100, 
    height: 100, 
    left: 150, 
  },
});

export default Map;
