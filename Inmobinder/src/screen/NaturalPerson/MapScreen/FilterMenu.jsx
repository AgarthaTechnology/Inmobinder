import React, { useState } from 'react';
import { Text, StyleSheet, Modal, TouchableOpacity, TextInput, View, TouchableWithoutFeedback } from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { Picker } from '@react-native-picker/picker';
import regionesYComunas from './regionsWithCommunes'; // Asegúrate de importar correctamente tus regiones y comunas

const FilterMenu = ({
  isVisible,
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
  clearFilter,
  toggleMenuVisibility,
  handleSearch, // Asegúrate de recibir handleSearch como prop
}) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCommune, setSelectedCommune] = useState(null);

  const toggleMenu = () => {
    toggleMenuVisibility();
  };

  const handleApplyFilter = () => {
    applyFilter();
    toggleMenu();
  };

  const handleClearFilter = () => {
    clearFilter();
    toggleMenu();
  };

  const handleSelectCommune = (commune) => {
    setSelectedCommune(commune);
    // Llamar a handleSearch para mover el mapa a la comuna seleccionada
    handleSearch(selectedRegion, commune); // Aquí deberías pasar la región y la comuna seleccionada
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={toggleMenu}
    >
      <TouchableWithoutFeedback onPress={toggleMenu}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.filterText}>Filter Options</Text>

              <Text style={styles.label}>
                Common Expenses: {minCommonExpensesFilter} - {maxCommonExpensesFilter}
              </Text>
              <MultiSlider
                values={[minCommonExpensesFilter, maxCommonExpensesFilter]}
                min={0}
                max={600}
                step={10}
                onValuesChange={(values) => {
                  setMinCommonExpensesFilter(values[0]);
                  setMaxCommonExpensesFilter(values[1]);
                }}
                sliderLength={280}
              />

              <Text style={styles.label}>Bedrooms</Text>
              <Picker
                selectedValue={bedroomsFilter}
                style={styles.picker}
                onValueChange={(itemValue) => setBedroomsFilter(itemValue)}
              >
                <Picker.Item label="Any" value={null} />
                {[...Array(10).keys()].map((i) => (
                  <Picker.Item key={i} label={`${i}`} value={i} />
                ))}
              </Picker>

              <Text style={styles.label}>Bathrooms</Text>
              <Picker
                selectedValue={bathroomsFilter}
                style={styles.picker}
                onValueChange={(itemValue) => setBathroomsFilter(itemValue)}
              >
                <Picker.Item label="Any" value={null} />
                {[...Array(10).keys()].map((i) => (
                  <Picker.Item key={i} label={`${i}`} value={i} />
                ))}
              </Picker>

              <Text style={styles.label}>Square Meters</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter square meters"
                keyboardType="numeric"
                value={squareMetersFilter ? squareMetersFilter.toString() : ''}
                onChangeText={(text) =>
                  setSquareMetersFilter(text ? parseInt(text) : null)
                }
              />

              {/* Selector de Región */}
              <Text style={styles.label}>Region</Text>
              <Picker
                selectedValue={selectedRegion}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedRegion(itemValue)}
              >
                <Picker.Item label="Select region" value="" />
                {regionesYComunas.map((region, index) => (
                  <Picker.Item key={index} label={region.region} value={region.region} />
                ))}
              </Picker>

              {/* Selector de Comuna */}
              {selectedRegion !== '' && (
                <>
                  <Text style={styles.label}>Commune</Text>
                  <Picker
                    selectedValue={selectedCommune}
                    style={styles.picker}
                    onValueChange={(itemValue) => handleSelectCommune(itemValue)}
                  >
                    <Picker.Item label="Select commune" value="" />
                    {regionesYComunas.find(region => region.region === selectedRegion)?.comunas.map((comuna, index) => (
                      <Picker.Item key={index} label={comuna} value={comuna} />
                    ))}
                  </Picker>
                </>
              )}

              <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilter}>
                <Text style={styles.buttonText}>Apply Filter</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.clearButton} onPress={handleClearFilter}>
                <Text style={styles.buttonText}>Clear Filter</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  filterText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  applyButton: {
    backgroundColor: 'blue',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  clearButton: {
    backgroundColor: 'red',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: 'gray',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default FilterMenu;
