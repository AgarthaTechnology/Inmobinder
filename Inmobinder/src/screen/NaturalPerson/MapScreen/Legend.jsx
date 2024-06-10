// Legend.js
import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import VentaImage from '../../../../assets/images/Venta.png'; 
import ArriendoImage from '../../../../assets/images/Arriendo.png';
import ArriendoYVentaImage from '../../../../assets/images/ArriendoYVenta.png';
import { styles } from './MapStyles'; 

const Legend = ({ setFilter }) => {
  return (
    <View>
      <TouchableOpacity style={styles.legend} onPress={() => setFilter('Venta')}>
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

export default Legend;
