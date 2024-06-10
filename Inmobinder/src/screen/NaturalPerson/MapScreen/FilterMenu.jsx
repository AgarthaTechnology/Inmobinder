import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from '../MapScreen/MapStyles.js';

const FilterMenu = ({

  menuAnimation,
  minCommonExpensesFilter,
  setMinCommonExpensesFilter,
  maxCommonExpensesFilter,
  setMaxCommonExpensesFilter,
  bedroomsFilter,
  setBedroomsFilter,
  bathroomsFilter,
  setBathroomsFilter,
  squareMetersFilter,
  setSquareMetersFilter,
  applyFilter,
  clearFilter
}) => {
  const pickerRef = useRef();

  const menuTranslateY = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  

  return (
   
      <Animated.View style={[styles.filterMenu, { transform: [{ translateY: menuTranslateY }] }]}>
        <View style={styles.filterMenuItem}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.filterMenuText}>Gastos Comunes Mín: </Text>
            <TextInput
              style={styles.input}
              placeholder="Gastos comunes mínimos"
              keyboardType="numeric"
              value={`${minCommonExpensesFilter}`}
              onChangeText={(text) => setMinCommonExpensesFilter(text)}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.filterMenuText}>Gastos comunes máx: </Text>
            <TextInput
              style={styles.input}
              placeholder="Gastos comunes máximos"
              keyboardType="numeric"
              value={`${maxCommonExpensesFilter}`}
              onChangeText={(text) => setMaxCommonExpensesFilter(text)}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.filterMenuText}>Habitaciones:</Text>
            <Picker
              ref={pickerRef}
              selectedValue={bedroomsFilter}
              onValueChange={(itemValue) => setBedroomsFilter(itemValue)}
            >
              <Picker.Item label="Seleccione n° de habitaciones" value={0} />
              <Picker.Item label="1 habitación" value={1} />
              <Picker.Item label="2 habitaciones" value={2} />
              <Picker.Item label="3 habitaciones" value={3} />
              <Picker.Item label="4 habitaciones" value={4} />
              <Picker.Item label="5 habitaciones" value={5} />
            </Picker>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.filterMenuText}>Número de baños:</Text>
            <Picker
              ref={pickerRef}
              selectedValue={bathroomsFilter}
              onValueChange={(itemValue) => setBathroomsFilter(itemValue)}
            >
              <Picker.Item label="Seleccione n° de baños" value={0} />
              <Picker.Item label="1 baño" value={1} />
              <Picker.Item label="2 baños" value={2} />
              <Picker.Item label="3 baños" value={3} />
              <Picker.Item label="4 baños" value={4} />
              <Picker.Item label="5 baños" value={5} />
            </Picker>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.filterMenuText}>Metros cuadrados mínimos:</Text>
          <TextInput
            style={styles.input}
            placeholder="Metros cuadrados"
            keyboardType="numeric"
            value={squareMetersFilter ? `${squareMetersFilter}` : ''}
            onChangeText={(text) => setSquareMetersFilter(text)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.applyButton} onPress={applyFilter}>
            <Text style={styles.buttonText}>Aplicar filtros</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={clearFilter}>
            <Text style={styles.buttonText}>Limpiar filtros</Text>
          </TouchableOpacity>
        </View>

      </Animated.View>
  );
};

export default FilterMenu;
