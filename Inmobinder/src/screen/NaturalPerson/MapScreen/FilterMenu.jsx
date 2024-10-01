import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';

const FilterMenu = () => {
  const [estado, setEstado] = useState(null);
  const [propiedad, setPropiedad] = useState(null);
  const [ciudad, setCiudad] = useState('');
  const [rangoPrecio, setRangoPrecio] = useState([0, 100000000]);
  const [tamano, setTamano] = useState('');
  const [habitaciones, setHabitaciones] = useState(1);

  const aplicarFiltros = () => {
    console.log({
      estado,
      propiedad,
      ciudad,
      rangoPrecio,
      tamano,
      habitaciones,
    });
  };

  return (
    <ScrollView style={{ padding: 20, backgroundColor: '#fff', borderRadius: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, alignSelf: 'center' }}>Filtros</Text>
      
      {/* Estado */}
      <Text style={{ fontSize: 20, marginBottom: 5, color:"#00000099" }}>Estado</Text>
      <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginBottom: 10 }}>
        <TouchableOpacity
          onPress={() => setEstado('Nuevo')}
          style={{
            borderColor: '##009245',
            borderWidth: 1,
            borderRadius: 20,
            marginRight: 5,
            alignItems: 'center',
            width: 191,
            height: 30,
          }}>
          <Text style={{ color: estado === 'Nuevo' ? '#fff' : '#4CAF50' }}>Nuevo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setEstado('Usado')}
          style={{
            borderColor: '##009245',
            borderWidth: 1,
            borderRadius: 20,
            marginRight: 5,
            alignItems: 'center',
            width: 191,
            height: 30,
          }}>
          <Text style={{ color: estado === 'Usado' ? '#fff' : '#4CAF50' }}>Usado</Text>
        </TouchableOpacity>
      </View>

      {/* Propiedad en */}
      <Text style={{ fontSize: 20, marginBottom: 5, color:"#00000099"}}>Propiedad en</Text>
      <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginBottom: 10 }}>
        <TouchableOpacity
          onPress={() => setPropiedad('Arriendo y Venta')}
          style={{
            borderColor: '##009245',
            borderWidth: 1,
            borderRadius: 20,
            marginRight: 5,
            alignItems: 'center',
            width: 191,
            height: 30,
          }}>
          <Text style={{ color: propiedad === 'Arriendo y Venta' ? '#fff' : '#4CAF50' }}>Arriendo y Venta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setPropiedad('Arriendo')}
          style={{
            borderColor: '##009245',
            borderWidth: 1,
            borderRadius: 20,
            marginRight: 5,
            alignItems: 'center',
            width: 191,
            height: 30,
          }}>
          <Text style={{ color: propiedad === 'Arriendo' ? '#fff' : '#4CAF50' }}>Arriendo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setPropiedad('Venta')}
          style={{
            borderColor: '##009245',
            borderWidth: 1,
            borderRadius: 20,
            marginRight: 5,
            alignItems: 'center',
            width: 191,
            height: 30,
          }}>
          <Text style={{ color: propiedad === 'Venta' ? '#fff' : '#4CAF50' }}>Venta</Text>
        </TouchableOpacity>
      </View>

      {/* Ciudad */}
      <Text style={{ fontSize: 20, marginBottom: 5, color:"#00000099"}}>Ciudad</Text>
      <Picker
        selectedValue={ciudad}
        onValueChange={(itemValue) => setCiudad(itemValue)}
        style={{width:301, height: 33, marginBottom: 10, borderRadius: 20}}
      >
        <Picker.Item label="Seleccione una ciudad" value="" />
        <Picker.Item label="Ciudad 1" value="Ciudad 1" />
        <Picker.Item label="Ciudad 2" value="Ciudad 2" />
      </Picker>

      {/* Rango de precio */}
      <Text style={{ fontSize: 20, marginBottom: 5, color:"#00000099"}}>Rango de precio</Text>
      <Slider
        style={{ width: 342, height: 18}}
        thumbTintColor='#009245'
        minimumTrackTintColor='#009245'
        minimumValue={230000}
        maximumValue={600000}
        value={rangoPrecio[1]}
        onValueChange={(value) => setRangoPrecio([230000, value])}
        step={1000}
      />
      <Text>{`$${rangoPrecio[0]} - $${rangoPrecio[1]}`}</Text>

      {/* Tamaño */}
      <Text style={{ fontSize: 20, marginBottom: 5, color:"#00000099"}}>Tamaño</Text>
      <TextInput
        placeholder="Ingrese un valor (m2)"
        value={tamano}
        onChangeText={setTamano}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: '#989898',
          borderRadius: 20,
          width: 216,
          height: 33,
          marginBottom: 10,
        }}
      />

      {/* Habitaciones */}
      <Text style={{ fontSize: 20, marginBottom: 5, color:"#00000099"}}>Habitaciones</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        {[1, 2, 3, 4, 5].map((num) => (
          <TouchableOpacity
            key={num}
            onPress={() => setHabitaciones(num)}
            style={{
              backgroundColor: habitaciones === num ? '#4CAF50' : '#fff',
              borderColor: '#4CAF50',
              borderWidth: 1,
              borderRadius: 5,
              padding: 10,
              flex: 1,
              marginRight: num !== 5 ? 5 : 0,
              alignItems: 'center'
            }}>
            <Text style={{ color: habitaciones === num ? '#fff' : '#4CAF50' }}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botones */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() => console.log('Cancelar')}
          style={{
            backgroundColor: '#f44336',
            padding: 15,
            borderRadius: 5,
            alignItems: 'center',
            flex: 1,
            marginRight: 5
          }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={aplicarFiltros}
          style={{
            backgroundColor: '#4CAF50',
            padding: 15,
            borderRadius: 5,
            alignItems: 'center',
            flex: 1
          }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Aplicar filtros</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FilterMenu;
